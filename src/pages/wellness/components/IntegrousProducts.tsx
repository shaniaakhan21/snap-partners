/* eslint-disable no-use-before-define */
/* eslint-disable no-constant-condition */
import React, { useEffect } from 'react'
import Client from 'shopify-buy'
import MockUpItems from './mockup'

const IntegrousProducts = ({ products, userId, isLoggedIn, userRole, collectionId, IboId }) => {
  React.useEffect(() => {
    products.forEach((product) => {
      const img = new Image()
      img.src = product.productImage
    })
  }, [products])

  const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
  let ShopifyBuy:any
  useEffect(() => {
    const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
    if (isLoggedIn || isGuest) {
      const script = document.createElement('script')
      script.src = '/static/storefront.v1.js'
      script.async = true

      script.onload = async () => {
        ShopifyBuy = window.ShopifyBuy
        const client = Client.buildClient({
          domain: '0f4c5e-3.myshopify.com',
          storefrontAccessToken: 'e06de8605c8ed7c79a04d618e0b3eeb7',
          apiVersion: '2022-07'
        })

        const cartCustomAttributes = isLoggedIn
          ? [{ key: 'UID', value: String(userId) }]
          : [{ key: 'IBOID', value: String(IboId) }]
        ShopifyBuy.UI.onReady(client).then((ui) => {
          ui.createComponent('collection', {
            id: collectionId,
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
      return () => {
        document.body.removeChild(script)
      }
    }
  }, [userId, IboId])

  return (
    <div className="flex md:flex-row flex-col justify-start items-start" >
      { isLoggedIn || isGuest
        ? <div className='w-full flex justify-center m-3 mt-20 xs:mt-10 3xl:mt-20 mb-16' id="productTabs">
          <div className=' flex w-9/12 p-2 xs:p-10 xs:rounded-lg bg-[#ECECEC]'>
            <div id='collection-component-tabs' className='border-1'></div>
          </div>
        </div>
        : <div id="productTabs"><MockUpItems collectionId={collectionId} /></div>
      }
    </div>
  )
}

export default IntegrousProducts
