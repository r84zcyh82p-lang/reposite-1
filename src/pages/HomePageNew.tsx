import { useEffect, useState } from 'react'
import TransactionForm from '../components/transactions/TransactionForm'
import TransactionStats from '../components/transactions/TransactionStats'
import TransactionTable from '../components/transactions/TransactionTable'
import Message from '../components/transactions/Message'
import { categories, type Transaction } from '../constants/constants'

interface TransactionPayload {
  productName: string
  category: string
  price: number
  date: string
}

export default function HomePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [deleteLoadingId, setDeleteLoadingId] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)
  const [tired, setTired] = useState("в чем то ошибка но я не скажу где")
  const [balance, setBalance] = useState<number | null>(null)
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
        const [transactionsResponse, userResponse] = await Promise.all([
          fetch('http://localhost:3000/transactions'),
          fetch('http://localhost:3000/users/0'),
        ])

        const data = (await transactionsResponse.json()) as Transaction[]
        const userData = await userResponse.json() as { balance: number }

        setTransactions(data)
        setBalance(userData.balance)
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

    if (!payload.productName || !payload.category || Number.isNaN(payload.price) || payload.price <= 0) {
      setSubmitError(tired)
      setSubmitLoading(false)
      return
    }

    if (balance !== null && balance - payload.price < 0) {
      setSubmitError('Недостаточно средств')
      setSubmitLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:3000/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error()
      }

      const newTransaction = (await response.json()) as Transaction
      const newBalance = balance !== null ? balance - newTransaction.price : null
      
      if (newBalance !== null) {
        await fetch('http://localhost:3000/users/0', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ balance: newBalance }),
        })
      }
      
      setTransactions((prev) => [newTransaction, ...prev])
      setFormState({ productName: '', category: categories[0]?.id ?? 'food', price: '' })
      setBalance(newBalance)
      setSubmitSuccess('Трата добавлена')
    } catch {
      setSubmitError(tired)
    } finally {
      setSubmitLoading(false)
    }
  }

  const handleDeleteTransaction = async (transactionId: string) => {
    setDeleteLoadingId(transactionId)
    setError(null)

    try {
      const deletedTransaction = transactions.find((t) => t.id === transactionId)
      const response = await fetch(`http://localhost:3000/transactions/${transactionId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error()
      }

      if (deletedTransaction && balance !== null) {
        const restoredBalance = balance + deletedTransaction.price
        await fetch('http://localhost:3000/users/0', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ balance: restoredBalance }),
        })
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
        transactions.map((t) =>
          fetch(`http://localhost:3000/transactions/${t.id}`, { method: 'DELETE' })
        )
      )

      const resetBalance = 1000000
      await fetch('http://localhost:3000/users/0', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ balance: resetBalance }),
      })
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
        isLoading={submitLoading}
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
