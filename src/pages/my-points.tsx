import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { FormConnectNsurAccount } from 'components/page/my-points/FormConnectNsurAccount'
import { useAuthStore } from 'lib/stores'

const { SEO } = APP_INFO

const MyPointsPage: Page = () => {
  const { auth, setAuth } = useAuthStore()

  if (auth.nsurAccount?.myPoints) {
    return (
      <div className='max-w-lg mx-auto w-full text-center'>
        <span className='font-semibold text-lg'>Now you’re connected to NSUR</span>
        <p className='font-bold text-4xl'>{auth.nsurAccount.myPoints} points</p>
        <span className='font-semibold text-lg'>You can win more points by _________</span>
      </div>
    )
  }

  return (
    <div className='max-w-lg mx-auto w-full'>
      <FormConnectNsurAccount auth={auth} setAuth={setAuth} />
    </div>
  )
}

MyPointsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - My Points</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default MyPointsPage
