// src/components/rooms/RoomList.jsx
import React from 'react'
import RoomCard from './RoomCard'
import RoomCardSkeleton from '../ui/RoomCardSkeleton'

const RoomList = ({ rooms, loading }) => {
  // Pastikan rooms selalu array
  const roomsArray = Array.isArray(rooms) ? rooms : []

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (!roomsArray || roomsArray.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
          No rooms available
        </div>
        <p className="text-gray-400 dark:text-gray-500">
          Try adjusting your search filters or check back later.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {roomsArray.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  )
}

export default RoomList