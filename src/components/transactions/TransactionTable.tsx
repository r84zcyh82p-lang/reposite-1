import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { categories, type Transaction } from '../../constants/constants'

interface TransactionTableProps {
  transactions: Transaction[]
  deleteLoadingId: string | null
  onDelete: (id: string) => void
}

export default function TransactionTable({ transactions, deleteLoadingId, onDelete }: TransactionTableProps) {
  const getCategoryName = (categoryId: string) => {
    const category = categories.find((item) => item.id === categoryId)
    return category ? `${category.emoji} ${category.name}` : categoryId
  }

  return (
    <TableContainer component={Paper}>
      <Table
        sx={{ minWidth: 650, marginX: 'auto', width: '80%', border: 1, marginY: 10 }}
        aria-label="transactions table"
      >
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
          {transactions.map((transaction) => (
            <TableRow key={transaction.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{new Date(transaction.date).toLocaleDateString('ru-RU')}</TableCell>
              <TableCell>{getCategoryName(transaction.category)}</TableCell>
              <TableCell>{transaction.productName}</TableCell>
              <TableCell align="right">${transaction.price}</TableCell>
              <TableCell align="center">
                <button
                  type="button"
                  className="bg-red-600 text-white px-2 py-1 rounded-2xl hover:bg-red-800"
                  onClick={() => onDelete(transaction.id)}
                >
                  {deleteLoadingId === transaction.id ? 'Удаление...' : 'Удалить'}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
