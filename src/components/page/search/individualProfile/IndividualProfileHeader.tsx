/* eslint-disable no-use-before-define */
import React from 'react'
import { toast } from 'react-toastify'
import { login } from 'lib/services/auth/login'
import { getUserMe } from 'lib/services/user/getUserMe'
import { useAuthStore } from 'lib/stores'
import { useRouter } from 'next/router'
import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'

function IndividualProfileHeader ({ body, setBody, profileData }) {
  const cname = 'profilePage-individualProfile'
  const { setAuth } = useAuthStore()

  // trackLoginHandle(true)
  // setLoading(true)
  const LoginAsRepHandle = async () => {
    const { data: dataLogin, error: errorLogin } = await login({
      email: profileData[0].email,
      password: profileData[0].password,
      loginAsRep: true
    })

    if (errorLogin) {
    //   handleFetchError(errorLogin.status, errorLogin.info)
    //   setLoading(false)
      return
    }

    const { data, error: errorUser } = await getUserMe({ token: dataLogin.token })

    if (errorUser) {
    //   handleFetchError(errorUser.status, errorUser.info)
    //   setLoading(false)
      return
    }

    const redirectToIntegrous = getLocalStorage('redirectToIntegrous')
    const redirectToIntegrousReferralCode = getLocalStorage('redirectToIntegrousReferralCode')
    if (redirectToIntegrous === true) {
      removeLocalStorage('redirectToIntegrous')
      removeLocalStorage('redirectToIntegrousReferralCode')
      window.location.href = `https://www.integrouswellness.com/${redirectToIntegrousReferralCode}?access_token=${dataLogin.token}`
      return
    }

    toast('Login Successful!', { type: 'success' })
    // trackLoginHandle(false)
    // setLoading(false)
    setAuth({
      socialSecurityNumber: data.socialSecurityNumber,
      email: data.email,
      name: data.name,
      password: data.password,
      phoneNumber: data.phoneNumber,
      accessToken: dataLogin.token,
      lastname: data.lastname,
      roles: data.roles,
      id: dataLogin.userId,
      username: data.username,
      referralCode: data.referralCode,
      idImage: data.idImage,
      driver_status: data.driver_status,
      insuranceImage: data.insuranceImage,
      profileImage: data.profileImage,
      isManager: data.ranks?.type === 'manager',
      createdAt: data.createdAt,
      ownerName: data.ownerName,
      ranks: data.ranks,
      updatedAt: data.updatedAt,
      blocked: data.blocked,
      deleted: data.deleted,
      bank_information: data.bank_information,
      nsurAccount: {
        nsurUserId: data.nsurUserId,
        myPoints: null
      }
    })
    window.location.href = '/overview'
  }
  return (
    <div className={`${cname}-header`}>
      <ul className={`${cname}-header-list`}>
        <li className={body === 'iboProfile' ? `${cname}-header-listItems listItems-active` : `${cname}-header-listItems`}
          onClick={() => setBody('iboProfile')}>IBO profile</li>
        <li className={`${cname}-header-listItems`}>comissions</li>
        <li className={`${cname}-header-listItems`}>transactions</li>
        <li className={body === 'order' ? `${cname}-header-listItems listItems-active` : `${cname}-header-listItems`}
          onClick={() => setBody('order')}>Order</li>
        <li className={`${cname}-header-listItems`}>subscription</li>
        <li className={`${cname}-header-listItems`}>tickets</li>
        <li className={`${cname}-header-listItems`}>upline</li>
        <li className={`${cname}-header-listItems`}>downline</li>
        <li className={`${cname}-header-listItems`}
          onClick={() => { LoginAsRepHandle() }}>Login as rep</li>
      </ul>
    </div>
  )
}

export default IndividualProfileHeader
