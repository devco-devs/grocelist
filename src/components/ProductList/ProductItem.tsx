import { Pencil, Trash } from 'phosphor-react'
import {
  IProduct,
  IProductInput,
  useProductsStore,
} from '../../store/products.store'
import { convertToReais } from '../../utils/converters'
import { Checkbox } from './Checkbox'
import { useState } from 'react'
import { ProductForm } from '../ProductForm'

interface ProductItemProps {
  product: IProduct
}

export function ProductItem({ product }: ProductItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { checkProduct, removeProduct, updateProduct } = useProductsStore()

  function handleRemoveItemFromCart() {
    const confirmRemove = window.confirm('Deseja remover o item do carrinho?')

    if (confirmRemove) {
      removeProduct(product.id)
    }
  }

  function handleUpdateProduct(newProduct: IProductInput) {
    updateProduct(product.id, newProduct)
    setIsEditing(false)
  }

  return (
    <li
      className={`flex items-center text-lg p-2 rounded-md ${
        product.checked ? 'line-through text-zinc-600' : ''
      }`}
    >
      {isEditing ? (
        <ProductForm
          product={{ ...product, price: String(product.price) }}
          onSave={handleUpdateProduct}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
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
            <button onClick={() => setIsEditing(true)}>
              <Pencil size={20} />
            </button>

            <button onClick={handleRemoveItemFromCart}>
              <Trash size={20} color="#dc2626" />
            </button>
          </div>
        </>
      )}
    </li>
  )
}
