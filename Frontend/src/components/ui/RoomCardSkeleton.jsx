// src/components/ui/RoomCardSkeleton.jsx
// Skeleton loading untuk room card
import React from 'react'
import SkeletonBlock from './SkeletonBlock'

const RoomCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden gold-glow">
      <SkeletonBlock height="200px" rounded="none" />
      
      <div className="p-4">
        <SkeletonBlock height="24px" width="70%" className="mb-2" />
        <SkeletonBlock height="16px" width="90%" className="mb-1" />
        <SkeletonBlock height="16px" width="80%" className="mb-3" />
        
        <div className="flex justify-between items-center mb-3">
          <SkeletonBlock height="20px" width="100px" />
          <SkeletonBlock height="20px" width="80px" />
        </div>
        
        <SkeletonBlock height="40px" rounded="lg" />
      </div>
    </div>
  )
}

export default RoomCardSkeleton