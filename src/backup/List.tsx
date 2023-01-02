import { Pencil, Trash } from 'phosphor-react'
import { useState } from 'react'
import { useProducts } from '../providers/ProductsProvider'
import { convertToReais } from '../utils/converters'
import { Empty } from './Empty'

export function List() {
  const [productInCart, setProductInCart] = useState<string[]>([])
  const { products, getCurrentProduct, removeProduct, checkProduct } =
    useProducts()
  const total =
    products?.reduce((acc, item) => acc + item.price * item.quantity, 0) ?? 0

  function addProductToCart(productId: string) {
    setProductInCart([...productInCart, productId])
  }

  function isProductInCart(productId: string) {
    return productInCart.includes(productId)
  }

  function handleEditProduct(itemId: string) {
    getCurrentProduct(itemId)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }

  if (!products?.length) {
    return <Empty />
  }

  const sortProducts = products?.sort((prod1, prod2) => {
    if (prod1.checked && !prod2.checked) {
      return 1
    } else if (!prod1.checked && prod2.checked) {
      return -1
    } else {
      return prod1.product.localeCompare(prod2.product)
    }
  })

  return (
    <div className="mt-20">
      {sortProducts?.map((item) => (
        <div
          key={item.id}
          className={`flex items-center w-full odd:bg-gray-300 even:bg-gray-200 px-2`}
        >
          <input
            type="checkbox"
            checked={item.checked}
            onChange={() => checkProduct(item.id)}
          />
          <div
            className={`flex items-center w-full max-w-[50%] md:max-w-[70%] p-2 ${
              item.checked ? 'line-through' : ''
            }`}
          >
            {item.product}
          </div>
          <div
            className={`flex w-1/12 items-center flex-1p-2 ${
              item.checked ? 'line-through' : ''
            }`}
          >
            x {item.quantity}
          </div>
          <div className="flex w-1/6 items-center flex-1 p-2">
            {convertToReais(item.price)}
          </div>

          <div className="flex items-center gap-2 ">
            <button onClick={() => handleEditProduct(item.id)}>
              <Pencil size={20} />
            </button>
            <button onClick={() => removeProduct(item.id)}>
              <Trash size={20} />
            </button>
          </div>
        </div>
      ))}

      <div className="flex bg-emerald-500 text-white">
        <div className="flex flex-1 p-2">
          <strong>Total</strong>
        </div>
        <div className="flex w-1/6 max-w-[148px] md:max-w-[236px] items-center flex-1 p-2">
          {convertToReais(total)}
        </div>
      </div>
    </div>
  )
}
