import { Minus, Pencil, Plus, PlusCircle } from 'phosphor-react'
import { useEffect, useState } from 'react'
import { useProducts } from '../providers/ProductsProvider'
import { removeMaskPriceAndConvertToCents } from '../utils/converters'

export function Actions() {
  const {
    addProductToList,
    currentEditingProductId,
    editProduct,
    getCurrentProduct,
    products,
  } = useProducts()
  const [product, setProduct] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [price, setPrice] = useState('')

  useEffect(() => {
    if (currentEditingProductId) {
      setProduct(
        products.find((item) => item.id === currentEditingProductId)?.product ??
          '',
      )
      setQuantity(
        products.find((item) => item.id === currentEditingProductId)
          ?.quantity ?? 0,
      )
      setPrice(
        String(
          products.find((item) => item.id === currentEditingProductId)?.price ??
            '',
        ),
      )
    }
  }, [currentEditingProductId, products])

  function handleAddProduct() {
    if (!product) {
      alert('Digite ao menos o nome do produto')
      return
    }
    addProductToList({
      product,
      quantity: Number(quantity),
      price: removeMaskPriceAndConvertToCents(price),
    })
    setProduct('')
    setQuantity(1)
    setPrice('')
  }

  function handleEditProduct() {
    editProduct(currentEditingProductId, {
      product,
      quantity: Number(quantity),
      price: removeMaskPriceAndConvertToCents(price),
    })
    setProduct('')
    setQuantity(1)
    setPrice('')
    getCurrentProduct('')
  }

  function handleCancelEditing() {
    getCurrentProduct('')
    setProduct('')
    setQuantity(1)
    setPrice('')
  }

  function maskPrice(value: string) {
    if (!value) return ''
    return `R$ ${value
      .replace(/\D/g, '')
      .replace(/(\d{1,2})$/, ',$1')
      .replace(/(?=(\d{3})+(\D))\B/g, '.')}`
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-auto gap-3 p-4 bg-gray-300 rounded-md">
      <input
        name="product"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        required
        type="text"
        placeholder="Produto"
        className="px-3 py-2 rounded-md w-full md:flex-1 placeholder:text-gray-600"
      />
      <div className="flex items-center gap-4 justify-center w-full md:w-1/4">
        <input
          name="price"
          value={maskPrice(price)}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="Valor (em R$)"
          className="px-3 py-2 w-full rounded-md placeholder:text-gray-600"
        />
        <div className="flex gap-2 max-w-[140px]">
          <button
            className="flex items-center justify-center text-white px-2 bg-red-500 rounded-md hover:bg-red-600 transition-colors"
            onClick={() =>
              setQuantity((p) => {
                if (p <= 1) {
                  return 1
                } else {
                  return p - 1
                }
              })
            }
          >
            <Minus weight="bold" size={14} />
          </button>
          <span>{quantity}</span>
          <button
            className="flex items-center justify-center text-white px-2 bg-emerald-400 rounded-md hover:bg-emerald-500 transition-colors"
            onClick={() => setQuantity((p) => p + 1)}
          >
            <Plus weight="bold" size={14} />
          </button>
        </div>
      </div>
      {currentEditingProductId ? (
        <>
          <button
            onClick={handleEditProduct}
            className="flex items-center justify-center gap-1 bg-emerald-400 px-3 py-2 rounded-md text-white w-full md:w-1/6 hover:bg-emerald-500 transition-colors"
          >
            <Pencil size={18} className="leading-none" />
            SALVAR
          </button>
          <button
            onClick={handleCancelEditing}
            className="flex items-center justify-center gap-1 bg-red-500 px-3 py-2 rounded-md text-white w-full md:w-1/6 hover:bg-red-600 transition-colors"
          >
            CANCELAR
          </button>
        </>
      ) : (
        <button
          onClick={
            currentEditingProductId ? handleEditProduct : handleAddProduct
          }
          className="flex items-center justify-center gap-1 bg-emerald-400 px-3 py-2 rounded-md text-white w-full md:w-1/6 hover:bg-emerald-500 transition-colors"
        >
          <PlusCircle size={18} className="leading-none" />
          ADICIONAR
        </button>
      )}
    </div>
  )
}
