import { Minus, Plus } from 'phosphor-react'

interface AmountControllerProps {
  amount: number
  onAdd: () => void
  onRemove: () => void
}

export function AmountController({
  amount,
  onAdd,
  onRemove,
}: AmountControllerProps) {
  return (
    <div className="px-4 flex items-center justify-center gap-4  rounded ring-1 ring-zinc-600 bg-zinc-200 dark:bg-zinc-800">
      <button type="button" onClick={onRemove}>
        <Minus />
      </button>
      <span>{amount}</span>
      <button type="button" onClick={onAdd}>
        <Plus />
      </button>
    </div>
  )
}
