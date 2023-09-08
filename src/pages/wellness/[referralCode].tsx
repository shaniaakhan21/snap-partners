/* eslint-disable no-use-before-define */
import React, { useEffect, useRef, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import MainSection from './components/MainSection'
import ProductTabs from './components/ProductTabs'
import axios from 'axios'
import { useRouter } from 'next/router'

const Wellness = () => {
  const router = useRouter()
  const { access_token } = router.query
  const productTabsRef = useRef(null)
  const [isIbo, setisIbo] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState(null)

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
          if (localStorage.getItem('userName') || localStorage.getItem('userData')) {
            localStorage.removeItem('userName')
            localStorage.removeItem('userData')
          }
          localStorage.setItem('userName', response.data.data.user.name)
          localStorage.setItem('userData', JSON.stringify(response.data.data.user))
          const iboValue = response.data.data.user.roles.ibo
          if (iboValue === true) {
            setisIbo(true)
          } else {
            setisIbo(false)
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

  React.useEffect(() => {
    async function Owner () {
      const path = window.location.pathname
      if (['/', '/logout'].includes(path)) {
        return
      }
      try {
        // we remove the first character of the path
        const username = path.split('/')[2]
        if (username === 'NoSponsor') {
          return
        }
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
        <ProductTabs
          userId={userId}
          isLoggedIn={isLoggedIn}
          collectionIdTea={459146854702}
          collectionIdGut={459147051310}
          collectionIdAllProducts={447611863342} />
      </div>
      <Footer/>
    </div>
  )
}

export default Wellness
