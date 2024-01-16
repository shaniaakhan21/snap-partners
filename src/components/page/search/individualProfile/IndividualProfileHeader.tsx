/* eslint-disable no-use-before-define */
import React from 'react'
import { toast } from 'react-toastify'
import { login } from 'lib/services/auth/login'
import { getUserMe } from 'lib/services/user/getUserMe'
import { useAuthStore } from 'lib/stores'
import { useRouter } from 'next/router'
import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'
import { userLevelReverseMapping } from 'components/layout/private/Dashboard/Navbar/adminTools/searchForms/formOptionData'
import { builderWebsiteFields } from 'lib/types/user/profile'
function IndividualProfileHeader ({ body, setBody, profileData, userLevel }) {
  const cname = 'profilePage-individualProfile'
  const { setAuth } = useAuthStore()
  const router = useRouter()
  const mapping = userLevelReverseMapping
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
      },
      level: data.level,
      isCertified: data.isCertified,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      dateOfBirth: data.dateOfBirth,
      TINstatus: data.TINstatus,
      ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
    })
    window.location.href = '/overview'
  }
  return (
    <div className={`${cname}-header`}>
      <ul className={`${cname}-header-list`}>
        <li className={body === 'iboProfile' ? `${cname}-header-listItems listItems-firstItem listItems-active` : `${cname}-header-listItems listItems-firstItem`}
          onClick={() => setBody('iboProfile')}>IBO profile</li>

        <li className={body === 'comissions' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => { setBody('comissions') }}>comissions</li>

        <li className={body === 'reports' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => { setBody('reports') }}>Reports</li>

        <li className={body === 'order' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => setBody('order')}>Order</li>
        <li className={`${cname}-header-listItems listItems-midItem`}>subscription</li>
        <li className={body === 'tickets' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => setBody('tickets')}>Tickets</li>

        <li className={body === 'dashboard' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => setBody('dashboard')}>Dashboard</li>

        <li className={body === 'upline' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => setBody('upline')}>upline</li>
        {/* <li className={`${cname}-header-listItems`}
        onClick={() => { router.push(`/genealogy/${profileData[0]?.id}`) }}>downline</li> */}
        <li className={body === 'downline' ? `${cname}-header-listItems listItems-active listItems-midItem` : `${cname}-header-listItems listItems-midItem`}
          onClick={() => { setBody('downline') }}>downline</li>
        { (mapping[userLevel] >= 600 && mapping[userLevel] >= mapping[profileData[0]?.level]) &&
        <li className={`${cname}-header-listItems listItems-lastItem`}
          onClick={() => { LoginAsRepHandle() }}>Login as rep</li>
        }
      </ul>
    </div>
  )
}

export default IndividualProfileHeader
