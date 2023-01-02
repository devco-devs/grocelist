import { ShoppingCartSimple } from 'phosphor-react'
import { FormEvent, useState } from 'react'
import { useProductsStore } from '../store/products.store'
import { maskPrice } from '../utils/maskPrice'
import { AmountController } from './AmountController'
import { Input } from './Input'

export function ProductForm() {
  const { addProduct } = useProductsStore()
  const [product, setProduct] = useState('')
  const [amount, setAmount] = useState(1)
  const [price, setPrice] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    addProduct({
      name: product,
      amount,
      price: Number(price.replace(/[^0-9]/g, '')),
    })

    setProduct('')
    setAmount(1)
    setPrice('')
  }

  function incrementAmount() {
    setAmount((p) => p + 1)
  }

  function decrementAmount() {
    if (amount > 1) {
      setAmount((p) => p - 1)
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
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          placeholder="Nome do produto"
        />
        <div className="flex gap-2">
          <Input
            required
            value={maskPrice(price)}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Preço"
          />
          <AmountController
            amount={amount}
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
