// src/api/paymentApi.js
// API functions untuk payment
import axiosInstance from './axios'

/**
 * Buat payment untuk booking
 * @param {Object} paymentData - { booking_id, payment_method }
 * @returns {Promise} Payment object
 */
export const createPayment = async (paymentData) => {
  const response = await axiosInstance.post('/member/payments', paymentData)
  return response.data
}

/**
 * Get payment by booking ID
 * @param {number} bookingId - Booking ID
 * @returns {Promise} Payment object
 */
export const getPaymentByBooking = async (bookingId) => {
  const response = await axiosInstance.get(`/member/payments/booking/${bookingId}`)
  return response.data
}

/**
 * Process payment (change status to success)
 * @param {number} paymentId - Payment ID
 * @returns {Promise} Success message
 */
export const processPayment = async (paymentId) => {
  const response = await axiosInstance.post(`/member/payments/${paymentId}/process`)
  return response.data
}

/* Example Request & Response:
Create Payment Request:
{
  "booking_id": 1,
  "payment_method": "credit_card"
}

Create Payment Response:
{
  "ID": 1,
  "booking_id": 1,
  "amount": 1500000,
  "payment_method": "credit_card",
  "status": "pending",
  "transaction_id": "TRX-1-1732612345"
}

Process Payment Response:
{
  "message": "Payment processed successfully"
}
*/
