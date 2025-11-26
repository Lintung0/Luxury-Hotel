// src/context/ToastContext.jsx
// Context untuk global toast notifications
import React, { createContext, useContext, useState } from 'react'
import Toast from '../components/ui/Toast'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'error', duration = 5000) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { id, message, type, duration }])
  }

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showError = (message, duration) => addToast(message, 'error', duration)
  const showSuccess = (message, duration) => addToast(message, 'success', duration)
  const showWarning = (message, duration) => addToast(message, 'warning', duration)

  return (
    <ToastContext.Provider value={{ showError, showSuccess, showWarning }}>
      {children}
      <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </ToastContext.Provider>
  )
}