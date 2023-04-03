import { Sun, Moon } from 'phosphor-react'
import { useDarkTheme } from '../hooks/useDarkTheme.hook'

export function ToggleButton() {
  const { theme, toggleDarkMode } = useDarkTheme()
  return (
    <button
      onClick={toggleDarkMode}
      className="bg-zinc-100 border-[1px] border-zinc-800 dark:bg-zinc-900 dark:hover:bg-emerald-400/10 dark:border-zinc-100 dark:hover:border-emerald-400 dark:hover:text-emerald-400 dark:text-zinc-100 rounded-lg p-3 hover:bg-emerald-400/10 transition-colors"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
