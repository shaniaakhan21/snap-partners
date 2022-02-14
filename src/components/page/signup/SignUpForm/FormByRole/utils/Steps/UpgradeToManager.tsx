import Link from 'next/link'
import { IHandleStep, IUserTrack } from '../types'

export const UpgradeToManager = ({ userTrack, handleStep }: { userTrack: IUserTrack, handleStep: IHandleStep }) => {
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
        <Link href='/auth/signin'>
          <a className='px-4 block w-full py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
            Continue
          </a>
        </Link>

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
