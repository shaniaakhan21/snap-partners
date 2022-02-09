import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import type { Page as PageNext } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { PAGE_INFO } from 'config/pageInfo'

const { SEO } = PAGE_INFO

const HomePage: PageNext = () => {
  const { auth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    !auth && router.push('/auth/signin')
  }, [auth])

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE}</title>
      </Head>

      <div className='w-full h-screen flex justify-center items-center'>
        <div className='text-4xl font-black text-primary-500'>Snap Delivered</div>
      </div>
    </>
  )
}

export default HomePage
