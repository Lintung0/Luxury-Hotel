// src/components/ui/SkeletonBlock.jsx
// Reusable skeleton loading component
import React from 'react'

const SkeletonBlock = ({ 
  className = '', 
  height = '20px', 
  width = '100%',
  rounded = 'md'
}) => {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-700 animate-pulse ${className}`}
      style={{ 
        height, 
        width,
        borderRadius: rounded === 'md' ? '0.375rem' : 
                    rounded === 'lg' ? '0.5rem' : 
                    rounded === 'full' ? '9999px' : '0'
      }}
    />
  )
}

export default SkeletonBlock