import { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useProduct } from '../hooks/product'
import productServices from '../services/product.api'
import { categories, type Transaction } from '../constants/constants'

interface qwerty1 {
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
  const [tired] = useState("в чем то ошибка но я не скажу где")
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

  const CategoryName = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId)
    return category ? `${category.emoji} ${category.name}` : categoryId
  }

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

    const qwerty1: qwerty1 = {
      productName: formState.productName,
      category: formState.category,
      price: Number(formState.price),
      date: new Date().toISOString(),
    }

    if (!qwerty1.productName || !qwerty1.category || Number.isNaN(qwerty1.price) || qwerty1.price <= 0) {
      setSubmitError(tired)
      setSubmitLoading(false)
      return
    }

    if (balance !== null && balance - qwerty1.price < 0) {
      setSubmitError('Недостаточно деняг')
      setSubmitLoading(false)
      return
    }

    try {
      const newTransaction = (await productUser({
        productName: qwerty1.productName,
        category: qwerty1.category,
        price: String(qwerty1.price),
        date: qwerty1.date,
      })) as Transaction
      const newBalance = balance !== null ? balance - newTransaction.price : null
      
      if (newBalance !== null) {
        await productServices.updateUser(0, { balance: newBalance })
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
    if (!window.confirm('Вы уверены? Все транзакции будут удалены')) {
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

      <h2 className='font-extrabold text-[30px] w-full text-center mt-10'>Добавить траты</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleAddTransaction()
        }}
        className="flex justify-center"
      >
        <input
          name="productName"
          value={formState.productName}
          onChange={handleInputChange}
          placeholder="Название расхода"
          className="border rounded p-3"
          required
        />

        <select
          name="category"
          value={formState.category}
          onChange={handleInputChange}
          className="border rounded p-3"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.emoji} {category.name}
            </option>
          ))}
        </select>

        <input
          name="price"
          value={formState.price}
          onChange={handleInputChange}
          type="number"
          placeholder="Сумма"
          className="border rounded p-3"
          min="0"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded disabled:opacity-50"
        disabled={isSubmitLoading}
        >
          Добавить расход
        </button>

      </form>

      {submitSuccess && <p className="text-green-600 text-center font-semibold">{submitSuccess}</p>}
      {submitError && <p className="text-red-600 text-center font-semibold">{submitError}</p>}

      {!loading && !error && (
        <>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-right text-xl font-semibold">Баланс: {balance !== null ? `$${balance}` : '...'}</div>
            <div className="text-right text-xl font-semibold">Общая затрата: ${totalExpenses}</div>
            <div className="flex items-center gap-3">
              <label htmlFor="filter-category" className="font-medium">Фильтр по категории:</label>
              <select
                id="filter-category"
                value={filterCategory}
                onChange={(event) => setFilterCategory(event.target.value)}
                className="border rounded p-2"
              >
                <option value="all">Все категории</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.emoji} {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleDeleteAll}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              disabled={deleteLoadingId === 'all' || transactions.length === 0}
            >
              Удалить все
            </button>
          </div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, marginX: 'auto', width: '80%', border: 1, marginY: 10 }} aria-label="transactions table">
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell>Категория</TableCell>
                  <TableCell>Название</TableCell>
                  <TableCell align="right">Сумма</TableCell>
                  <TableCell align="center">Действие</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow key={transaction.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString('ru-RU')}</TableCell>
                    <TableCell>{CategoryName(transaction.category)}</TableCell>
                    <TableCell>{transaction.productName}</TableCell>
                    <TableCell align="right">${transaction.price}</TableCell>
                    <TableCell align="center">
                      <button
                        type="button"
                        className="bg-red-600 text-white px-2 py-1 rounded-2xl hover:bg-red-800"
                        onClick={() => handleDeleteTransaction(transaction.id)}
                      >
                        удалить
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </div>
  )
}
