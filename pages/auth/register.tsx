import Head from 'next/head'
import { config } from 'config'

import type { Page } from 'lib/types'
import { RegisterForm } from 'components/page/register/RegisterForm'
import AuthPagesLayout from 'layouts/public/Auth'
const { PAGE_INFO: { SEO } } = config

const RegisterPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Register</title>
      </Head>

      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-[#E35C49] text-white px-4 pb-8 md:px-12'>
            <div className='mt-24'>
              <h1 className='text-5xl font-bold'>Snap Delivered</h1>
              <br />
              <span className='text-5xl font-bold'>Sample Text about <br /> the app</span>
            </div>

            <ul className='list-disc pl-6 mt-20 text-xl'>
              <li>Get notified on updates</li>
              <li>Update documents faster</li>
              <li>Be synced</li>
              <li>Keep the track of changes</li>
            </ul>

            <div className='absolute bottom-10 left-12 flex items-center gap-x-4'>
              <img src='/images/logoAuth.png' />
              <span className='font-bold text-2xl'>SnapDelivered</span>
            </div>
          </section>

          <section className='w-full md:w-1/2 h-full md:min-h-screen bg-white px-4 py-10 flex justify-center items-center'>
            <RegisterForm />
          </section>
        </div>
      </div>
    </>
  )
}

RegisterPage.getLayout = (page) => (
  <AuthPagesLayout>
    {page}
  </AuthPagesLayout>
)

export default RegisterPage
