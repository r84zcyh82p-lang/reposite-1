import { useEffect, useState } from 'react'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionStats from '../components/transactions/TransactionStats'
import TransactionTable from '../components/transactions/TransactionTable'
import Message from '../components/transactions/Message'
import { useProduct } from '../hooks/product'
import productServices from '../services/product.api'
import { categories, type Transaction } from '../constants/constants'

interface TransactionPayload {
  productName: string
  category: string
  price: number
  date: string
}

export default function HomePage() {
  const { productUser, success: productSuccess, error: productError, loading: productLoading } = useProduct()
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const tired = "в чем то ошибка но я не скажу где"
  const [balance, setBalance] = useState<number | null>(null)
  const isSubmitLoading = submitLoading || productLoading
  const [formState, setFormState] = useState({
    productName: '',
    category: categories[0]?.id ?? 'food',
    price: '',
  })
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    const loadTransactions = async () => {
      setLoading(true)
      setError(null)

      try {
        const [data, userData] = await Promise.all([
          productServices.getTransactions() as Promise<Transaction[]>,
          productServices.getUser(0) as Promise<{ balance: number }>,
        ])

        setTransactions(data ?? [])
        setBalance(userData?.balance ?? null)
      } catch {
        setError(tired)
      } finally {
        setLoading(false)
      }
    }

    loadTransactions()
  }, [])

  const filteredTransactions = filterCategory === 'all'
    ? transactions
    : transactions.filter((transaction) => transaction.category === filterCategory)

  const totalExpenses = filteredTransactions.reduce((sum, transaction) => sum + transaction.price, 0)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTransaction = async () => {
    setSubmitLoading(true)
    setSubmitError(null)
    setSubmitSuccess(null)

    const payload: TransactionPayload = {
      productName: formState.productName,
      category: formState.category,
      price: Number(formState.price),
      date: new Date().toISOString(),
    }

    if (balance !== null && balance - payload.price < 0) {
      setSubmitError('не хватает деняг')
      setSubmitLoading(false)
      return
    }

    try {
      await productUser({
        productName: payload.productName,
        category: payload.category,
        price: payload.price.toString(),
        date: payload.date,
      })

      const newTransaction: Transaction = {
        id: String(Date.now()),
        productName: payload.productName,
        category: payload.category,
        price: payload.price,
        date: payload.date,
      }

      const newBalance = balance !== null ? balance - newTransaction.price : null

      if (newBalance !== null) {
        await productServices.updateUser(0, { balance: newBalance })
      }

      setTransactions((prev) => [newTransaction, ...prev])
      setFormState({ productName: '', category: categories[0]?.id ?? 'food', price: '' })
      setBalance(newBalance)
      setSubmitSuccess(productSuccess ? 'Трата добавлена' : 'Данные отправлены')
    } catch {
      setSubmitError(productError ?? tired)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    setDeleteLoadingId(transactionId)
    setError(null)

    try {
      const deletedTransaction = transactions.find((t) => t.id === transactionId)
      await productServices.deleteTransaction(transactionId)

      if (deletedTransaction && balance !== null) {
        const restoredBalance = balance + deletedTransaction.price
        await productServices.updateUser(0, { balance: restoredBalance })
        setBalance(restoredBalance)
      }

      setTransactions((prev) => prev.filter((transaction) => transaction.id !== transactionId))
    } catch {
      setError(tired)
    } finally {
      setDeleteLoadingId(null)
    }
  }

  const handleDeleteAll = async () => {
    if (!window.confirm('Вы уверены? Все транзакции будут удалены.')) {
      return
    }

    setDeleteLoadingId('all')
    setError(null)

    try {
      await Promise.all(
        transactions.map((t) => productServices.deleteTransaction(t.id))
      )

      const resetBalance = 1000
      await productServices.updateUser(0, { balance: resetBalance })
      setBalance(resetBalance)

      setTransactions([])
      setSubmitSuccess('Все траты удалены')
    } catch {
      setError(tired)
    } finally {
      setDeleteLoadingId(null)
    }
  }

  return (
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Анализ затрат</h1>
      </div>

      <TransactionForm
        formState={formState}
        onInputChange={handleInputChange}
        onSubmit={handleAddTransaction}
        isLoading={isSubmitLoading}
      />

      <Message success={submitSuccess} error={submitError || error} />

      {!loading && !error && (
        <>
          <TransactionStats
            balance={balance}
            totalExpenses={totalExpenses}
            filterCategory={filterCategory}
            onFilterChange={setFilterCategory}
            onDeleteAll={handleDeleteAll}
            isDeleteLoading={deleteLoadingId === 'all'}
            hasTransactions={transactions.length > 0}
          />
          <TransactionTable
            transactions={filteredTransactions}
            deleteLoadingId={deleteLoadingId}
            onDelete={handleDeleteTransaction}
          />
        </>
      )}
    </div>
  )
}
