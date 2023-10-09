/* eslint-disable no-use-before-define */

import React, { useEffect, useState } from 'react'
import Footer from './wellness/components/Footer'
import Header from './wellness/components/Header'
import MainSection from './wellness/components/MainSection'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AuthRecover } from 'components/common/AuthRecover'
import { useAuthStore } from 'lib/stores'
import IntegrousProducts from './wellness/components/IntegrousProducts'

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
          setIboId(Number(`${response.data.id}`))
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
    <div className='overflow-x-hidden'>
      <AuthRecover skipRedirect={true} />
      <Header isLoggedIn={isLoggedIn} userData={userData} bgcblack='bgc-black' btnBG='black-900'/>
      <div className='bg-cover bg-center' style={{ backgroundImage: 'url(\'/static/wellness/bg-integrous.jpeg\')' }}>
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

        { (isIntegrous !== null && IboId > 0) && (<IntegrousProducts userId={userData?.id || 0} IboId={IboId} isLoggedIn={isLoggedIn} referralCode={referralCode} userRole={userData?.roles.ibo} collectionIdAllProducts={isIntegrous ? 447611863342 : 446876746030} />
        )}

        <Footer ownerName={ownerName} ownerEmail={ownerEmail} customFooterBorder="customFooterBorder" customfooterInputbg="customfooterInputbg" customFooterBoxbg="customFooterBoxbg" customFooterbg="customFooterBoxbg" submitBtnBg="btn-color" />
      </div>

    </div>
  )
}

export default wellness
