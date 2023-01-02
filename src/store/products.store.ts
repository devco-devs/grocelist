import { create } from 'zustand'
import { v4 } from 'uuid'

interface IProduct {
  id: string
  name: string
  price: number
  amount: number
}

interface IProductsStore {
  products: IProduct[]
  addProduct: (product: Omit<IProduct, 'id'>) => void
  removeProduct: (id: string) => void
  updateProduct: (product: IProduct) => void
  sumTotalProducts: () => number
}

export const useProductsStore = create<IProductsStore>((set, get) => ({
  products: localStorage.getItem('@grocelist:products')
    ? JSON.parse(localStorage.getItem('@grocelist:products')!)
    : [],

  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: v4(),
    }
    set((state) => ({
      products: [...state.products, newProduct],
    }))
    const list = get().products

    localStorage.setItem('@grocelist:products', JSON.stringify(list))
  },

  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== id),
    }))
    const list = get().products
    localStorage.setItem('@grocelist:products', JSON.stringify(list))
  },

  updateProduct: (product) => {
    set((state) => ({
      products: state.products.map((p) => (p.id === product.id ? product : p)),
    }))

    const list = get().products
    localStorage.setItem('@grocelist:products', JSON.stringify(list))
  },

  sumTotalProducts: () =>
    get().products.reduce(
      (total, product) => total + product.price * product.amount,
      0,
    ),
}))
