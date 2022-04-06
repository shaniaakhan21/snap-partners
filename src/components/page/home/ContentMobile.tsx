import Link from 'next/link'
import { HomeIllustration } from 'components/common/illustrations'

export const ContentMobile = () => {
  return (
    <section className='w-full md:w-1/2 bg-white px-4 py-10 relative h-screen lg:hidden'> {/* Mobile */}
      <div className='flex justify-center items-center gap-x-3'>
        <div>
          <img
            src='/images/logo-dark.png'
            className='w-12 h-12'
          />
        </div>

        <div>
          <p>
            <span className='text-2xl font-bold'>SnapDelivered</span> <br />
            <span className='text-lg font-semibold'>Order-Eat-Repeat</span>
          </p>
        </div>
      </div>

      <div className='mt-40 text-center'>
        <span className='text-3xl font-bold'>Unlock your team <br /> performance</span><br />

        <Link href='/auth/signup'>
          <a className='w-full block mt-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
            Register now!
          </a>
        </Link>

        <Link href='/auth/login'>
          <a className='block mt-14 text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
        </Link>
      </div>

      <div className='absolute -bottom-10 lg:bottom-0 left-0 w-full flex justify-center items-center'>
        <HomeIllustration />
      </div>
    </section>
  )
}
