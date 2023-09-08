/* eslint-disable no-use-before-define */

import React, { useRef } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MainSection from './components/MainSection'
import ProductTabs from './components/ProductTabs'
import axios from 'axios'
import { useRouter } from 'next/router'

const Wellness = () => {
  const productTabsRef = useRef(null)
  const router = useRouter()
  const handleButtonClick = () => {
    if (productTabsRef.current) {
      productTabsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // React.useEffect(() => {
  async function Owner () {
    // const path = window.location.pathname
    // if (['/', '/logout'].includes(path)) {
    //   return
    // }
    try {
      // we remove the first character of the path
      const { referralCode } = router.query
      const username = referralCode
      if (username === 'NoSponsor') {
        return
      }
      console.log('userName', username, router.query)
      if (username.length > 0) {
        const response = await axios.get(
          `/api/integrous/getReplicatedSite?username=${username}`
        )
        localStorage.setItem('referralCode', response.data.referralCode)
        localStorage.setItem('ownerName', `${response.data.name} ${response.data.lastname}`)
        localStorage.setItem('ownerEmail', `${response.data.email}`)
        // setUserData(response.data)
      }
    } catch (error) {
      //
    }
  }
  Owner()
  // }, [])

  return (
    <div>
      <Header/>
      <MainSection isLoggedIn={false} userData={null} handleButtonClick={handleButtonClick} />
      <div ref={productTabsRef}>
        <ProductTabs userId={null} isLoggedIn={false} collectionIdTea={459147018542} collectionIdGut={459147149614} collectionIdAllProducts={446876746030} />
      </div>
      <Footer/>
    </div>
  )
}

export default Wellness
