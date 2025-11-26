import React, { useState, useEffect } from 'react'
import { getRooms } from '../api/roomApi'
import RoomList from '../components/rooms/RoomList'
import PageSkeleton from '../components/ui/PageSkeleton'
import Pagination from '../components/ui/Pagination'

const Rooms = () => {
  const [rooms, setRooms] = useState([])
  const [allRooms, setAllRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalItems, setTotalItems] = useState(0)
  const itemsPerPage = 6
  const [filters, setFilters] = useState({
    type: '',
    minPrice: '',
    maxPrice: '',
    capacity: ''
  })

  useEffect(() => {
    loadRooms()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [currentPage, allRooms])

  const loadRooms = async () => {
    try {
      setLoading(true)
      const response = await getRooms()
      
      let roomsData = []
      if (response.data?.rooms) {
        roomsData = response.data.rooms
      } else if (response.rooms) {
        roomsData = response.rooms
      } else if (Array.isArray(response.data)) {
        roomsData = response.data
      } else if (Array.isArray(response)) {
        roomsData = response
      }

      setAllRooms(roomsData)
      setTotalItems(roomsData.length)
    } catch (error) {
      console.error('Failed to load rooms:', error)
      setAllRooms([])
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...allRooms]

    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(room => 
        room.Type.toLowerCase().includes(filters.type.toLowerCase())
      )
    }

    // Filter by price range
    if (filters.minPrice) {
      filtered = filtered.filter(room => room.Price >= parseFloat(filters.minPrice))
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(room => room.Price <= parseFloat(filters.maxPrice))
    }

    // Filter by capacity
    if (filters.capacity) {
      filtered = filtered.filter(room => room.MaxOccupancy >= parseInt(filters.capacity))
    }

    setTotalItems(filtered.length)
    
    // Client-side pagination
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const paginatedRooms = filtered.slice(startIndex, endIndex)
    
    setRooms(paginatedRooms)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setCurrentPage(1)
    applyFilters()
  }

  const handleFilterChange = (e) => {
    const { name, value } = e.target
    setFilters(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleReset = () => {
    setFilters({
      type: '',
      minPrice: '',
      maxPrice: '',
      capacity: ''
    })
    setCurrentPage(1)
    setTotalItems(allRooms.length)
    const startIndex = 0
    const endIndex = itemsPerPage
    setRooms(allRooms.slice(startIndex, endIndex))
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  if (loading) {
    return <PageSkeleton />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Available Rooms
      </h1>

      <form onSubmit={handleSearch} className="mb-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Room Type
            </label>
            <input
              type="text"
              name="type"
              value={filters.type}
              onChange={handleFilterChange}
              placeholder="Deluxe, Suite..."
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Min Price
            </label>
            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleFilterChange}
              placeholder="0"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Max Price
            </label>
            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleFilterChange}
              placeholder="999999"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Min Capacity
            </label>
            <input
              type="number"
              name="capacity"
              min="1"
              value={filters.capacity}
              onChange={handleFilterChange}
              placeholder="1"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>
          <div className="flex items-end gap-2">
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gold-600 hover:bg-gold-700 text-white rounded-lg font-medium transition-colors"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </form>

      {rooms.length > 0 ? (
        <>
          <RoomList rooms={rooms} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
            />
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No rooms found matching your criteria
          </p>
        </div>
      )}
    </div>
  )
}

export default Rooms
