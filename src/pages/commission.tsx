import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import CommissionDetails from './commission/CommissionDetails'
import Notes from './commission/Notes'
import VPCard from './commission/VPCard'
import DataTableSummary from './commission/DataTableSummary'
import DataTableHistory from './commission/DataTableHistory'
import VerifiedDetail from './commission/VerifiedDetail'
import { useState } from 'react'

const { SEO } = APP_INFO

const commission: Page = () => {
  const [showDetail, setShowDetail] = useState(false)

  if (showDetail) {
    return <VerifiedDetail />
  }
  return (
    <div className="w-full bg-white rounded-lg px-6 py-8">
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='text-2xl font-bold'>
            My Commission
          </h1>
        </div>
        <div>
          <h1 className='text-2xl font-bold'>
            Client — NAME
          </h1>
        </div>
      </div>

      <CommissionDetails commissionID={'4567890'} nextWeeklyPayRun={'12-12-2023'} nextMonthlyPayRun={'12-12-2023'} rank={'RANK NAME HERE'} gfrank={'RANK NAME HERE'}/>
      <div className='w-full flex flex-row'>
        <div className='w-8/12 mt-3'>
          <Notes/>
        </div>
        <div className='w-4/12'>
          <div className='mt-10'>
            <VPCard onClick={() => setShowDetail(true)}/>
          </div>
          <div className='mt-3'>
            <VPCard title="Pending pay amount" amount="$ 52.16" detailsText="Click for details" bgColor="bg-amber-500"/>
          </div>
        </div>
      </div>
      <DataTableSummary/>
      <DataTableHistory/>
    </div>
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
