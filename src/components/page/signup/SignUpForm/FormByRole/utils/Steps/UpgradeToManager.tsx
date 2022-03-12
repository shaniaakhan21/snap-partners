import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { login } from 'lib/services/session/login'
import { getUserMe } from 'lib/services/users/getUserMe'
import { IHandleStep, IUserTrack } from '../types'
import { IReferralLink } from 'lib/types'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { signUp } from 'lib/utils/gtm'

export const UpgradeToManager = ({ userTrack, handleStep, referralLink }: { userTrack: IUserTrack, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const router = useRouter()
  const role = useRoleFromUrl()
  const { setAuth } = useAuthStore()
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

    const { data: dataUser, error: errorUser } = await getUserMe({ token: dataLogin.token })

    if (errorUser) {
      handleFetchError(errorUser.status, errorUser.info)
      setIsLoading(false)
      return
    }

    toast('Login Successful!', { type: 'success' })
    setIsLoading(false)
    setAuth({
      email: dataUser.email,
      name: dataUser.name,
      phone: dataUser.phoneNumber,
      accessToken: dataLogin.token,
      lastname: dataUser.lastname,
      roles: dataUser.roles,
      id: dataLogin.userId,
      username: dataUser.username,
      referralCode: dataUser.referralCode,
      idImage: dataUser.idImage,
      insuranceImage: dataUser.insuranceImage,
      isManager: dataUser.isManager,
      sponsorId: dataUser.sponsorId
    })
    // When change auth state, directly the app push the user to /overview path
    // This logic is on AuthPageLayout useEffect

    return dataLogin.userId
  }

  const handleUpagradeToManage = async () => {
    const userId = await handleClickLogin()

    const windowOpened = window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${userId}`,
      'windowUpgradeToManager'
    )
    signUp(role, 4, undefined, 'yes', 'no')
    setNewWindow(windowOpened)
    // When a newWindow is sent, in DashboardLayout we have an effect to handle upgrade to manager.
  }

  const handleSkip = () => {
    handleClickLogin()
    signUp(role, 4, undefined, 'no', 'yes')
  }

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  return (
    <div className='flex flex-col items-center text-center'>
      <figure>
        <img src='/images/logo-full.png' className='w-28 h-28' />
      </figure>

      <span className='text-3xl font-bold mt-4'>SnapDelivered</span>

      <div className='mt-10'>
        <span className='text-4xl font-bold text-primary-500'>Upgrade to <br /> Manager Account</span>
      </div>

      <ul className='mt-5 list-disc custom__bulletList text-left self-start text-gray-400 px-5'>
        <li>Earn beyond just the personal referrals.</li>
        <li>Managers earn 10% on all Level 1 referrals</li>
        <li>Multiply your profits!</li>
      </ul>

      <div className='w-full mt-10'>
        <Button classes='w-full ' onClick={handleUpagradeToManage}>
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
