/* eslint-disable no-use-before-define */

import React, { useEffect, useRef, useState } from 'react'
import Footer from './wellness/components/Footer'
import Header from './wellness/components/Header'
import MainSection from './wellness/components/MainSection'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AuthRecover } from 'components/common/AuthRecover'
import { useAuthStore } from 'lib/stores'
import ProductTabs from './wellness/components/ProductTabs'

const wellness = () => {
  const router = useRouter()
  const { auth, setAuth } = useAuthStore()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userData, setuserData] = React.useState(null)
  const [IboId, setIboId] = React.useState(0)
  const [ownerName, setownerName] = React.useState(null)
  const [referralCode, setreferralCode] = React.useState(null)
  const [ownerEmail, setownerEmail] = React.useState(null)
  const [isIntegrous, setIsIntegrous] = React.useState(null)
  const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
  const [teaCoffeeProducts, setTeaCoffeeProducts] = useState([])
  const [generalProducts, setGeneralProducts] = useState([])
  const [AllProducts, setProducts] = useState([])
  const [ownerProfileImage, setownerProfileImage] = React.useState(null)

  const scrollToProductTabs = () => {
    const productTabsElement = document.getElementById('productTabs')
    if (productTabsElement) {
      productTabsElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true)
      setuserData(auth)
    }
  }, [auth])

  useEffect(() => {
    async function Shopify () {
      const response = await axios.post(
        'https://0f4c5e-3.myshopify.com/api/2022-07/graphql',
        {
          query:
            'fragment VariantFragment on ProductVariant  { id,title,price { amount,currencyCode },priceV2: price { amount,currencyCode },weight,available: availableForSale,sku,compareAtPrice { amount,currencyCode },compareAtPriceV2: compareAtPrice { amount,currencyCode },image { id,src: url,altText,width,height },selectedOptions { name,value },unitPrice { amount,currencyCode },unitPriceMeasurement { measuredType,quantityUnit,quantityValue,referenceUnit,referenceValue } },fragment CollectionFragment on Collection  { id,handle,description,descriptionHtml,updatedAt,title,image { id,src: url,altText } },fragment ProductFragment on Product  { id,availableForSale,createdAt,updatedAt,descriptionHtml,description,handle,productType,title,vendor,publishedAt,onlineStoreUrl,options { id,name,values },images (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { id,src: url,altText,width,height } } },variants (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...VariantFragment } } } },query ($id:ID!,$productsFirst:Int!)  { node (id: $id) { __typename,...CollectionFragment,... on Collection { id,products (first: $productsFirst) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...ProductFragment } } } } } }',
          variables: { id: 'gid://shopify/Collection/446876746030', productsFirst: 20 }
        },
        {
          headers: {
            'X-Shopify-Storefront-Access-Token': 'e06de8605c8ed7c79a04d618e0b3eeb7'
          }
        }
      )
      const totalProducts = response.data.data.node.products.edges
      const tp = []
      const gp = []
      for (let i = 0; i < totalProducts.length; i++) {
        const product = totalProducts[i]
        console.log('title is ', product.node.title)
        if (product.node.title.includes('Tea') || product.node.title.includes('Coffee') || product.node.title.includes('Coffee/Tea') || product.node.title.includes('Tea/Coffee')) {
          console.log('in tea coffee')
          tp.push(totalProducts[i])
          setTeaCoffeeProducts(tp)
        } else {
          console.log('in General')
          gp.push(totalProducts[i])
          setGeneralProducts(gp)
        }
      }
      console.log('products from shopify are', totalProducts, teaCoffeeProducts, generalProducts)
      setProducts(response.data.data.node.products.edges)
    }
    Shopify()
  }, [])

  useEffect(() => {
    async function Owner () {
      try {
        const { referralCode } = router.query
        const username = referralCode
        if (!username) return
        if (username === 'NoSponsor') return
        if (username.length > 0) {
          const response = await axios.get(
            `/api/integrous/getReplicatedSite?username=${username}`
          )
          setreferralCode(response.data.referralCode)
          setownerName(`${response.data.name} ${response.data.lastname}`)
          setownerEmail(`${response.data.email}`)
          setIboId(Number(`${response.data.id}`))
          setownerProfileImage(`${response.data.profileImage}`)
          const roles = JSON.parse(response.data.roles)
          if (roles.integrousAssociate) {
            setIsIntegrous(true)
          } else {
            setIsIntegrous(false)
          }
        }
      } catch (error) {
        setIsIntegrous(false)
        console.log(error)
      }
    }
    Owner()
  }, [router, isGuest])

  return (
    <div className='overflow-x-hidden main-section'>
      <AuthRecover skipRedirect={true} />
      <Header isLoggedIn={isLoggedIn} userData={userData} bgcblack='bgc-black' btnBG='black-900'/>
      <div className='' >
        <MainSection referralCode={referralCode} isLoggedIn={isLoggedIn} userData={userData} scrollToProductTabs={scrollToProductTabs}
          h1Color="#FF0000"
          pColor="#00FF00"
          textColor="red-h"
          BgbuttonColor="btn-color"
          imgSrc="/static/wellness/intLogo.svg"
          Loginh1Color="red-h"
          customColor="cust-color"
          btnText='OUR PRODUCTS'
        />

        { (isIntegrous !== null && IboId > 0) && (<ProductTabs teaCoffeeProducts={teaCoffeeProducts} generalProducts={generalProducts} userId={userData?.id || 0} isLoggedIn={isLoggedIn} collectionIdTea={459147018542} collectionIdGut={459147149614} userData={userData} AllProducts={AllProducts} collectionIdAll={447611863342}/>
        )}

        <Footer ownerName={ownerName} ownerEmail={ownerEmail} ownerProfileImage={ownerProfileImage} customFooterBorder="customFooterBorder" customfooterInputbg="customfooterInputbg" customFooterBoxbg="customFooterBoxbg" customFooterbg="customFooterBoxbg" submitBtnBg="btn-color" />
      </div>

    </div>
  )
}

export default wellness
