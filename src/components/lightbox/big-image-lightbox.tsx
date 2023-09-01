import { cn } from '@/lib/utils'
import { getSingleWpImageUrl } from '@/utils/get-wp-image-url'
import { type Image } from '@/wp/types'

const BigImageLightBox = ({ img }: { img: Image }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <img
        className={cn(
          'md:w-auto  object-cover md:object-contain -z-10 max-h-[30rem] min-w-[30rem] w-full aspect-square'
        )}
        src={getSingleWpImageUrl(img)}
        alt={img.altText}
      />
    </div>
  )
}

export default BigImageLightBox
