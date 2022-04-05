import Link from 'next/link'
import { IAuth } from 'lib/stores/Auth'

interface IHeaderCTAProps {
  auth: IAuth
}

export const HeaderCTA = ({ auth }: IHeaderCTAProps) => {
  return (
    <header className='w-full flex justify-between items-center'>
      <section className='flex justify-start items-center'>
        <img
          src='/images/logo-dark.png'
          className='w-16 h-16 mr-4'
        />

        <span className='text-3xl font-bold text-gray-800'>SnapDelivered</span>
      </section>

      <section className='hidden md:block'>
        {
          auth
            ? (
              <Link href='/overview'>
                <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                Back Dashboard
                </a>
              </Link>
            )
            : (
              <>
                <Link href='/auth/signup'>
                  <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
              Register now!
                  </a>
                </Link>

                <Link href='/auth/login'>
                  <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
                </Link>
              </>
            )
        }
      </section>
    </header>
  )
}
