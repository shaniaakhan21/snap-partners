/* eslint-disable no-use-before-define */
/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react'
import Client from 'shopify-buy'
import MockUpItems from './mockup'

const IntegrousProducts = ({ userId, isLoggedIn, referralCode, userRole, collectionIdAllProducts }) => {
  let ShopifyBuy:any
  useEffect(() => {
    const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
    if (isLoggedIn || isGuest) {
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

        const cartCustomAttributes = isGuest
          ? [{ key: 'IBOID', value: String(userId) }]
          : [{ key: 'UID', value: String(userId) }]
        ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent('collection', {
            id: collectionIdAllProducts,
            node: document.getElementById('collection-component-tabs'),
            moneyFormat: '%24%7B%7Bamount%7D%7D',
            options: {
              cart: {
                customAttributes: cartCustomAttributes,
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

  const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
  return (
    <div className="flex md:flex-row flex-col justify-start items-center" >
      { isLoggedIn || isGuest
        ? <div className='w-full flex justify-center m-3 mt-20 xs:mt-10 3xl:mt-20' id="productTabs">
          <div className='bg-gradient-to-b to-[#ce894b] from-[#e1d2c98a] xs:to-[#eda772ed] xs:from-[#fde8da7a] backdrop-blur-sm bg-opacity-10 flex w-9/12 p-2 xs:p-10 xs:rounded-lg shadow-orange-custom'>
            <div id='collection-component-tabs' className='border-1'></div>
          </div>
        </div>
        : <div id="productTabs"><MockUpItems collectionId={collectionIdAllProducts} referralCode={referralCode}/></div>
      }
    </div>
  )
}

export default IntegrousProducts
