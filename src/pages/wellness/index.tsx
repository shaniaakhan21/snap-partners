/* eslint-disable no-use-before-define */

import React, { useEffect, useRef } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MainSection from './components/MainSection'
import ProductTabs from './components/ProductTabs'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AuthRecover } from 'components/common/AuthRecover'
import { useAuthStore } from 'lib/stores'

const Wellness = () => {
  const productTabsRef = useRef(null)
  const router = useRouter()
  const { auth, setAuth } = useAuthStore()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userData, setuserData] = React.useState(null)
  const [ownerName, setownerName] = React.useState(null)
  const [referralCode, setreferralCode] = React.useState(null)
  const [ownerEmail, setownerEmail] = React.useState(null)
  const [isIntegrous, setIsIntegrous] = React.useState(false)
  const handleButtonClick = () => {
    if (productTabsRef.current) {
      productTabsRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    if (auth) {
      setIsLoggedIn(true)
      setuserData(auth)
    }
  }, [auth])

  useEffect(() => {
    async function Owner () {
      console.log('owneeeeeeeeeeer')
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
          const roles = JSON.parse(response.data.roles)
          if(roles.integrousAssociate){
            setIsIntegrous(true)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    Owner()
  }, [router])

  return (
    <div>
      <AuthRecover skipRedirect={true} />
      <Header isLoggedIn={isLoggedIn} userData={userData} />
      <MainSection referralCode={referralCode} isLoggedIn={isLoggedIn} userData={userData} scrollToProductTabs={handleButtonClick} />
      <div ref={productTabsRef}>
        <ProductTabs isIntegrous={isIntegrous} referralCode={referralCode} userId={userData?.id || 0} isLoggedIn={isLoggedIn} collectionIdTea={459147018542} collectionIdGut={459147149614} collectionIdAllProducts={446876746030} />
      </div>
      <Footer ownerName={ownerName} ownerEmail={ownerEmail} />
    </div>
  )
}

export default Wellness
