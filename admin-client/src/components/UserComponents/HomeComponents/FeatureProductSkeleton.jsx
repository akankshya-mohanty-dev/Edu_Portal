import React from 'react'

const FeatureProductSkeleton = () => {
  return (
     <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="border rounded-md p-3 relative bg-white animate-pulse"
      >
        {/* Tag skeleton */}
        <div className="absolute top-3 left-3 bg-gray-200 w-16 h-6 rounded-full"></div>

        {/* Wishlist skeleton */}
        <div className="absolute top-3 right-3 bg-gray-200 w-8 h-8 rounded-full"></div>

        {/* Image skeleton */}
        <div className="mx-auto mt-8 w-40 h-40 bg-gray-200 rounded"></div>

        {/* Info */}
        <div className="mt-4 text-center bg-gray-100 p-2 rounded">
          <div className="h-4 w-3/4 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-3 w-1/2 bg-gray-200 rounded mx-auto mb-2"></div>
          <div className="h-5 w-1/3 bg-gray-200 rounded mx-auto"></div>
        </div>

        {/* Cart Icon */}
        <div className="absolute bottom-3 right-3 bg-gray-200 w-10 h-10 rounded-full"></div>
      </div>
    ))}
  </div>
  )
}

export default FeatureProductSkeleton