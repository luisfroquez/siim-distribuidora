import { type Image, type WpProductBySlug } from '@/wp/types'

import { WpProductCard } from '@/components/product-card/wp-product-card'
import Text from '@/components/ui/text'
import parse from 'html-react-parser'
import ProductGallery from './ProductGallery'

const LeftSideProduct = ({
  product,
  image,
}: {
  product: WpProductBySlug
  image: Image | undefined
}) => {
  const mappedProduct = product.products.nodes[0]

  const relatedProducts = mappedProduct.related.nodes
  const upSellProducts = mappedProduct.upsell.nodes
  console.log(upSellProducts)

  const images = [
    mappedProduct.featuredImage?.node,
    ...(mappedProduct.galleryImages?.nodes ?? []),
  ].filter((e) => e) as Image[]

  return (
    <div className="flex flex-col w-[60%] gap-4 p-8">
      <ProductGallery images={images} />

      {mappedProduct.description && (
        <section className="w-full flex flex-col gap-4" id="productDescription">
          {parse(mappedProduct.description)}
        </section>
      )}

      {/* Opcion similar */}
      {upSellProducts?.length > 0 && (
        <div className="flex flex-col w-full items-start gap-2 mt-8">
          <Text variant="sectionHeading">Productos que te recomendamos</Text>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {upSellProducts.map((rp, i) => (
              <WpProductCard product={rp} key={i} variant="switchable" />
            ))}
          </div>
        </div>
      )}
      {/* PRODUCTOS RELACIONADOS */}
      <div className="flex flex-col w-full items-start gap-2 mt-8">
        <Text variant="sectionHeading">Productos Relacionados</Text>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {relatedProducts.map((rp, i) => (
            <WpProductCard product={rp} key={i} variant="switchable" />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftSideProduct
