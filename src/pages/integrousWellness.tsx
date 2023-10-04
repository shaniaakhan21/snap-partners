/* eslint-disable no-use-before-define */

import React, { useEffect, useRef } from 'react'
import Footer from '../pages/wellness/components/Footer'
import Header from '../pages/wellness/components/Header'
import MainSection from '../pages/wellness/components/MainSection'
import ProductTabs from '../pages/wellness/components/ProductTabs'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AuthRecover } from 'components/common/AuthRecover'
import { useAuthStore } from 'lib/stores'
import { url } from 'inspector'
import IntegrousProducts from './wellness/components/IntegrousProducts'

const IntegrousWellness = () => {
  const router = useRouter()
  const { auth, setAuth } = useAuthStore()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const [userData, setuserData] = React.useState(null)
  const [ownerName, setownerName] = React.useState(null)
  const [referralCode, setreferralCode] = React.useState(null)
  const [ownerEmail, setownerEmail] = React.useState(null)
  const [isIntegrous, setIsIntegrous] = React.useState(false)
  const scrollToProductTabs = () => {
    const productTabsElement = document.getElementById('productTabs') // Replace 'productTabs' with the actual ID of your IntegrousProducts component
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
          if (roles.integrousAssociate) {
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
      <div className='bg-cover bg-center' style={{ backgroundImage: 'url(\'/static/wellness/bg-integrous.jpeg\')' }}>
        <MainSection referralCode={referralCode} isLoggedIn={isLoggedIn} userData={userData} scrollToProductTabs={scrollToProductTabs} />

        <IntegrousProducts userId={userData?.id || 0} isLoggedIn={isLoggedIn}referralCode={referralCode}/>
        <Footer ownerName={ownerName} ownerEmail={ownerEmail} />
      </div>

    </div>
  )
}

export default IntegrousWellness
