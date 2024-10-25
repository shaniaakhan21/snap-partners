/* eslint-disable no-use-before-define */
import * as React from 'react'
import SingleItem from './SingleItem'
import axios from 'axios'
import { Grid } from '@mui/material'

export default function MockUpItems ({ collectionId, referralCode }) {
  const [products, setProducts] = React.useState([])
  React.useEffect(() => {
    async function Shopify () {
      const response = await axios.post(
        'https://0f4c5e-3.myshopify.com/api/2022-07/graphql',
        {
          query:
            'fragment VariantFragment on ProductVariant  { id,title,price { amount,currencyCode },priceV2: price { amount,currencyCode },weight,available: availableForSale,sku,compareAtPrice { amount,currencyCode },compareAtPriceV2: compareAtPrice { amount,currencyCode },image { id,src: url,altText,width,height },selectedOptions { name,value },unitPrice { amount,currencyCode },unitPriceMeasurement { measuredType,quantityUnit,quantityValue,referenceUnit,referenceValue } },fragment CollectionFragment on Collection  { id,handle,description,descriptionHtml,updatedAt,title,image { id,src: url,altText } },fragment ProductFragment on Product  { id,availableForSale,createdAt,updatedAt,descriptionHtml,description,handle,productType,title,vendor,publishedAt,onlineStoreUrl,options { id,name,values },images (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { id,src: url,altText,width,height } } },variants (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...VariantFragment } } } },query ($id:ID!,$productsFirst:Int!)  { node (id: $id) { __typename,...CollectionFragment,... on Collection { id,products (first: $productsFirst) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...ProductFragment } } } } } }',
          variables: { id: `gid://shopify/Collection/${collectionId}`, productsFirst: 20 }
        },
        {
          headers: {
            'X-Shopify-Storefront-Access-Token': 'e06de8605c8ed7c79a04d618e0b3eeb7'
          }
        }
      )
      console.log(response.data.data.node.products.edges)
      setProducts(response.data.data.node.products.edges)
    }
    Shopify()
  }, [])
  const handleGuestLogin = () => {
    localStorage.setItem('isGuest', 'true')
    window.location.reload()
  }
  return (
    <div className='w-full flex justify-center m-3 mt-20 xs:mt-32'>
      <div
        className='bg-gradient-to-b to-[#ce894b] from-[#e1d2c98a] xs:to-[#eda772ed] xs:from-[#fde8da7a] backdrop-blur-sm bg-opacity-10 flex w-9/12 p-2 xs:p-10 xs:rounded-lg shadow-orange-custom'
      >
        <Grid container justifyContent="center" sx={{ textAlign: 'center' }}>
          {products.map((product, index) => (
            <Grid key={product.id} item xs={12} md={3}>
              <SingleItem
                image={product.node.variants.edges[0].node.image.src}
                name={product.node.title}
                price={`$${product.node.variants.edges[0].node.price.amount}`}
                btnLabel="Add to Cart"
                index={index}
                referralCode={referralCode}
                onGuestLogin={handleGuestLogin}
              />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
