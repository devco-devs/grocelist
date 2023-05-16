import { create } from 'zustand'
import { v4 } from 'uuid'

export interface IProduct {
  id: string
  name: string
  price: number
  amount: number
  checked?: boolean
}

export interface IProductInput {
  name: string
  price: string
  amount: number
}

interface IProductsStore {
  products: IProduct[]
  resetProducts: (products: IProduct[]) => void
  addProduct: (product: IProductInput) => void
  removeProduct: (id: string) => void
  updateProduct: (productId: string, product: IProductInput) => void
  checkProduct: (productId: string) => void
  sumTotalProducts: () => number
}

export const useProductsStore = create<IProductsStore>((set, get) => ({
  products: localStorage.getItem('@grocelist:products')
    ? JSON.parse(localStorage.getItem('@grocelist:products')!)
    : [],

  resetProducts: (products) => {
    set({ products })
  },

  addProduct: (product) => {
    const newProduct = {
      ...product,
      id: v4(),
      price: Number(product.price.replace(/[^0-9]/g, '')),
      checked: false,
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

  updateProduct: (productId, product) => {
    const existingProduct = get().products.find((p) => p.id === productId)

    if (existingProduct === undefined) return

    const newProduct = {
      ...product,
      id: existingProduct.id,
      price: Number(product.price.replace(/[^0-9]/g, '')),
    }

    set((state) => ({
      products: state.products.map((p) =>
        p.id === productId ? newProduct : p,
      ),
    }))

    const list = get().products
    localStorage.setItem('@grocelist:products', JSON.stringify(list))
  },

  checkProduct: (productId) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === productId
          ? { ...product, checked: !product.checked }
          : product,
      ),
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
