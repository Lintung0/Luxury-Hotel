// src/components/ui/BookingListSkeleton.jsx
// Skeleton loading untuk booking list
import React from 'react'
import SkeletonBlock from './SkeletonBlock'

const BookingListSkeleton = () => {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-start mb-4">
            <SkeletonBlock height="24px" width="200px" />
            <SkeletonBlock height="20px" width="100px" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <SkeletonBlock height="16px" width="80px" className="mb-1" />
              <SkeletonBlock height="20px" width="120px" />
            </div>
            <div>
              <SkeletonBlock height="16px" width="80px" className="mb-1" />
              <SkeletonBlock height="20px" width="120px" />
            </div>
            <div>
              <SkeletonBlock height="16px" width="80px" className="mb-1" />
              <SkeletonBlock height="20px" width="120px" />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <SkeletonBlock height="20px" width="150px" />
            <SkeletonBlock height="36px" width="100px" rounded="lg" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default BookingListSkeleton