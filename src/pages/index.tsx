import Head from 'next/head'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from 'components/common/loaders'
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

  if (!auth) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Spinner classes='w-20 h-20' />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE}</title>
      </Head>

      <div className='w-screen h-screen flex justify-center items-center'>
        <div className='text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-center font-black text-primary-500 px-4'>Snap Delivered</div>
      </div>
    </>
  )
}

export default HomePage
