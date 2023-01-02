import { ShoppingCart } from 'phosphor-react'

import { ToggleButton } from './ToggleButton'

export function Header() {
  return (
    <header className="flex items-center justify-between h-20 px-4">
      <div>
        <span className="flex text-zinc-800 dark:text-emerald-500 items-center gap-1 text-2xl font-semibold">
          <ShoppingCart />
          Grocelist
        </span>
      </div>

      <ToggleButton />
    </header>
  )
}
