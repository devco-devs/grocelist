import { Pencil, Trash } from 'phosphor-react'
import { IProduct, useProductsStore } from '../../store/products.store'
import { convertToReais } from '../../utils/converters'
import { Checkbox } from './Checkbox'

interface ProductItemProps {
  product: IProduct
  onRemove: () => void
  onEdit: () => void
}

export function ProductItem({ product, onRemove, onEdit }: ProductItemProps) {
  const { checkProduct } = useProductsStore()
  return (
    <li
      className={`flex items-center text-lg p-2 rounded-md ${
        product.checked ? 'line-through text-zinc-600' : ''
      }`}
    >
      <Checkbox
        onCheck={() => checkProduct(product.id)}
        defaultChecked={product.checked}
      />

      <span className="flex-1">{product.name}</span>
      <span className="flex justify-center w-1/6">
        {convertToReais(product.price)}
      </span>
      <span className="flex justify-center w-1/6">{product.amount}</span>
      <div className="max-w-[80px] w-1/6 flex justify-between px-2 gap-2 text-zinc-800 dark:text-zinc-100">
        <button onClick={onEdit}>
          <Pencil size={20} />
        </button>

        <button onClick={onRemove}>
          <Trash size={20} color="#dc2626" />
        </button>
      </div>
    </li>
  )
}
