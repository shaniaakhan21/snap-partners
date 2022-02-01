import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import type { Page as PageNext } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { config } from 'config'

const { PAGE_INFO: { SEO } } = config

const HomePage: PageNext = () => {
  const { auth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    !auth && router.push('/auth/login')
  }, [auth])

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE}</title>
      </Head>

      <div className='w-full min-h-screen lg:overflow-hidden'>
        <div className='flex justify-center items-center'>
          <div className='text-3xl font-black text-primary-500'>Snap Delivered</div>
        </div>
      </div>
    </>
  )
}

export default HomePage
