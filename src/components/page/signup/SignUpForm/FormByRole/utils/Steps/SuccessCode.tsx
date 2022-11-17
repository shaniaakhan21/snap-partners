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
import { useState } from 'react'
import { Spinner } from '../../../../../../common/loaders'

const { SEO } = APP_INFO

export const SuccessCode = ({ userTrack, handleStep, referralLink }: { userTrack: any, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const router = useRouter()
  const role = useRoleFromUrl()
  const { auth, setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

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

    toast('Login Successful!', { type: 'success' })
    setIsLoading(false)
    setAuth({
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
      bank_information: data.bank_information
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
    <div className='flex flex-col justify-center items-center max-w-xl mx-auto'>
      <br />
      <span className='text-4xl font-bold text-primary-500'>Register Done!</span>
      <CheckSuccess classes='my-10' />
      <span className='text-xl text-primary-500'>Welcome!</span>
      <span className='text-4xl text-primary-500 font-bold'>{userTrack.userInfo.name ? userTrack.userInfo.name : userTrack.userInfo.merchant.name }</span>

      <Button onClick={handleSkip} classes='w-full mt-10'>CONTINUE</Button>
      <br/>
      <span className='text-xl text-gray-500 text-center'>Please download the app below or visit our website at </span>
      <Link href={SEO.URL_PAGE}>
        <a target='_blank' className='text-xl text-primary-500 text-center'>{SEO.URL_PAGE.substring(8)}</a>
      </Link>
      <br/>
      <MobileAppsLink />
    </div>
  )
}
