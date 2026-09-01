import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  elevation?: 'none' | 'sm' | 'md' | 'lg'
}

const Card: React.FC<CardProps> = ({ children, className = '', elevation = 'md' }) => {
  const elevationStyles = {
    none: 'border border-gray-200',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  }

  return (
    <div className={`bg-white dark:bg-slate-800 rounded-lg p-6 ${elevationStyles[elevation]} ${className}`}>
      {children}
    </div>
  )
}

export default Card
