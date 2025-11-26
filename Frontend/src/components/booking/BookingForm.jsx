// src/components/booking/BookingForm.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { createBooking } from '../../api/bookingApi'
import { formatCurrency } from '../../utils/formatter'

const BookingForm = ({ room }) => {
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: 1,
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    guest_id_number: '',
    special_requests: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const { user } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) || 1 : value
    }))
  }

  const calculateTotal = () => {
    if (!formData.checkin || !formData.checkout) return 0
    
    const checkin = new Date(formData.checkin)
    const checkout = new Date(formData.checkout)
    const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24))
    
    return nights > 0 ? nights * room.Price : 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!user) {
      navigate('/login', { state: { from: `/rooms/${room.ID}` } })
      return
    }

    // Validation
    if (!formData.checkin || !formData.checkout) {
      setError('Please select check-in and check-out dates')
      return
    }

    if (new Date(formData.checkout) <= new Date(formData.checkin)) {
      setError('Check-out date must be after check-in date')
      return
    }

    if (formData.guests < 1 || formData.guests > room.MaxOccupancy) {
      setError(`Guests must be between 1 and ${room.MaxOccupancy}`)
      return
    }

    if (!formData.guest_name || !formData.guest_email || !formData.guest_phone) {
      setError('Please fill in all guest information')
      return
    }

    setLoading(true)
    setError('')

    try {
      const bookingData = {
        room_id: room.ID,
        check_in_date: formData.checkin,
        check_out_date: formData.checkout,
        payment_method: 'cash',
        guest_name: formData.guest_name,
        guest_email: formData.guest_email,
        guest_phone: formData.guest_phone,
        guest_id_number: formData.guest_id_number,
        special_requests: formData.special_requests,
        number_of_guests: formData.guests
      }

      console.log('Submitting booking:', bookingData)
      const response = await createBooking(bookingData)
      console.log('Booking created:', response)
      
      // Show success message
      alert('Booking created successfully! Redirecting to My Bookings...')
      
      // Wait a bit before redirect
      setTimeout(() => {
        navigate('/member/bookings')
      }, 500)
    } catch (err) {
      console.error('Booking error:', err)
      setError(err.response?.data?.message || err.message || 'Booking failed')
    } finally {
      setLoading(false)
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const minCheckout = formData.checkin || today

  const total = calculateTotal()
  const nights = formData.checkin && formData.checkout ? 
    Math.ceil((new Date(formData.checkout) - new Date(formData.checkin)) / (1000 * 60 * 60 * 24)) : 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Book This Room
      </h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Check-in Date *
          </label>
          <input
            type="date"
            name="checkin"
            required
            min={today}
            value={formData.checkin}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Check-out Date *
          </label>
          <input
            type="date"
            name="checkout"
            required
            min={minCheckout}
            value={formData.checkout}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Number of Guests * (Max: {room.MaxOccupancy})
          </label>
          <input
            type="number"
            name="guests"
            required
            min="1"
            max={room.MaxOccupancy}
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
            placeholder="Enter number of guests"
          />
        </div>

        {/* Guest Information Section */}
        <div className="border-t dark:border-gray-700 pt-4 mt-4">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Guest Information</h4>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                name="guest_name"
                required
                value={formData.guest_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
                placeholder="Enter full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="guest_email"
                required
                value={formData.guest_email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number *
              </label>
              <input
                type="tel"
                name="guest_phone"
                required
                value={formData.guest_phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
                placeholder="+62 812 3456 7890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                ID Number (KTP/Passport)
              </label>
              <input
                type="text"
                name="guest_id_number"
                value={formData.guest_id_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
                placeholder="Optional"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Special Requests
              </label>
              <textarea
                name="special_requests"
                value={formData.special_requests}
                onChange={handleChange}
                rows="2"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-gold-500 focus:border-gold-500"
                placeholder="Any special requests? (Optional)"
              />
            </div>
          </div>
        </div>

        <div className="border-t dark:border-gray-700 pt-4 mt-4">
          {nights > 0 && (
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>{nights} night{nights > 1 ? 's' : ''}</span>
              <span>{formatCurrency(room.Price)} × {nights}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
            <span className="text-2xl font-bold text-gold-600">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold-600 hover:bg-gold-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Processing...' : user ? 'Book Now' : 'Login to Book'}
        </button>
      </form>
    </div>
  )
}

export default BookingForm
