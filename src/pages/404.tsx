import Link from 'next/link'
import Head from 'next/head'

import { Page } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

const { SEO } = APP_INFO

export const Page404: Page = () => {
  return (
    <div className='w-full h-screen bg-textAcent-500 text-white flex flex-col justify-center items-center px-4 relative'>
      <div className='bg-textAcent-500 absolute top-0 left-0 w-full h-screen -z-10'></div>
      <img src='/images/errorAsset.png' className='absolute bottom-0 right-0 z-20 w-40 sm:w-80' />

      <div className='w-full h-screen flex flex-col justify-center items-center z-30'>
        <img src='/images/logo-white.png' className='w-28 h-28' />
        <span className='text-9xl font-black mt-5'>404</span>
        <p className='font-semibold text-4xl mt-3 text-center'>Page Not Found</p>
        <p className='font-light text-xl mt-2 text-center'>The page you’re looking for does not seem to exist</p>
        <Link href='/overview'>
          <a className='block w-44 rounded-full px-4 py-2 bg-[#FFAA00] text-center uppercase font-bold mt-4'>Go Back Home</a>
        </Link>
      </div>
    </div>
  )
}

Page404.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - 404 Not Found</title>
    </Head>

    {page}
  </>
)

export default Page404
