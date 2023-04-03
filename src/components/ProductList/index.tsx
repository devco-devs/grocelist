import { useProductsStore } from '../../store/products.store'
import { convertToReais } from '../../utils/converters'
import { ProductItem } from './ProductItem'

export function ProductList() {
  const { products, sumTotalProducts, removeProduct } = useProductsStore()
  const totalPrice = sumTotalProducts()

  function handleRemoveItemFromCart(productId: string) {
    const confirmRemove = window.confirm('Deseja remover o item do carrinho?')

    if (confirmRemove) {
      removeProduct(productId)
    }
  }

  return (
    <div className="flex flex-col items-end mt-10">
      <ul className="w-full flex flex-col  [&>*:nth-child(odd)]:bg-zinc-300 dark:[&>*:nth-child(odd)]:bg-zinc-800">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onRemove={() => handleRemoveItemFromCart(product.id)}
            onEdit={() => {}}
          />
        ))}
      </ul>

      <span className="w-full flex justify-end mt-2 p-1">
        TOTAL: {convertToReais(totalPrice)}
      </span>
    </div>
  )
}
