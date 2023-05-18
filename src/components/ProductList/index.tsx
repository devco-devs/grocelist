import { ShoppingCart } from 'phosphor-react'
import { useProductsStore, type IProduct } from '../../store/products.store'
import { convertToReais } from '../../utils/converters'
import { Checkbox } from './Checkbox'
import { ProductItem } from './ProductItem'

export function ProductList() {
  const { products, sumTotalProducts, checkProduct, resetProducts } =
    useProductsStore()
  const totalPrice = sumTotalProducts()

  function sortProducts(products: IProduct[]) {
    return products?.sort((prod1, prod2) => {
      if (prod1.checked && !prod2.checked) {
        return 1
      } else if (!prod1.checked && prod2.checked) {
        return -1
      } else {
        return prod1.name.localeCompare(prod2.name)
      }
    })
  }

  const sortedProducts = sortProducts(products)

  const isEveryProductChecked = sortedProducts?.every(
    (product) => product.checked,
  )
  const showRemoveAllChecked = sortedProducts?.some(
    (product) => product.checked,
  )

  function handleCheckAllProducts({ type }: { type: 'check' | 'uncheck' }) {
    sortedProducts?.forEach((product) => {
      checkProduct(product.id, type === 'check')
    })
  }

  function handleRemoveAllChecked() {
    const confirmRemove = window.confirm(
      'Deseja remover todos os itens marcados?',
    )

    if (confirmRemove) {
      const uncheckedProducts = sortedProducts?.filter(
        (product) => !product.checked,
      )

      resetProducts(uncheckedProducts)
    }
  }

  return (
    <div className="flex flex-col items-end mt-10">
      <div className="flex items-center justify-between w-full self-start px-2 mb-4">
        <div className="flex items-center">
          <Checkbox
            defaultChecked={isEveryProductChecked && sortedProducts.length > 0}
            onCheck={() =>
              handleCheckAllProducts({
                type: isEveryProductChecked ? 'uncheck' : 'check',
              })
            }
          />
          {isEveryProductChecked && sortedProducts.length
            ? 'Desmarcar todos'
            : 'Marcar todos'}
        </div>

        {showRemoveAllChecked && (
          <button
            onClick={handleRemoveAllChecked}
            className="px-2 py-1 border border-red-500 rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200"
          >
            Limpar todos os selecionados
          </button>
        )}
      </div>

      {sortedProducts.length <= 0 && (
        <div className="w-full flex flex-col gap-4 items-center justify-center p-20 ">
          <ShoppingCart size={48} />
          <div className="text-center leading-relaxed">
            <span className="font-bold text-3xl">A lista está vazia!</span>
            <p className="mt-3">Adicione itens ao seu carrinho.</p>
          </div>
        </div>
      )}

      <ul className="w-full flex flex-col  [&>*:nth-child(odd)]:bg-zinc-300 dark:[&>*:nth-child(odd)]:bg-zinc-800">
        {sortedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ul>

      <span className="w-full flex justify-end mt-2 p-1">
        TOTAL: {convertToReais(totalPrice)}
      </span>
    </div>
  )
}
