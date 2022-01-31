import Head from 'next/head'
import { useRouter } from 'next/router'
import { config } from 'config'

import type { Page as PageNext } from 'lib/types'
import { useEffect } from 'react'
import { useAuthStore } from 'lib/stores'
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
          <span className='text-2xl font-black'>Snap Deliver - Public App View</span>
        </div>
      </div>
    </>
  )
}

export default HomePage
