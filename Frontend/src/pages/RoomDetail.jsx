// src/pages/RoomDetail.jsx
// Room detail page dengan booking form
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRoom } from '../api/roomApi'
import RoomDetail from '../components/rooms/RoomDetail'
import RoomDetailSkeleton from '../components/ui/RoomDetailSkeleton'

const RoomDetailPage = () => {
  const { id } = useParams()
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadRoom()
  }, [id])

  const loadRoom = async () => {
    try {
      setLoading(true)
      const roomData = await getRoom(id)
      setRoom(roomData)
    } catch (err) {
      setError('Failed to load room details')
      console.error('Error loading room:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <RoomDetailSkeleton />
  }

  if (error || !room) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <div className="text-red-600 dark:text-red-400 text-lg mb-4">
            {error || 'Room not found'}
          </div>
          <button
            onClick={() => window.history.back()}
            className="text-gold-600 hover:text-gold-700 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    )
  }

  return <RoomDetail room={room} loading={loading} />
}

export default RoomDetailPage