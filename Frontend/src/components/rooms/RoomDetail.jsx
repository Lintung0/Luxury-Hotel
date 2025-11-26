// src/components/rooms/RoomDetail.jsx
import React, { useState } from 'react'
import { formatCurrency } from '../../utils/formatter'
import BookingForm from '../booking/BookingForm'

const RoomDetail = ({ room, loading }) => {
  const [selectedImage, setSelectedImage] = useState(0)

  if (loading || !room) {
    return null
  }

  const images = room.Images?.length > 0 ? room.Images : [
    { ImageURL: 'https://via.placeholder.com/800x600?text=Room+Image', Caption: 'Room View' }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2">
          <img
            src={images[selectedImage]?.ImageURL}
            alt={images[selectedImage]?.Caption || `Room ${room.RoomNumber}`}
            className="w-full h-96 lg:h-[400px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {images.slice(0, 4).map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative h-44 rounded-lg overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-gold-600' : ''
              }`}
            >
              <img
                src={image.ImageURL}
                alt={image.Caption}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Room Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Room {room.RoomNumber} - {room.Type}
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300 text-lg mb-6">
            {room.Description || 'Luxury room with modern amenities'}
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Price</div>
              <div className="text-2xl font-bold text-gold-600">
                {formatCurrency(room.Price)}
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400"> / night</span>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Max Occupancy</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {room.MaxOccupancy} Guests
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Room Type</div>
              <div className="text-xl font-semibold text-gray-900 dark:text-white">
                {room.Type}
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Status</div>
              <div className="text-xl font-semibold text-green-600">
                {room.Status}
              </div>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="lg:col-span-1">
          <BookingForm room={room} />
        </div>
      </div>
    </div>
  )
}

export default RoomDetail
