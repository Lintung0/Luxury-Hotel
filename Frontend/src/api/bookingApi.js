// src/api/bookingApi.js
// API functions untuk member bookings
import axiosInstance from './axios'

/**
 * Buat booking baru
 * @param {Object} bookingData - Data booking
 * @returns {Promise} Response booking
 */
export const createBooking = async (bookingData) => {
  console.log('Creating booking with data:', bookingData)
  const response = await axiosInstance.post('/member/bookings', bookingData)
  console.log('Create booking response:', response)
  return response.data
}

/**
 * Dapatkan list bookings member
 * @returns {Promise} List bookings
 */
export const getMemberBookings = async () => {
  console.log('Fetching member bookings...')
  const response = await axiosInstance.get('/member/bookings')
  console.log('Member bookings response:', response)
  return response.data
}

/**
 * Dapatkan detail booking
 * @param {number} id - Booking ID
 * @returns {Promise} Detail booking
 */
export const getMemberBooking = async (id) => {
  const response = await axiosInstance.get(`/member/bookings/${id}`)
  return response.data
}

/**
 * Batalkan booking
 * @param {number} id - Booking ID
 * @returns {Promise} Response
 */
export const cancelBooking = async (id) => {
  const response = await axiosInstance.put(`/member/bookings/${id}/cancel`)
  return response.data
}

/**
 * Hapus booking yang cancelled
 * @param {number} id - Booking ID
 * @returns {Promise} Response
 */
export const deleteBooking = async (id) => {
  const response = await axiosInstance.delete(`/member/bookings/${id}`)
  return response.data
}

// Contoh request dan response structure:
/*
Create Booking Request:
{
  "room_id": 1,
  "checkin": "2024-01-15",
  "checkout": "2024-01-20",
  "guests": 2,
  "special_requests": "Early checkin requested"
}

Create Booking Response:
{
  "id": 1,
  "room_id": 1,
  "checkin": "2024-01-15",
  "checkout": "2024-01-20",
  "total_price": 1250000,
  "status": "confirmed"
}
*/