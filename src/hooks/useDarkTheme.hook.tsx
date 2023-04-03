import { useEffect, useState } from 'react'

export function useDarkTheme() {
  const [theme, setTheme] = useState<string | null>(null)

  function toggleDarkMode() {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    if (localTheme) {
      setTheme(localTheme)
    } else {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches
      setTheme(prefersDarkMode ? 'dark' : 'light')
    }
  }, [])

  useEffect(() => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    metaThemeColor &&
      metaThemeColor.setAttribute(
        'content',
        theme === 'dark' ? '#18181b' : '#f4f4f5',
      )
  }, [theme])

  return { theme, toggleDarkMode }
}
