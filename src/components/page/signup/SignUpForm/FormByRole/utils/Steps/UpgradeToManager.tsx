import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { login } from 'lib/services/auth/login'
import { getUserMe } from 'lib/services/user/getUserMe'
import { IHandleStep, IUserTrack } from '../types'
import { IReferralLink } from 'lib/types'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { GTMTrack } from 'lib/utils/gtm'

export const UpgradeToManager = ({ userTrack, handleStep, referralLink }: { userTrack: IUserTrack, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const router = useRouter()
  const role = useRoleFromUrl()
  const { auth, setAuth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()
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

  const handleUpgradeToManage = async () => {
    const userId = await handleClickLogin()

    if (!userId) return

    const windowOpened = window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${userId}`,
      'windowUpgradeToManager'
    )
    GTMTrack.signUp(role, 4, null, 'yes')
    setNewWindow(windowOpened)
    // When a newWindow is sent, in DashboardLayout we have an effect to handle upgrade to manager.
  }

  const handleSkip = () => {
    GTMTrack.signUp(role, 4, null, 'no')
    handleClickLogin()
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center text-center max-w-xl mx-auto'>
      <figure>
        <img src='/images/logo-full.png' className='w-28 h-28' />
      </figure>

      <div className='mt-10'>
        <span className='text-4xl font-bold text-primary-500'>Upgrade to <br /> Manager Account</span>
      </div>

      <ul className='mt-5 list-disc custom__bulletList text-left self-start text-gray-400 px-5'>
        <li>Earn beyond just the personal referrals.</li>
        <li>Managers earn 10% on all Level 1 referrals</li>
        <li>Multiply your profits!</li>
      </ul>

      <div className='w-full mt-10'>
        <Button classes='w-full ' onClick={handleUpgradeToManage}>
          Continue
        </Button>

        <p className='mt-2'>
          Do it later in{' '}
          <button onClick={handleSkip} className='text-primary-500 cursor-pointer focus:underline'>Profile</button>
        </p>
      </div>
    </div>
  )
}
