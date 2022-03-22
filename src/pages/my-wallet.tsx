import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - My Wallet</title>
      </Head>

      <div>
        My Wallet
      </div>
    </>
  )
}

MyWalletPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default MyWalletPage
