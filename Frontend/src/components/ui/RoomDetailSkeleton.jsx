// src/components/ui/RoomDetailSkeleton.jsx
// Skeleton loading untuk room detail page
import React from 'react'
import SkeletonBlock from './SkeletonBlock'

const RoomDetailSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Image Gallery Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <SkeletonBlock height="400px" rounded="lg" className="lg:col-span-2" />
        <div className="space-y-4">
          <SkeletonBlock height="190px" rounded="lg" />
          <SkeletonBlock height="190px" rounded="lg" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <SkeletonBlock height="32px" width="60%" className="mb-4" />
          <SkeletonBlock height="20px" className="mb-2" />
          <SkeletonBlock height="20px" width="90%" className="mb-2" />
          <SkeletonBlock height="20px" width="80%" className="mb-6" />
          
          <SkeletonBlock height="24px" width="40%" className="mb-4" />
          <div className="grid grid-cols-2 gap-2 mb-6">
            {[...Array(6)].map((_, i) => (
              <SkeletonBlock key={i} height="20px" width="120px" />
            ))}
          </div>
        </div>

        {/* Booking Form Skeleton */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit">
          <SkeletonBlock height="28px" className="mb-4" />
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i}>
                <SkeletonBlock height="16px" width="40%" className="mb-2" />
                <SkeletonBlock height="40px" rounded="lg" />
              </div>
            ))}
            <SkeletonBlock height="48px" rounded="lg" className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetailSkeleton