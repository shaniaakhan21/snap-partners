import Head from 'next/head'
import DashboardLayout from 'layouts/private/Dashboard'
import { AccountNoImage } from 'components/common/AccountNoImage'
import { TrendingUpIcon } from 'components/common/icons'
import { PAGE_INFO } from 'config/pageInfo'
import type { Page as PageNext, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'

const { SEO } = PAGE_INFO

const AccountPage: PageNext = () => {
  const { auth } = useAuthStore()

  const handleClickUpgradeToManager = () => {
    window.open(
      `https://store.snapdelivered.com/product/manager-upgrade?userId=${auth.id}`,
      'noopener'
    )
  }

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Account Settings</title>
      </Head>

      <div className='flex justify-center items-center'>
        <AccountNoImage />
      </div>

      <div className='flex items-center justify-center mt-11 h-20'>
        <div className='w-1/2 h-full flex items-center bg-white rounded px-4 mr-4'>
          <div className='bg-warning-300 w-12 h-12 flex items-center justify-center mr-4'>
            <TrendingUpIcon />
          </div>

          <div>
            <span className='block text-gray-400 text-sm'>Rank</span>
            <span className='text-lg font-semibold'>Director</span>
          </div>
        </div>

        <button
          onClick={handleClickUpgradeToManager}
          className='w-1/2 h-full bg-textAcent-500 text-white rounded shadow-md flex flex-col justify-center px-4'
        >
          <span className='text-sm'>Best Plan</span>
          <h6 className='text-lg font-semibold'>Upgrade to manager</h6>
        </button>
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
