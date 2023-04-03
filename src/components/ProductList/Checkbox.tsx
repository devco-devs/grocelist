import { HTMLAttributes } from 'react'

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  onCheck: () => void
}

export function Checkbox({ onCheck, ...rest }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      onChange={onCheck}
      className="h-4 w-4 mr-3 rounded text-emerald-500 focus:ring-0 dark:bg-zinc-800 dark:checked:bg-emerald-500 dark:focus:ring-0"
      {...rest}
    />
  )
}
