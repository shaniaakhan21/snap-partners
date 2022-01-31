import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { config } from 'config'
import DashboardLayout from 'layouts/private/Dashboard'

const { PAGE_INFO: { SEO } } = config

const ReferralsPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Referrals</title>
      </Head>

      <div className='grid place-content-center text-center font-black text-5xl'>
        Referrals
      </div>
    </>
  )
}

ReferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default ReferralsPage
