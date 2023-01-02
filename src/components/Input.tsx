import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }: InputProps) {
  return (
    <div className="flex items-center gap-3 h-12 py-4 px-3 rounded ring-1 ring-zinc-600 bg-zinc-200 dark:bg-zinc-800 w-full focus-within:ring-2 focus-within:ring-emerald-500">
      <input
        className="bg-transparent flex-1 text-zinc-800 dark:text-gray-100 text-xs placeholder:text-gray-400 focus:outline-none"
        {...rest}
      />
    </div>
  )
}
