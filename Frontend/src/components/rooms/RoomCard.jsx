// src/components/rooms/RoomCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../../utils/formatter'

const RoomCard = ({ room }) => {
  if (!room || typeof room !== 'object') {
    return null
  }

  const mainImage = room.Images?.[0]?.ImageURL || 'https://via.placeholder.com/400x300?text=Room+Image'
  const roomNumber = room.RoomNumber || 'N/A'
  const roomType = room.Type || 'Standard'
  const capacity = room.MaxOccupancy || 1
  const price = room.Price || 0
  const description = room.Description || 'No description available'
  const roomId = room.ID || room.id

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden gold-glow hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={mainImage}
          alt={`Room ${roomNumber}`}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-gold-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
            {capacity} Guests
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Room {roomNumber} - {roomType}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="text-gold-600 font-semibold text-lg">
              {formatCurrency(price)}
            </span>
            <span className="text-gray-400 dark:text-gray-500"> / night</span>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Max {capacity} guests
          </div>
        </div>

        <Link
          to={`/rooms/${roomId}`}
          className="block w-full bg-gold-600 hover:bg-gold-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200"
        >
          View Details & Book
        </Link>
      </div>
    </div>
  )
}

export default RoomCard
