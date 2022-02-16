import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useAuthStore } from 'lib/stores'
import { login } from 'lib/services/session/login'
import { Button } from 'components/common/Button'
import { IHandleStep, IUserTrack } from '../types'
import { Spinner } from 'components/common/loaders'
import { IReferralLink } from 'lib/types'

export const UpgradeToManager = ({ userTrack, handleStep, referralLink }: { userTrack: IUserTrack, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const router = useRouter()
  const { setAuth } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const handleClickLogin = async () => {
    setIsLoading(true)

    const { data, error } = await login({ username: userTrack.userInfo.username, password: userTrack.userInfo.password })

    if (error) {
      toast('An error ocurred while trying to login, please try to login manually', { type: 'error' })
      router.push('/auth/login')
      setIsLoading(false)
      return
    }

    toast('Login Successful!', { type: 'success' })
    setIsLoading(false)
    setAuth({
      email: data.email,
      name: data.email,
      phone: data.phoneNumber,
      accessToken: data.token,
      iat: data.iat,
      lastname: data.lastname,
      roles: data.roles,
      id: data.userId,
      username: data.username,
      referralCode: referralLink.code
    })
    // When change auth state, directly the app push the user to /overview path
    // This logic is on AuthPageLayout useEffect

    return data.userId
  }

  const handleUpagradeToManage = async () => {
    const userId = await handleClickLogin()

    window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${userId}`,
      'noopener'
    )
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
        <li>Benefit number one</li>
        <li>Benefit number two</li>
        <li>Benefit number three</li>
      </ul>

      <div className='w-full mt-10'>
        <Button classes='w-full ' onClick={handleUpagradeToManage}>
          Continue
        </Button>

        <p className='mt-2'>
          Do it later in{' '}
          <button onClick={handleClickLogin} className='text-primary-500 cursor-pointer focus:underline'>Account settings</button>
        </p>
      </div>
    </div>
  )
}
