// src/components/booking/PaymentModal.jsx
// Modal untuk proses payment dengan dark design
import React, { useState } from 'react'
import { createPayment, processPayment } from '../../api/paymentApi'
import { useToast } from '../../context/ToastContext'

const PaymentModal = ({ booking, onClose, onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card')
  const [loading, setLoading] = useState(false)
  const { showToast } = useToast()

  const paymentMethods = [
    { value: 'credit_card', label: 'Credit Card', icon: '💳' },
    { value: 'bank_transfer', label: 'Bank Transfer', icon: '🏦' },
    { value: 'e_wallet', label: 'E-Wallet', icon: '📱' },
    { value: 'cash', label: 'Cash', icon: '💵' }
  ]

  const handlePayment = async () => {
    setLoading(true)
    try {
      const payment = await createPayment({
        booking_id: booking.ID,
        payment_method: paymentMethod
      })
      
      await processPayment(payment.ID)
      
      onClose()
      showToast('Payment berhasil!', 'success')
      if (onSuccess) onSuccess()
    } catch (error) {
      showToast(error.response?.data?.error || 'Payment gagal', 'error')
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gray-900 dark:bg-gray-950 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">
            Complete Payment
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
          <div className="text-gray-400 text-sm mb-1">Total Amount</div>
          <div className="text-3xl font-bold text-gold-500">
            Rp {booking.TotalPrice?.toLocaleString('id-ID')}
          </div>
          <div className="text-gray-400 text-xs mt-2">
            Room {booking.RoomID} • Check-in: {new Date(booking.CheckInDate).toLocaleDateString('id-ID')}
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-3 text-gray-300">
            Select Payment Method
          </label>
          <div className="space-y-2">
            {paymentMethods.map((method) => (
              <button
                key={method.value}
                type="button"
                onClick={() => setPaymentMethod(method.value)}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center justify-between ${
                  paymentMethod === method.value
                    ? 'border-gold-500 bg-gold-500 bg-opacity-10'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{method.icon}</span>
                  <span className={`font-medium ${
                    paymentMethod === method.value ? 'text-gold-400' : 'text-gray-300'
                  }`}>
                    {method.label}
                  </span>
                </div>
                {paymentMethod === method.value && (
                  <svg className="w-5 h-5 text-gold-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-600 rounded-lg hover:bg-gray-800 text-gray-300 hover:text-white transition-colors font-medium"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handlePayment}
            disabled={loading}
            className="flex-1 px-6 py-3 bg-gold-600 hover:bg-gold-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium shadow-lg shadow-gold-900/50"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Processing...
              </div>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PaymentModal
