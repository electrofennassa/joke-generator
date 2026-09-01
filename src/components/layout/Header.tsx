import React from 'react'
import { useTheme } from '@/hooks'
import { Sun, Moon } from 'lucide-react'

interface HeaderProps {
  title?: string
  subtitle?: string
  showThemeToggle?: boolean
}

const Header: React.FC<HeaderProps> = ({ title = 'Joke Generator', subtitle, showThemeToggle = true }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-blue-950 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            {subtitle && <p className="text-blue-100 mt-1">{subtitle}</p>}
          </div>
          {showThemeToggle && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={24} /> : <Sun size={24} />}
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
