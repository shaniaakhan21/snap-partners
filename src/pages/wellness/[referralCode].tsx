import React, { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MainSection from './components/MainSection'
import ProductTabs from './components/ProductTabs'
import axios from 'axios'
import { useRouter } from 'next/router'
import Client, {Config} from 'shopify-buy'

const Wellness = () => {
  const router = useRouter()
  const { access_token } = router.query
  const productTabsRef = useRef(null)
  const [isAssociate, setisAssociate] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState(null)
  const [teaCoffeeProducts, setTeaCoffeeProducts] = useState([])
  const [generalProducts, setGeneralProducts] = useState([])
  let ShopifyBuy: any

  if (access_token) {
    if (typeof access_token === 'string') { localStorage.setItem('access_token', access_token) }
  }
  useEffect(() => {
    async function Me () {
      if (localStorage.getItem('access_token') || access_token) {
        try {
          const response = await axios.get('/api/user/me', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          })
          localStorage.setItem('userName', response.data.data.user.name)
          console.log('user data is', response.data.data.user)
          localStorage.setItem('userData', JSON.stringify(response.data.data.user))
          if (response.data.data.user.roles.integrousAssociate) {
            setisAssociate(true)
          } else {
            setisAssociate(false)
          }
          setIsLoggedIn(true)
          setUserId(response.data.data.user.id)
        } catch (error) {
          console.log(error)
          //
        }
      }
    }
    Me()
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    } else {
      setUserData(null)
    }
  }, [isLoggedIn])

  useEffect(() => {
    async function Shopify () {
      const response = await axios.post(
        'https://0f4c5e-3.myshopify.com/api/2022-07/graphql',
        {
          query:
            'fragment VariantFragment on ProductVariant  { id,title,price { amount,currencyCode },priceV2: price { amount,currencyCode },weight,available: availableForSale,sku,compareAtPrice { amount,currencyCode },compareAtPriceV2: compareAtPrice { amount,currencyCode },image { id,src: url,altText,width,height },selectedOptions { name,value },unitPrice { amount,currencyCode },unitPriceMeasurement { measuredType,quantityUnit,quantityValue,referenceUnit,referenceValue } },fragment CollectionFragment on Collection  { id,handle,description,descriptionHtml,updatedAt,title,image { id,src: url,altText } },fragment ProductFragment on Product  { id,availableForSale,createdAt,updatedAt,descriptionHtml,description,handle,productType,title,vendor,publishedAt,onlineStoreUrl,options { id,name,values },images (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { id,src: url,altText,width,height } } },variants (first: 250) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...VariantFragment } } } },query ($id:ID!,$productsFirst:Int!)  { node (id: $id) { __typename,...CollectionFragment,... on Collection { id,products (first: $productsFirst) { pageInfo { hasNextPage,hasPreviousPage },edges { cursor,node { ...ProductFragment } } } } } }',
          variables: { id: 'gid://shopify/Collection/447611863342', productsFirst: 20 }
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
      // setProducts(response.data.data.node.products.edges);
    }
    Shopify()
  }, [])

  const handleButtonClick = () => {
    if (productTabsRef.current) {
      productTabsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <MainSection isLoggedIn={isLoggedIn} handleButtonClick={handleButtonClick} userData={userData} />
      <div ref={productTabsRef}>
        <ProductTabs teaCoffeeProducts={teaCoffeeProducts} generalProducts={generalProducts} userId={userId} isLoggedIn={isLoggedIn} />
      </div>
      <Footer/>
    </div>
  )
}

export default Wellness
