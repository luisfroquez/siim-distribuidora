import React from 'react'

interface ProductListingParams {
  products: any[]
}

const ProductListing = ({ products }: ProductListingParams) => {
  return (
    <div>
      <h2>Shop</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <p>Price: {product.price}</p>
            <img src={product.image.sourceUrl} alt={product.image.altText} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductListing
