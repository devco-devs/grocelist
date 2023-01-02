import { createContext, ReactNode, useContext, useState } from 'react'
import { v4 } from 'uuid'

interface Product {
  id: string
  product: string
  quantity: number
  price: number
  checked: boolean
}

interface ProductInput {
  product: string
  quantity: number
  price: number
}

interface ProductsProviderProps {
  children: ReactNode
}

interface ProductsContextData {
  products: Product[]
  currentEditingProductId: string
  getCurrentProduct: (productId: string) => void
  addProductToList: (product: ProductInput) => void
  editProduct: (productId: string, product: ProductInput) => void
  checkProduct: (productId: string) => void
  removeProduct: (productId: string) => void
  resetList: () => void
}

const ProductsContext = createContext({} as ProductsContextData)

export function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>(
    localStorage.getItem('@grocelist:products')
      ? JSON.parse(localStorage.getItem('@grocelist:products')!)
      : [],
  )
  const [currentEditingProductId, setCurrentEditingProductId] = useState('')

  function addProductToList(product: ProductInput) {
    const newProduct = {
      id: v4(),
      checked: false,
      ...product,
    }
    const newProductsList = [...products, newProduct]
    setProducts(newProductsList)
    localStorage.setItem('@grocelist:products', JSON.stringify(newProductsList))
  }

  function getCurrentProduct(productId: string) {
    setCurrentEditingProductId(productId)
  }

  function editProduct(productId: string, product: ProductInput) {
    const newProductsList = products.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          ...product,
        }
      }
      return item
    })
    setProducts(newProductsList)
    localStorage.setItem('@grocelist:products', JSON.stringify(newProductsList))
  }

  function checkProduct(productId: string) {
    const newProductsList = products.map((item) => {
      if (item.id === productId) {
        return {
          ...item,
          checked: !item.checked,
        }
      }
      return item
    })
    setProducts(newProductsList)
    localStorage.setItem('@grocelist:products', JSON.stringify(newProductsList))
  }

  function removeProduct(productId: string) {
    const newProductsList = products.filter((item) => item.id !== productId)
    setProducts(newProductsList)
    localStorage.setItem('@grocelist:products', JSON.stringify(newProductsList))
  }

  function resetList() {
    setProducts([])
    localStorage.setItem('@grocelist:products', JSON.stringify([]))
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        currentEditingProductId,
        getCurrentProduct,
        addProductToList,
        editProduct,
        checkProduct,
        removeProduct,
        resetList,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  return useContext(ProductsContext)
}
