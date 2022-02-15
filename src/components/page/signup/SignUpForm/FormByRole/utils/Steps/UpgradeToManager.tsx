import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useAuthStore } from 'lib/stores'
import { login } from 'lib/services/session/login'
import { IHandleStep, IUserTrack } from '../types'
import { Spinner } from 'components/common/loaders'

export const UpgradeToManager = ({ userTrack, handleStep }: { userTrack: IUserTrack, handleStep: IHandleStep }) => {
  const router = useRouter()
  const { setAuth } = useAuthStore()

  const [isLoading, setIsLoading] = useState(false)

  const handleClickAccount = async () => {
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
      username: data.username
    })
    // When change auth state, directly the app push the user to /overview path
    // This logic is on AuthPageLayout useEffect
  }

  if (isLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <Spinner />
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
        <Link href='/auth/login'>
          <a className='px-4 block w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
            Continue
          </a>
        </Link>

        <p className='mt-2'>
          Do it later in{' '}
          <button onClick={handleClickAccount} className='text-primary-500 cursor-pointer focus:underline'>Account settings</button>
        </p>
      </div>
    </div>
  )
}
