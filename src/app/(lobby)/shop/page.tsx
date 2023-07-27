'use client'

import React from 'react'
import { NodeByUri } from '@/wp/get-node-by-uri'
import { useQuery } from '@apollo/client'

import ProductListing from './ProductListing'

const ShopPage = () => {
  // const { loading, error, data } = useQuery(NodeByUri, {
  //   variables: { uri: '/shop' },
  // })

  // if (loading) return <p>Loading...</p>
  // if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <h2>Shop</h2>
    </div>
  )
}

export default ShopPage
