const ProductPageSkeleton = () => {
  return (
    <div role="status" className="flex flex-1">
      {/* LEFT SIDE */}
      <div className="flex h-full w-[60%] animate-pulse p-8">
        {/* FEATURED IMAGE */}
        <div className="aspect-square w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* Divider */}
      <div className=" h-full w-[1px] bg-border" />

      {/* RIGHT SIDE */}
      <div className=" h-full w-[40%] p-8">
        <div className=" flex h-full w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  )
}

export default ProductPageSkeleton
