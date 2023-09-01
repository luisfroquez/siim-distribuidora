import { cn } from '@/lib/utils'
import { getSingleWpImageUrl } from '@/utils/get-wp-image-url'
import { type Image } from '@/wp/types'
interface ImageThumbnailLightBoxProps {
  img: Image
  setActiveImgLightBox: (guid: string) => void
  activeImgLightBox: string
}

const ImageThumbnailLightBox = ({
  img,
  setActiveImgLightBox,
  activeImgLightBox,
}: ImageThumbnailLightBoxProps) => {
  return (
    <div
      className={cn(' w-20 rounded-xl cursor-pointer ', {
        'border-[3px] border-customOrange brightness-125':
          img.guid === activeImgLightBox,
      })}
      onClick={() => setActiveImgLightBox(img.guid)}
    >
      <img
        className={cn('rounded-md ', {
          'opacity-30': img.guid === activeImgLightBox,
          'hover:brightness-105 hover:opacity-50':
            img.guid !== activeImgLightBox,
        })}
        src={getSingleWpImageUrl(img)}
        alt={img.altText}
      />
    </div>
  )
}

export default ImageThumbnailLightBox
