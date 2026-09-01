import React from 'react'

interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error'
  message: string
  onClose?: () => void
  showIcon?: boolean
}

const Alert: React.FC<AlertProps> = ({ type = 'info', message, onClose, showIcon = true }) => {
  const typeStyles = {
    info: 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-700 dark:text-blue-100',
    success: 'bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-700 dark:text-green-100',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-700 dark:text-yellow-100',
    error: 'bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-700 dark:text-red-100',
  }

  const icons = {
    info: '📋',
    success: '✓',
    warning: '⚠️',
    error: '✕',
  }

  return (
    <div className={`border rounded-lg p-4 flex items-start gap-3 ${typeStyles[type]}`}>
      {showIcon && <span className="text-lg flex-shrink-0">{icons[type]}</span>}
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 text-lg font-bold opacity-50 hover:opacity-75 transition-opacity"
        >
          ✕
        </button>
      )}
    </div>
  )
}

export default Alert
