import { Pencil, TrashSimple } from 'phosphor-react'
import { useProductsStore } from '../store/products.store'

export function ProductList() {
  const { products, sumTotalProducts, removeProduct } = useProductsStore()
  return (
    <div className="flex flex-col items-end bg-red-500 mt-10">
      <ul className="w-full flex flex-col gap-2">
        {products.map((product) => (
          <li className="flex bg-green-500" key={product.id}>
            <span className="bg-white flex-1">{product.name}</span>
            <span className="bg-blue-500 flex justify-center w-1/6">
              {product.price}
            </span>
            <span className="bg-yellow-500 flex justify-center w-1/6">
              {product.amount}
            </span>
            <div className="bg-pink-600 w-1/6 flex justify-between px-2 gap-2">
              <button onClick={() => removeProduct(product.id)}>
                <TrashSimple />
              </button>

              <button onClick={() => {}}>
                <Pencil />
              </button>
            </div>
          </li>
        ))}
      </ul>

      <span className="bg-indigo-500 mt-6">TOTAL: {sumTotalProducts()}</span>
    </div>
  )
}
