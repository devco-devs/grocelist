import { ShoppingCart } from 'phosphor-react'

export function Empty() {
  return (
    <div className='flex flex-col items-center mt-40 gap-2'>
      <ShoppingCart size={44} />
      <strong className='text-2xl'>Carrinho Vazio!</strong>
      <span>Adicione produtos ao seu carrinho!</span>
    </div>
  )
}