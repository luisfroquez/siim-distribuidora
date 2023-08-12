const WpProductsSkeleton = () => {
  return (
    <div role="status" className="flex flex-col gap-6">
      <span className="sr-only">Loading...</span>

      <div className="flex items-center  w-full justify-between">
        <div className="flex gap-2 items-center">
          <div className="h-8 w-14 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-8 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-8 w-28 rounded-md bg-gray-200 dark:bg-gray-700" />
      </div>

      <div className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-[340px] w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

export default WpProductsSkeleton
