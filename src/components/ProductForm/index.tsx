import { ShoppingCartSimple } from 'phosphor-react'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { IProductInput, useProductsStore } from '../../store/products.store'
import { maskPrice } from '../../utils/maskPrice'
import { Input } from '../Input'
import { AmountController } from './AmountController'

interface ProductFormProps {
  product?: IProductInput
  onSave?: (product: any) => void
  onCancel?: () => void
}

const INITIAL_STATE = {
  name: '',
  amount: 1,
  price: '',
}

export function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const { addProduct, products, resetProducts } = useProductsStore()
  const [productData, setProductData] = useState(INITIAL_STATE)

  const checkedProducts = products.filter((product) => product.checked)

  useEffect(() => {
    if (product) {
      setProductData(product)
    }
  }, [product])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()

    if (onSave) {
      onSave(productData)
    } else {
      addProduct(productData)
    }

    setProductData(INITIAL_STATE)
  }

  function handleRemoveCheckedProducts() {
    const newProducts = products.filter(
      (product) => !checkedProducts.includes(product),
    )

    resetProducts(newProducts)
  }

  function handleChangeInput(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target

    setProductData((prevState) => ({ ...prevState, [name]: value }))
  }

  function incrementAmount() {
    setProductData((prevState) => ({
      ...prevState,
      amount: prevState.amount + 1,
    }))
  }

  function decrementAmount() {
    if (productData.amount > 1) {
      setProductData((prevState) => ({
        ...prevState,
        amount: prevState.amount - 1,
      }))
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 flex-1 py-2 flex-wrap"
    >
      <div className="flex flex-col gap-4 md:flex-row">
        <Input
          required
          name="name"
          value={productData.name}
          onChange={handleChangeInput}
          placeholder="Nome do produto"
        />
        <div className="flex gap-2">
          <Input
            name="price"
            value={maskPrice(productData.price)}
            onChange={handleChangeInput}
            placeholder="Preço"
          />
          <AmountController
            amount={productData.amount}
            onAdd={incrementAmount}
            onRemove={decrementAmount}
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 min-w-[80px] rounded-lg transition-colors text-white font-semibold bg-green-600 hover:bg-green-700 p-2"
        >
          <ShoppingCartSimple weight="bold" size={22} />
          <span className="md:hidden">{product ? 'Salvar' : 'Adicionar'}</span>
        </button>

        {!onCancel && checkedProducts.length > 0 && (
          <button
            onClick={handleRemoveCheckedProducts}
            className="border border-zinc-200 text-zinc-200 rounded-lg transition-colors hover:bg-zinc-700 hover:text-white p-2"
          >
            Remover itens marcados
          </button>
        )}

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center justify-center gap-2 min-w-[80px] rounded-lg transition-colors text-white font-semibold bg-zinc-200 hover:bg-zinc-200 p-2"
          >
            <span>Cancelar</span>
          </button>
        )}
      </div>
    </form>
  )
}
