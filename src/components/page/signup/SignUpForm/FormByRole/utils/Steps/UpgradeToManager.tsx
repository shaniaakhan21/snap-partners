import { Button } from 'components/common/Button'
import { useAuthStore } from 'lib/stores'
import Link from 'next/link'
import { IHandleStep, IUserTrack } from '../types'

export const UpgradeToManager = ({ userTrack, handleStep }: { userTrack: IUserTrack, handleStep: IHandleStep }) => {
  const { createAccout } = useAuthStore()

  const finishSignUpProcess = () => {
    createAccout({
      name: userTrack.userInfo.name,
      email: userTrack.userInfo.email,
      phone: userTrack.userInfo.phone,
      accessToken: 'ACCESS_TOKEN_FAKE',
      refreshToken: 'REFRESH_TOKEN_FAKE'
    })
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
        <Button classes='w-full uppercase' onClick={finishSignUpProcess}>
          Continue
        </Button>

        <p className='mt-2'>
          Do it later in{' '}
          <Link href='/auth/signin'>
            <a className='text-primary-500 cursor-pointer focus:underline'>Account settings</a>
          </Link>
        </p>
      </div>
    </div>
  )
}
