// src/api/roomApi.js
import axiosInstance from './axios'

/**
 * Dapatkan semua rooms
 */
export const getRooms = async () => {
  try {
    const response = await axiosInstance.get('/rooms')
    return response.data
  } catch (error) {
    console.error('Error fetching rooms:', error)
    throw error
  }
}

/**
 * Dapatkan detail room by ID
 */
export const getRoom = async (id) => {
  try {
    const response = await axiosInstance.get(`/rooms/${id}`)
    console.log('Room detail response:', response)
    // Backend returns: { success, message, data: { room } }
    return response.data?.data || response.data
  } catch (error) {
    console.error(`Error fetching room ${id}:`, error)
    throw error
  }
}

/**
 * Cek ketersediaan room
 */
export const getAvailableRooms = async (params) => {
  try {
    const response = await axiosInstance.post('/rooms/available', params)
    // Pastikan return selalu konsisten
    return {
      rooms: Array.isArray(response.data?.rooms) ? response.data.rooms : 
             Array.isArray(response.data) ? response.data : [],
      ...response.data
    }
  } catch (error) {
    console.error('Error fetching available rooms:', error)
    // Return empty array jika error
    return { rooms: [] }
  }
}