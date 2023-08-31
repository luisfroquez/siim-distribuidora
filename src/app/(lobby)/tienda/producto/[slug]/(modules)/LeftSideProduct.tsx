import { getSingleWpImageUrl } from '@/utils/get-wp-image-url'
import { type Image, type WpProductBySlug } from '@/wp/types'

import parse from 'html-react-parser'

const LeftSideProduct = ({
  product,
  image,
}: {
  product: WpProductBySlug
  image: Image | undefined
}) => {
  const mappedProduct = product.products.nodes[0]

  return (
    <div className="flex flex-col w-[60%] gap-4 p-8">
      {/* GALLERY */}
      <div className="flex h-full w-full gap-4">
        {mappedProduct.galleryImages?.nodes &&
          mappedProduct.galleryImages.nodes.length > 0 && (
            <div className="flex w-32 flex-col gap-4 ">
              {mappedProduct.galleryImages.nodes.map((img, i) => (
                <div
                  key={i}
                  className="aspect-square w-full rounded-xl bg-white"
                >
                  <img
                    src={img.guid}
                    alt={img.altText ?? 'Imagen de producto SIIM'}
                  />
                </div>
              ))}
            </div>
          )}

        {/* FEATURED IMAGE */}
        <div className="flex  aspect-square w-full items-center justify-center overflow-hidden rounded-xl bg-white p-16">
          <img
            width="100%"
            className="aspect-square"
            alt={image?.altText ?? 'Imagen de producto SIIM'}
            src={getSingleWpImageUrl(image)}
          />
        </div>
      </div>

      {mappedProduct.description && (
        <section className="w-full flex flex-col gap-4" id="productDescription">
          {parse(mappedProduct.description)}
        </section>
      )}
    </div>
  )
}

export default LeftSideProduct
