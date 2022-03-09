import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { LoginForm } from 'components/page/login/LoginForm'
import { useAuthStore } from 'lib/stores'
import { PAGE_INFO } from 'config/pageInfo'
import type { Page } from 'lib/types'
import { FooterPublic } from 'components/layout/public/Footer'

const { SEO } = PAGE_INFO

const LoginPage: Page = () => {
  const router = useRouter()
  const { auth } = useAuthStore()

  useEffect(() => {
    auth && router.push('/overview')
  }, [auth])

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Login</title>
      </Head>

      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
            <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

            <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
              <div className='mt-24'>
                <h1 className='text-5xl font-bold 2xl:text-7xl'>Snap Delivered</h1>
                <p className='text-3xl font-bold mt-1 2xl:text-5xl'>Order-Eat-Repeat</p>
                <br />
              </div>

              <ul className='list-disc pl-6 mt-20 text-xl space-y-4'>
                <li>Get notified about company updates</li>
                <li>Access to company training</li>
                <li>Get synced</li>
                <li>Track your team</li>
              </ul>

              <div className='absolute bottom-10 left-12 flex items-center gap-x-4'>
                <img src='/images/logo-dark.png' />
                <span className='font-bold text-2xl'>SnapDelivered</span>
              </div>
            </div>
          </section>

          <section className='w-full md:w-1/2 min-h-screen bg-white px-4 py-10 flex justify-center items-center'>
            <LoginForm/>
          </section>
        </div>
      </div>

      <FooterPublic />
    </>
  )
}

export default LoginPage
