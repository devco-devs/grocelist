import { useProductsStore } from '../../store/products.store'
import { ProductItem } from './ProductItem'

export function ProductList() {
  const { products, sumTotalProducts, removeProduct } = useProductsStore()
  const totalPrice = sumTotalProducts()

  return (
    <div className="flex flex-col items-end bg-red-500 mt-10">
      <ul className="w-full flex flex-col gap-2">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onRemove={() => removeProduct(product.id)}
            onEdit={() => {}}
          />
        ))}
      </ul>

      <span className="bg-indigo-500 mt-6">TOTAL: {totalPrice}</span>
    </div>
  )
}
