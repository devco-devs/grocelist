import { useState } from 'react'
import { useProductsStore } from '../../store/products.store'
import { convertToReais } from '../../utils/converters'
import { ProductItem } from './ProductItem'
import { Checkbox } from './Checkbox'

export function ProductList() {
  const { products, sumTotalProducts } = useProductsStore()
  const [isAllProductsSelected, setIsAllProductsSelected] = useState(false)
  const totalPrice = sumTotalProducts()

  const sortedProducts = products?.sort((prod1, prod2) => {
    if (prod1.checked && !prod2.checked) {
      return 1
    } else if (!prod1.checked && prod2.checked) {
      return -1
    } else {
      return prod1.name.localeCompare(prod2.name)
    }
  })

  function checkAllProducts() {
    if (isAllProductsSelected) {
      sortedProducts.forEach((product) => {
        product.checked = false
      })
    } else {
      sortedProducts.forEach((product) => {
        product.checked = true
      })
    }
  }

  function handleCheckSelectAllProducts() {
    setIsAllProductsSelected((prev) => !prev)
    checkAllProducts()
  }

  return (
    <div className="flex flex-col items-end mt-10">
      <div className="flex self-start p-2 items-center mb-8">
        <Checkbox
          onCheck={handleCheckSelectAllProducts}
          defaultChecked={isAllProductsSelected}
        />
        <span>Marcar todos os itens</span>
      </div>
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
