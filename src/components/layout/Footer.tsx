import React from 'react'

interface FooterProps {
  year?: number
}

const Footer: React.FC<FooterProps> = ({ year = new Date().getFullYear() }) => {
  return (
    <footer className="bg-gray-100 dark:bg-slate-900 text-gray-700 dark:text-gray-300 py-6 mt-12 border-t border-gray-200 dark:border-slate-700">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          © {year} Joke Generator. Made with ❤️ by Electro Fennassa
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Built with React, TypeScript, and Tailwind CSS
        </p>
      </div>
    </footer>
  )
}

export default Footer
