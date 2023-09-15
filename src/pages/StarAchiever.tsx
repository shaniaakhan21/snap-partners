import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import StarAchieversTable from './promotion/StarAchieverTable'

const { SEO } = APP_INFO

const StarAchiever: Page = () => {
  return (
    <>
      <span className='text-3xl font-bold'>Sprint to Paradise Achievers Report</span><br /><br />
      <div className="w-full bg-white rounded-lg px-10 py-10 flex flex-col">
        <h1 className='text-xl font-semibold'>1 Star Achievers</h1>
        <StarAchieversTable />
        <h1 className='text-xl font-semibold'>2 Star Achievers</h1>
        <StarAchieversTable />
        <h1 className='text-xl font-semibold'>3 Star Achievers</h1>
        <StarAchieversTable />
        <h1 className='text-xl font-semibold'>4 Star Achievers</h1>
        <StarAchieversTable />
        <h1 className='text-xl font-semibold'>5 Star Achievers</h1>
        <StarAchieversTable />
      </div>
    </>
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
