import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import SATableApplication from './promotion/SATableApplication'

const { SEO } = APP_INFO

const StarAchiever: Page = () => {
  return (
    <><span className='text-3xl font-bold'>Sprint To Paradise Promotion Tracker</span><br /><br /><div className="w-full bg-white rounded-lg px-10 py-10 flex flex-row">
      <SATableApplication />
    </div></>
  )
}

StarAchiever.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Achievers Report</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default StarAchiever
