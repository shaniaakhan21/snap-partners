import Link from 'next/link'
import { HomeIllustration } from 'components/common/illustrations'

export const ContentDesktop = () => {
  return (
    <section className=''>
      <div className='max-w-w-full pt-16 ml-auto mr-auto lg:ml-4 xl:ml-10 md:w-8/12 lg:w-11/12 xl:w-11/12 2xl:w-8/12 bg-white rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl relative mt-36'>
          <div className="absolute -top-10 -mt-10 left-0 w-full">
            <img src='/images/logo-orange.png' className='mx-auto' />
          </div>
          <div className='text-center'>
              <h1 className='sm:block font-extrabold text-2xl md:text-2xl md:font-extrabold lg:text-3xl 2xl:text-4xl mt-4 mb-2'>Welcome to Snap Delivered</h1>
              <h2 className='text-xl font-semibold mt-1 text-[#656565]'>Join the ever growing Snap Delivered Community</h2>
              <h3 className='text-lg font-semibold mt-6 text-[#797979]'>Unlock your team performance</h3>
          </div>
          <div className='text-center mt-6'>
            <Link href='/auth/signup?role=IBO'>
                <a className='px-10 py-3.5 disabled:opacity-50 disabled:cursor-not-allowed -primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90 w-auto text-mg bg-primary-500 font-semibold uppercase mx-auto'>Sign In</a>
            </Link>
          </div>

          <div className='text-center mt-16 border-t-2 border-gray'><span className='text-center uppercase font-semibold w-12 h-12 border-2 border-gray rounded-full block mx-auto pt-2 -mt-6 bg-white'>or</span></div>

          <div className="mt-8 mb-4 text-center">
              <span className="font-semibold text-gray-600 text-sm sm:text-base">Already have an account?</span>
              <Link href='/auth/login'>
                  <a className="text-primary-500 font-semibold text-xl underline decoration-1 ml-2 hover:text-black" href="/auth/signup?role=IBO">Sign Up</a>
              </Link>
          </div>


      </div>
    </section>
  )
}
