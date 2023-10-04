/* eslint-disable no-use-before-define */
/* eslint-disable no-constant-condition */
import React, { useEffect, useState } from 'react'
import Client from 'shopify-buy'
import MockUpItems from './mockup'

interface ProductInfo {
  productName: string;
  productImage: string;
  productPrice: string;
}

interface IntegrousProductsProps {
  products: ProductInfo[];
}

const IntegrousProducts = ({ userId, isLoggedIn, referralCode }) => {
  const [isIntegrous, setIsIntegrous] = useState(false)
  let ShopifyBuy:any
  useEffect(() => {
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
        let collectionId = '446876746030'
        if (isIntegrous) {
          collectionId = '447611863342'
        }

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
  }, [userId])
  return (
    <div className="flex md:flex-row flex-col justify-start items-center">
      { isLoggedIn
        ? <div className='w-full flex justify-center m-3 mt-32'>
          <div className='bg-gradient-to-b to-[#ffe4d2bf] from-[#efa675eb] xs:to-[#eda772ed] xs:from-[#fde8da7a] backdrop-blur-sm bg-opacity-10 flex w-9/12 p-2 xs:p-10 xs:rounded-lg shadow-orange-custom'>
            <div id='collection-component-tabs' className='border-1'></div>
          </div>
        </div>
        : <div><MockUpItems collectionId={446876746030} referralCode={referralCode}/></div>
      }
    </div>
  )
}

export default IntegrousProducts
