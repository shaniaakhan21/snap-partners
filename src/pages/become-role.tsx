import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
const { SEO } = APP_INFO

const BecomeRolePage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Become Role</title>
      </Head>

      <div>
        Form Become Role
      </div>
    </>
  )
}

BecomeRolePage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default BecomeRolePage
