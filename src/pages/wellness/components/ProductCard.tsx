/* eslint-disable no-use-before-define */
/* eslint-disable no-constant-condition */
import React from 'react'
import Client from 'shopify-buy'
import MockUpItems from './mockup'

interface ProductInfo {
  productName: string;
  productImage: string;
  productPrice: string;
}

interface ProductCardProps {
  products: ProductInfo[];
}

const ProductCard = ({ userId, collectionId, isLoggedIn }) => {
  let ShopifyBuy:any
  React.useEffect(() => {
    // if (isLoggedIn && isAssociate !== null)
    if (isLoggedIn) {
      // Create and load the script
      const script = document.createElement('script')
      script.src = 'https://www.integrouswellness.com/storefront.v1.js'
      script.async = true

      script.onload = async () => {
        ShopifyBuy = window.ShopifyBuy
        const client = Client.buildClient({
          domain: '0f4c5e-3.myshopify.com',
          storefrontAccessToken: 'e06de8605c8ed7c79a04d618e0b3eeb7',
          apiVersion: '2022-07'
        })
        ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent('collection', {
            id: collectionId,
            node: document.getElementById('collection-component-tabs'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              cart: {
                customAttributes: [{ key: 'UID', value: String(userId) }],
                popup: false
              }
            }
          })
        })
      }

      document.body.appendChild(script)

      // Cleanup on unmount
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [collectionId, userId])
  return (
    <div className="flex md:flex-row flex-col justify-start items-center">
      { isLoggedIn
        ? <div id='collection-component-tabs'></div>
        : <MockUpItems collectionId={collectionId} />
      }
    </div>
  )
}

export default ProductCard
