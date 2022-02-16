import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import DashboardLayout from 'layouts/private/Dashboard'
import { PAGE_INFO } from 'config/pageInfo'

import { EditIcon, GenealogyIcon } from 'components/common/icons'

const { SEO } = PAGE_INFO

const AccountPage: PageNext = () => {
  const { auth } = useAuthStore()

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Account Settings</title>
      </Head>

      <div className='flex justify-start items-center gap-x-5 select-none'>
        <div className='w-20 h-20 bg-gray-500 rounded-full flex justify-center items-center relative'>
          <GenealogyIcon classes='w-20 h-20' />

          <button className='absolute top-0 right-0 px-1 py-1 bg-white rounded-full flex justify-center items-center border border-red'>
            <EditIcon classes='w-5 h-5' />
          </button>
        </div>

        <div>
          <span className='text-2xl font-bold text-gray-800'>{auth.username}</span>
          <span className='block text-center px-4 py-1 rounded-full border-2 border-amber-400'>Free Account</span>
        </div>
      </div>

      <div className='mt-11'>
        <ul className='bg-white w-full h-full rounded-xl'>
          <li className='px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div>
              <label htmlFor='email' className='text-sm'>Email</label>
              <br />
              <input
                id='email'
                name='email'
                type='email'
                value={auth.email}
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>

            <div>
              <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
              </button>
            </div>
          </li>

          <li className='px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div>
              <label htmlFor='email' className='text-sm'>Password</label>
              <br />
              <input
                id='password'
                name='password'
                type='password'
                value='12345678'
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>

            <div>
              <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
              </button>
            </div>
          </li>

          <li className='px-4 py-3 border-y-2 border-y-gray-200 flex justify-between items-center'>
            <div>
              <label htmlFor='bankAccount' className='text-sm'>Bank Account</label>
              <br />
              <input
                id='bankAccount'
                name='bankAccount'
                type='text'
                value=''
                disabled={true}
                className='w-full bg-transparent text-lg truncate'
              />
            </div>

            <div>
              <button className='bg-gray-300 rounded-full px-4 py-1 text-white font-bold uppercase'>
                Edit
              </button>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}

AccountPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default AccountPage
