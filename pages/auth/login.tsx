import Head from 'next/head'
import { config } from 'config'

import type { Page } from 'lib/types'
import { LoginForm } from 'components/page/login/LoginForm'
import AuthPagesLayout from 'layouts/public/Auth'
const { PAGE_INFO: { SEO } } = config

const LoginPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Login</title>
      </Head>

      <div className='w-full h-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
            <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

            <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
              <div className='mt-24'>
                <h1 className='text-5xl font-bold'>Snap Delivered</h1>
                <br />
                <span className='text-4xl font-bold'>Sample Text about <br /> the app</span>
              </div>

              <ul className='list-disc pl-6 mt-20 text-xl space-y-4'>
                <li>Get notified on updates</li>
                <li>Update documents faster</li>
                <li>Be synced</li>
                <li>Keep the track of changes</li>
              </ul>

              <div className='absolute bottom-10 left-12 flex items-center gap-x-4'>
                <img src='/images/logoAuth.png' />
                <span className='font-bold text-2xl'>SnapDelivered</span>
              </div>
            </div>
          </section>

          <section className='w-full md:w-1/2 h-screen md:min-h-screen bg-white px-4 flex justify-center items-center'>
            <LoginForm />
          </section>
        </div>
      </div>
    </>
  )
}

LoginPage.getLayout = (page) => (
  <AuthPagesLayout>
    {page}
  </AuthPagesLayout>
)

export default LoginPage
