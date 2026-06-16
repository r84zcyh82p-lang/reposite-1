import { categories } from '../../constants/constants'

interface TransactionStatsProps {
  balance: number | null
  totalExpenses: number
  filterCategory: string
  onFilterChange: (value: string) => void
  onDeleteAll: () => void
  isDeleteLoading: boolean
  hasTransactions: boolean
}

export default function TransactionStats({
  balance,
  totalExpenses,
  filterCategory,
  onFilterChange,
  onDeleteAll,
  isDeleteLoading,
  hasTransactions,
}: TransactionStatsProps) {
  return (
    <>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-right text-xl font-semibold">Баланс: {balance !== null ? `$${balance}` : '...'}</div>
        <div className="text-right text-xl font-semibold">Общая затрата: ${totalExpenses}</div>
        <div className="flex items-center gap-3">
          <label htmlFor="filter-category" className="font-medium">
            Фильтр по категории:
          </label>
          <select
            id="filter-category"
            value={filterCategory}
            onChange={(event) => onFilterChange(event.target.value)}
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
          onClick={onDeleteAll}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          disabled={isDeleteLoading || !hasTransactions}
        >
         далить все
        </button>
      </div>
    </>
  )
}
