// src/components/admin/AdminRooms.jsx
import React, { useState, useEffect } from 'react'
import { getAdminRooms, createRoom, updateRoom, deleteRoom } from '../../api/adminApi/adminRoomApi'
import AdminTableSkeleton from '../ui/AdminTableSkeleton'
import { formatCurrency } from '../../utils/formatter'

const AdminRooms = () => {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [formData, setFormData] = useState({
    room_number: '',
    type: '',
    price: '',
    description: '',
    max_occupancy: '',
    image_url: ''
  })
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    loadRooms()
  }, [])

  const loadRooms = async () => {
    try {
      console.log('Loading rooms...')
      const response = await getAdminRooms()
      console.log('Response:', response)
      
      // Backend returns: { success, message, data: { rooms: [...] } }
      const roomsData = response.data?.rooms || response.rooms || response.data || []
      console.log('Rooms data:', roomsData)
      
      setRooms(roomsData)
      setError(null)
    } catch (error) {
      console.error('Failed to load rooms:', error)
      console.error('Error response:', error.response)
      setError(error.response?.data?.message || error.message || 'Failed to load rooms')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('room_number', formData.room_number)
      formDataToSend.append('type', formData.type)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('max_occupancy', formData.max_occupancy)
      
      console.log('Form data:', {
        room_number: formData.room_number,
        type: formData.type,
        price: formData.price,
        description: formData.description,
        max_occupancy: formData.max_occupancy,
        hasImage: !!imageFile
      })
      
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      if (editingRoom) {
        await updateRoom(editingRoom.ID, formDataToSend)
      } else {
        await createRoom(formDataToSend)
      }

      setShowModal(false)
      setEditingRoom(null)
      resetForm()
      setImageFile(null)
      setImagePreview(null)
      loadRooms()
    } catch (error) {
      console.error('Failed to save room:', error)
      alert('Failed to save room: ' + (error.response?.data?.message || error.message))
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEdit = (room) => {
    console.log('Editing room:', room)
    console.log('Room Images:', room.Images)
    setEditingRoom(room)
    setFormData({
      room_number: room.RoomNumber || '',
      type: room.Type || '',
      price: room.Price?.toString() || '',
      description: room.Description || '',
      max_occupancy: room.MaxOccupancy?.toString() || ''
    })
    const existingImage = room.Images?.[0]?.ImageURL || null
    const fullImageUrl = existingImage ? `http://127.0.0.1:9000${existingImage}` : null
    console.log('Image URL:', existingImage, '-> Full URL:', fullImageUrl)
    setImagePreview(fullImageUrl)
    setImageFile(null)
    setShowModal(true)
  }

  const handleRemoveImage = async () => {
    if (editingRoom?.Images?.[0]?.ID) {
      if (window.confirm('Are you sure you want to delete this image?')) {
        try {
          const imageId = editingRoom.Images[0].ID
          await fetch(`http://127.0.0.1:9000/api/admin/rooms/${editingRoom.ID}/images/${imageId}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          setImagePreview(null)
          setImageFile(null)
          loadRooms()
        } catch (error) {
          console.error('Failed to delete image:', error)
          alert('Failed to delete image')
        }
      }
    } else {
      setImagePreview(null)
      setImageFile(null)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      try {
        await deleteRoom(id)
        loadRooms()
      } catch (error) {
        console.error('Failed to delete room:', error)
        alert('Failed to delete room: ' + (error.response?.data?.message || error.message))
      }
    }
  }

  const resetForm = () => {
    setFormData({
      room_number: '',
      type: '',
      price: '',
      description: '',
      max_occupancy: '',
      image_url: ''
    })
    setImageFile(null)
    setImagePreview(null)
  }

  if (loading) {
    return <AdminTableSkeleton />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Room Management
        </h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          Add New Room
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
          {error}
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Room Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Max Occupancy</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {rooms.map((room) => (
                <tr key={room.ID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{room.RoomNumber}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{room.Description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{room.Type}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{formatCurrency(room.Price)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{room.MaxOccupancy} guests</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      room.Status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      room.Status === 'booked' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {room.Status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button onClick={() => handleEdit(room)} className="text-green-600 hover:text-green-900 dark:text-green-400">Edit</button>
                    <button onClick={() => handleDelete(room.ID)} className="text-red-600 hover:text-red-900 dark:text-red-400">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rooms.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            No rooms found. Create your first room to get started.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {editingRoom ? 'Edit Room' : 'Add New Room'}
                </h2>
                <button onClick={() => { setShowModal(false); setEditingRoom(null); resetForm(); }} className="text-gray-500 hover:text-gray-700 dark:text-gray-400">✕</button>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Number *</label>
                  <input type="text" required value={formData.room_number} onChange={(e) => setFormData(prev => ({ ...prev, room_number: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="101" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Type *</label>
                  <input type="text" required value={formData.type} onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Deluxe, Suite, Standard" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                  <textarea value={formData.description} onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))} rows="3" className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="Room description..." />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Room Image</label>
                  {editingRoom && editingRoom.Images?.[0] && !imageFile && (
                    <div className="mb-2 p-2 bg-blue-50 dark:bg-blue-900 rounded">
                      <p className="text-xs text-blue-700 dark:text-blue-300">Current image: {editingRoom.Images[0].ImageURL}</p>
                    </div>
                  )}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-gold-50 file:text-gold-700 hover:file:bg-gold-100 dark:file:bg-gold-900 dark:file:text-gold-300" 
                  />
                  {imagePreview && (
                    <div className="mt-2 relative inline-block">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="h-32 w-auto rounded-lg border border-gray-300 dark:border-gray-600"
                        onError={(e) => {
                          console.error('Image load error:', e.target.src)
                          e.target.style.display = 'none'
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Choose an image file (JPG, PNG, max 5MB)</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price (IDR) *</label>
                    <input type="number" required min="0" value={formData.price} onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="500000" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max Occupancy *</label>
                    <input type="number" required min="1" max="10" value={formData.max_occupancy} onChange={(e) => setFormData(prev => ({ ...prev, max_occupancy: e.target.value }))} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="2" />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t dark:border-gray-600">
                  <button type="button" onClick={() => { setShowModal(false); setEditingRoom(null); resetForm(); }} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md">Cancel</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-gold-600 hover:bg-gold-700 rounded-md">{editingRoom ? 'Update Room' : 'Create Room'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminRooms
