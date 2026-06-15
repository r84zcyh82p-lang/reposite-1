import { categories } from '../../constants/constants'

interface TransactionFormProps {
  formState: {
    productName: string
    category: string
    price: string
  }
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSubmit: () => void
  isLoading: boolean
}

export default function TransactionForm({ formState, onInputChange, onSubmit, isLoading }: TransactionFormProps) {
  return (
    <>
      <h2 className="font-extrabold text-[30px] w-full text-center mt-10">Добавить траты</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          onSubmit()
        }}
        className="flex justify-center gap-2"
      >
        <input
          name="productName"
          value={formState.productName}
          onChange={onInputChange}
          placeholder="Название расхода"
          className="border rounded p-3"
          required
        />

        <select
          name="category"
          value={formState.category}
          onChange={onInputChange}
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
          onChange={onInputChange}
          type="number"
          placeholder="Сумма"
          className="border rounded p-3"
          min="0"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-3 rounded disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Сохранение' : 'Добавить расход'}
        </button>
      </form>
    </>
  )
}
