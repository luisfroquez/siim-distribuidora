const WpProductsSkeleton = () => {
  return (
    <div
      role="status"
      className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <span className="sr-only">Loading...</span>
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}

export default WpProductsSkeleton
