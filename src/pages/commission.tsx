import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import MyCommissionComponent from './my-commission'

const { SEO } = APP_INFO

const commission: Page = () => {
  return (
    <>
      <MyCommissionComponent/>
    </>
  )
}

commission.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - My Commission</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default commission
