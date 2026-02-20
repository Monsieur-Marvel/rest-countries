function SkeletonCard() {
  return (
    <div className="bg-white shadow-md rounded-md overflow-hidden animate-pulse">
      <div className="w-full h-40 bg-gray-300"></div>

      <div className="p-5 space-y-3">
        <div className="h-5 bg-gray-300 rounded w-2/3"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>
    </div>
  )
}

export default SkeletonCard
