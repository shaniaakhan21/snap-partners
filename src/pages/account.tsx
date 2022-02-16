import Head from 'next/head'
import DashboardLayout from 'layouts/private/Dashboard'
import type { Page as PageNext, ReactNode } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'
import { AccountNoImage } from 'components/common/AccountNoImage'

const { SEO } = PAGE_INFO

const AccountPage: PageNext = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Account Settings</title>
      </Head>

      <div className='flex justify-center items-center'>
        <AccountNoImage />
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
