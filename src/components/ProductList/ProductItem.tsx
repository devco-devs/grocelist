import { Pencil, TrashSimple } from 'phosphor-react'
import type { IProduct } from '../../store/products.store'

interface ProductItemProps {
  product: IProduct
  onRemove: () => void
  onEdit: () => void
}

export function ProductItem({ product, onRemove, onEdit }: ProductItemProps) {
  return (
    <li className="flex bg-green-500 text-lg">
      <span className="bg-white flex-1">{product.name}</span>
      <span className="bg-blue-500 flex justify-center w-1/6">
        {product.price}
      </span>
      <span className="bg-yellow-500 flex justify-center w-1/6">
        {product.amount}
      </span>
      <div className="bg-pink-600 max-w-[80px] w-1/6 flex justify-between px-2 gap-2">
        <button onClick={onEdit}>
          <Pencil size={20} />
        </button>

        <button onClick={onRemove}>
          <TrashSimple size={20} />
        </button>
      </div>
    </li>
  )
}
