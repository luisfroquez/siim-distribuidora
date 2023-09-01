'use client'

import { cn } from '@/lib/utils'
import { type Image } from '@/wp/types'
import { useMemo } from 'react'

import BigImageLightBox from './big-image-lightbox'
import ImageThumbnailLightBox from './image-thumbnail-lightbox'

interface LightBoxProps {
  images: Image[]
  isOpen: boolean
  handleClose: () => void
  activeImgLightBox: string
  setActiveImgLightBox: (guid: string) => void
}

const LightBox = ({
  images,
  isOpen,
  handleClose,
  activeImgLightBox,
  setActiveImgLightBox,
}: LightBoxProps) => {
  const imagesQty = images.length

  const activeImgPos = useMemo(
    () => images.map((i) => i.guid).indexOf(activeImgLightBox),
    [activeImgLightBox]
  )

  const activeImg = images[activeImgPos] as Image

  function handlePreviousSvgClicked() {
    if (activeImgPos === 0) {
      setActiveImgLightBox(images[imagesQty - 1]?.guid ?? '')
    } else {
      setActiveImgLightBox(images[activeImgPos - 1]?.guid ?? '')
    }
  }

  function handleNextSvgClicked() {
    if (activeImgPos === imagesQty - 1) {
      setActiveImgLightBox(images[0]?.guid ?? '')
    } else {
      setActiveImgLightBox(images[activeImgPos + 1]?.guid ?? '')
    }
  }

  return (
    <>
      {isOpen && (
        <>
          <aside
            className={cn(
              'fixed top-0 left-0 w-full h-screen overflow-hidden z-50'
            )}
          >
            <div className="w-full h-full flex flex-col justify-center items-center  relative ">
              <div className="relative z-20">
                {/* previous */}
                <div
                  onClick={handlePreviousSvgClicked}
                  className="bg-border w-6 h-6 p-6 cursor-pointer rounded-[50%] inline-flex items-center justify-center flex-auto text-center absolute top-[50%] -translate-y-1/2 -left-6 hover:text-accent hover:bg-accent-foreground smooth-500"
                >
                  <svg
                    className="shrink-0 grow "
                    width="12"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 1 3 9l8 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>

                <BigImageLightBox img={activeImg} />

                {/* next */}
                <div
                  onClick={handleNextSvgClicked}
                  className="bg-border w-6 h-6 p-6 cursor-pointer rounded-[50%] inline-flex items-center justify-center flex-auto text-center absolute top-[50%] -translate-y-1/2 -right-6 hover:text-accent hover:bg-accent-foreground smooth-500"
                >
                  <svg
                    className="shrink-0 grow"
                    width="13"
                    height="18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="m2 1 8 8-8 8"
                      stroke="currentColor"
                      strokeWidth="3"
                      fill="none"
                      fillRule="evenodd"
                    />
                  </svg>
                </div>
                {/* close */}
                <svg
                  className="absolute -top-6 right-0 text-accent hover:text-white cursor-pointer"
                  onClick={handleClose}
                  width="14"
                  height="15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
                    fill="currentColor"
                    fillRule="evenodd"
                  />
                </svg>
              </div>
              <div className="z-20">
                <div className="flex gap-6 mt-6">
                  {images.map((img, i) => (
                    <ImageThumbnailLightBox
                      key={i}
                      img={img}
                      activeImgLightBox={activeImgLightBox}
                      setActiveImgLightBox={setActiveImgLightBox}
                    />
                  ))}
                </div>
              </div>
              {/*OVERLAY */}
              <div
                className="absolute cursor-pointer top-0 left-0 w-screen h-screen bg-black/80 backdrop-blur-lg z-10"
                onClick={handleClose}
              />
            </div>
          </aside>
        </>
      )}
    </>
  )
}

export default LightBox
