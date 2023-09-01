'use client'
import LightBox from '@/components/lightbox/lightbox'
import { getSingleWpImageUrl } from '@/utils/get-wp-image-url'
import { type Image } from '@/wp/types'
import { useState } from 'react'
import { useToggle } from 'usehooks-ts'

interface ProductGalleryProps {
  images: Image[]
}

const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [value, toggle] = useToggle(false)
  const [activeImgLightBox, setActiveImgLightBox] = useState(
    images[0]?.guid ?? ''
  )
  return (
    <>
      {/* GALLERY */}
      <div className="flex h-full w-full gap-4">
        {images.length > 1 && (
          <div className="flex w-32 flex-col gap-4 ">
            {images.map((img, i) => (
              <div
                key={i}
                className="aspect-square w-full bg-white rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => {
                  setActiveImgLightBox(img.guid)
                  toggle()
                }}
              >
                <img
                  src={getSingleWpImageUrl(img)}
                  alt={img.altText ?? 'Imagen de producto SIIM'}
                  className="group-hover:scale-110 smooth-500"
                />
              </div>
            ))}
          </div>
        )}

        {/* FEATURED IMAGE */}
        <div className="flex group cursor-pointer  aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-white p-16">
          <img
            width="100%"
            className=" aspect-square group-hover:scale-110 smooth-500"
            alt={images[0]?.altText ?? 'Imagen de producto SIIM'}
            src={getSingleWpImageUrl(images[0])}
            onClick={() => {
              setActiveImgLightBox(images[0]?.guid ?? '')
              toggle()
            }}
          />
        </div>
      </div>
      <LightBox
        images={images}
        isOpen={value}
        handleClose={toggle}
        activeImgLightBox={activeImgLightBox}
        setActiveImgLightBox={setActiveImgLightBox}
      />
    </>
  )
}

export default ProductGallery
