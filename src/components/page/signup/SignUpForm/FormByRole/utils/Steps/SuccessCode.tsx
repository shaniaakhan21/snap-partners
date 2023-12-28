import Link from 'next/link'

import { IReferralLink } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { IHandleStep } from '../types'

import { Button } from 'components/common/Button'
import { CheckSuccess } from 'components/common/icons'
import { MobileAppsLink } from 'components/common/mobileApps/MobileAppsLink'
import { GTMTrack } from 'lib/utils/gtm'
import { login } from '../../../../../../../lib/services/auth/login'
import { handleFetchError } from '../../../../../../../lib/utils/handleFetchError'
import { getUserMe } from '../../../../../../../lib/services/user/getUserMe'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { useRoleFromUrl } from '../../../../../../../lib/hooks/useRoleFromUrl'
import { useAuthStore } from '../../../../../../../lib/stores'
import { useEffect, useState } from 'react'
import { Spinner } from '../../../../../../common/loaders'
import { ROLES } from './../../../../../../../config/roles'

import Card from '@mui/material/Card'
import SingleItem from './component/SingleItem'
import { builderWebsiteFields } from '../../../../../../../lib/types/user/profile'
import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'

const { SEO } = APP_INFO

export const SuccessCode = ({ userTrack, handleStep, referralLink }: { userTrack: any, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const router = useRouter()
  const role = useRoleFromUrl()
  const { auth, setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const getTokenId = async () => {
      const { data: dataLogin, error: errorLogin } = await login({ username: userTrack.userInfo.username, password: userTrack.userInfo.password })
      setUserId(dataLogin.userId)
    }
    getTokenId()
  }, [])

  const handleClickLogin = async () => {
    setIsLoading(true)

    const { data: dataLogin, error: errorLogin } = await login({ username: userTrack.userInfo.username, password: userTrack.userInfo.password })

    if (errorLogin) {
      handleFetchError(errorLogin.status, errorLogin.info)
      router.push('/auth/login')
      setIsLoading(false)
      return
    }

    const { data, error: errorUser } = await getUserMe({ token: dataLogin.token })

    if (errorUser) {
      handleFetchError(errorUser.status, errorUser.info)
      setIsLoading(false)
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

    const { redirectToIntegrousWellness, referralCode } = router.query
    if (redirectToIntegrousWellness === 'true') {
      removeLocalStorage('redirectToIntegrousWellness')
      removeLocalStorage('redirectToIntegrousReferralCode')
      window.location.href = `/wellness?referralCode=${referralCode}`
      return
    }

    const { redirectToWeightCare } = router.query
    if (redirectToWeightCare === 'true') {
      removeLocalStorage('redirectToWeightCare')
      window.location.href = `/WeightCare?referralCode=${referralCode}`
      return
    }

    toast('Login Successful!', { type: 'success' })
    setIsLoading(false)
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
      driver_status: data.driver_status,
      idImage: data.idImage,
      insuranceImage: data.insuranceImage,
      profileImage: data.profileImage,
      isManager: data.ranks?.type === 'manager',
      createdAt: data.createdAt,
      ownerName: data.ownerName,
      ranks: data.ranks,
      updatedAt: data.updatedAt,
      blocked: data.blocked,
      deleted: data.deleted,
      nsurAccount: {
        nsurUserId: data.nsurUserId,
        myPoints: auth?.nsurAccount?.myPoints || null
      },
      bank_information: data.bank_information,
      level: data.level,
      isCertified: data.isCertified,
      zendesk_id: data.zendesk_id,
      ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
    })
    // When change auth state, directly the app push the user to /overview path
    // This logic is on AuthPageLayout useEffect

    return dataLogin.userId
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  const handleSkip = () => {
    GTMTrack.signUp(role, 3, null, 'no')
    handleClickLogin()
  }

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='rounded-full w-36 h-36 border-4 border-lime-500 p-8 text-center flex items-center'>
        <CheckSuccess />
      </div>
      <span className='sm:block font-bold text-2xl md:font-semibold mb-2 text-lime-600 mt-4 mb-12'>Registration Done!</span>
      {userTrack.userInfo.roles.integrousAssociate
        ? (<>
          <span className='font-medium text-gray-600'>Select your welcome pack!</span>
          <Card
            sx={{
              p: 2,
              mx: { xs: 2, lg: 3 },
              mt: 2,
              mb: 2
            }}
          >
            <div className="w-full flex flex-col justify-around md:flex-row">
              <SingleItem userId={userId} image='/images/kits/249.png' name="$249 Enrollment Kit" price="$249.00" />
              <SingleItem userId={userId} image='/images/kits/499.png' name="$499 Enrollment Kit" price="$499.00" />
            </div>
          </Card>
        </>

        )
        : (
          <>
            <span className='font-medium text-gray-600'>Welcome!</span>
            <span className='text-3xl text-black font-bold uppercase'>
              {userTrack.userInfo.name ? userTrack.userInfo.name : userTrack.userInfo.merchant.name}
            </span>
            <Button onClick={handleSkip} classes=' mt-6'>CONTINUE</Button>
          </>
        )}

      <br/>
      { ROLES.integrousAssociate
        ? (<></>)
        : (
          <>
            <span className='text-xl text-gray-500 text-center'>Please download the app below or visit our website at </span>
            <Link href={SEO.URL_PAGE}>
              <a target='_blank' className='text-xl text-primary-500 text-center'>{SEO.URL_PAGE.substring(8)}</a>
            </Link>
            <MobileAppsLink /></>
        )}
      <br/>
    </div>
  )
}
