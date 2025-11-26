// src/components/ui/PageSkeleton.jsx
// Full page skeleton loading component
import React from 'react'
import SkeletonBlock from './SkeletonBlock'

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Navbar Skeleton */}
      <div className="bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <SkeletonBlock height="32px" width="200px" />
            <div className="flex items-center space-x-4">
              <SkeletonBlock height="20px" width="80px" />
              <SkeletonBlock height="20px" width="80px" />
              <SkeletonBlock height="32px" width="32px" rounded="full" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <SkeletonBlock height="40px" width="300px" className="mb-4" />
          <SkeletonBlock height="20px" width="400px" />
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <SkeletonBlock height="200px" className="mb-4 rounded-lg" />
              <SkeletonBlock height="24px" width="70%" className="mb-2" />
              <SkeletonBlock height="16px" className="mb-1" />
              <SkeletonBlock height="16px" width="80%" className="mb-3" />
              <SkeletonBlock height="40px" rounded="lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PageSkeleton