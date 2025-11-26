// src/components/ui/Toast.jsx
// Reusable toast notification component
import React, { useEffect } from 'react'
import { FiCheckCircle, FiAlertCircle, FiXCircle, FiX } from 'react-icons/fi'

const Toast = ({ message, type = 'error', onClose, duration = 5000 }) => {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <FiCheckCircle className="w-5 h-5 text-green-400" />
      case 'warning':
        return <FiAlertCircle className="w-5 h-5 text-yellow-400" />
      case 'error':
        return <FiXCircle className="w-5 h-5 text-red-400" />
      default:
        return <FiAlertCircle className="w-5 h-5 text-blue-400" />
    }
  }

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 dark:bg-green-900 border-green-200 dark:border-green-800'
      case 'warning':
        return 'bg-yellow-50 dark:bg-yellow-900 border-yellow-200 dark:border-yellow-800'
      case 'error':
        return 'bg-red-50 dark:bg-red-900 border-red-200 dark:border-red-800'
      default:
        return 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800'
    }
  }

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-800 dark:text-green-200'
      case 'warning':
        return 'text-yellow-800 dark:text-yellow-200'
      case 'error':
        return 'text-red-800 dark:text-red-200'
      default:
        return 'text-blue-800 dark:text-blue-200'
    }
  }

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getBackgroundColor()} border rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out`}>
      <div className="flex items-start p-4">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className={`ml-3 flex-1 ${getTextColor()}`}>
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <FiX className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default Toast