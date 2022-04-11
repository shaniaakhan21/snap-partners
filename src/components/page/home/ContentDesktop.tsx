import Link from 'next/link'
import { HomeIllustration } from 'components/common/illustrations'

export const ContentDesktop = () => {
  return (
    <section className='w-full md:w-1/2 bg-white px-4 py-10 relative h-screen hidden lg:block'>
      <div className='absolute top-10 right-4'>
        <Link href='/auth/login'>
          <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
        </Link>
      </div>

      <div className='leading-8 h-screen flex justify-center items-center -mt-10'>
        <div>
          <span className='text-5xl font-bold text-gray-700'>Welcome to Snap Delivered</span> <br />
          <span className='text-3xl font-bold text-gray-700'>Join the ever growing Snap Delivered Community</span> <br />
          <span className='text-xl font-bold text-gray-600'>Unlock your team performance</span> <br /><br />

          <Link href='/auth/signup'>
            <a className='px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
              Register now!
            </a>
          </Link>
        </div>
      </div>

      <div className='absolute -bottom-10 lg:bottom-0 left-0 w-full flex justify-center items-center'>
        <HomeIllustration />
      </div>
    </section>
  )
}
