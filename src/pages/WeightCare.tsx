/* eslint-disable no-use-before-define */

import React, { useEffect, useRef } from 'react'
import Footer from './wellness/components/Footer'
import Header from './wellness/components/Header'
import MainSection from './wellness/components/MainSection'
import axios from 'axios'
import { useRouter } from 'next/router'
import { AuthRecover } from 'components/common/AuthRecover'
import { useAuthStore } from 'lib/stores'
import WeightCare from './wellness/components/WeightCare'

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
      <div className='border-b-2 border-blue'>
        <Header isLoggedIn={isLoggedIn} userData={userData} bgcblack='bg-blackCustom' btnBG='primary-500'/>
      </div>
      <div className='bg-cover bg-center bg-gradient-to-b from-[black] to-white border-none pb-[10%] 3xl:pb-[13%]'>
        <MainSection referralCode={referralCode} isLoggedIn={isLoggedIn} userData={userData} scrollToProductTabs={scrollToProductTabs}
          h1Color="white"
          pColor="white"
          textColor="primary-500"
          BgbuttonColor="primary-500"
          imgSrc="/static/wellness/wellness_logo.svg"
          Loginh1Color="primary-500"
          customColor="white"
        />
      </div>
      <div>
        <WeightCare isLoggedIn={isLoggedIn} referralCode={referralCode}/>
      </div>
      <Footer ownerName={ownerName} ownerEmail={ownerEmail} customFooterBorder="customGrayborder" customfooterInputbg="customGray" customFooterBoxbg="customGray" customFooterbg="blackCustom" submitBtnBg="primary-500" />

    </div>
  )
}

export default IntegrousWellness
