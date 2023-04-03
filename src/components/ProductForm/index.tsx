import { ShoppingCartSimple } from 'phosphor-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useProductsStore } from '../../store/products.store'
import { maskPrice } from '../../utils/maskPrice'
import { Input } from '../Input'
import { AmountController } from './AmountController'

const INITIAL_STATE = {
  name: '',
  amount: 1,
  price: '',
}

export function ProductForm() {
  const { addProduct } = useProductsStore()
  const [product, setProduct] = useState(INITIAL_STATE)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    addProduct({
      ...product,
      price: Number(product.price.replace(/[^0-9]/g, '')),
    })
    setProduct(INITIAL_STATE)
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setProduct((prevState) => ({ ...prevState, [name]: value }))
  }

  function incrementAmount() {
    setProduct((prevState) => ({ ...prevState, amount: prevState.amount + 1 }))
  }

  function decrementAmount() {
    if (product.amount > 1) {
      setProduct((prevState) => ({
        ...prevState,
        amount: prevState.amount - 1,
      }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4  py-2 flex-wrap"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          required
          name="name"
          value={product.name}
          onChange={handleChangeInput}
          placeholder="Nome do produto"
        />
        <div className="flex gap-2">
          <Input
            required
            name="price"
            value={maskPrice(product.price)}
            onChange={handleChangeInput}
            placeholder="Preço"
          />
          <AmountController
            amount={product.amount}
            onAdd={incrementAmount}
            onRemove={decrementAmount}
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 min-w-[80px] rounded-lg transition-colors text-white font-semibold bg-green-600 hover:bg-green-700 p-2"
        >
          <ShoppingCartSimple weight="bold" size={22} />
          <span className="md:hidden">Adicionar</span>
        </button>
      </div>
    </form>
  )
}
