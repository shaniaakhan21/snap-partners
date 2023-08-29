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
import { useEffect, useState } from 'react'
import PendingDetail from './commission/PendingDetail'
import HistoryDetail from './commission/HistoryDetail'
import { Button } from '@mui/material'
import MyWalletPage from './wallet'

const { SEO } = APP_INFO

const commission: Page = () => {
  const [detailToShow, setDetailToShow] = useState<null | 'verified' | 'pending'>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [jsonData, setJsonData] = useState([])

  useEffect(() => {
    setJsonData([
      {
        Title: 'Personal Income',
        Description: 'Personal sales',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '1'
      },
      {
        Title: 'Team Bonus',
        Description: 'Downline one-time product sales',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '2'
      },
      {
        Title: 'Team Residual',
        Description: 'Downline residual services sales',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '3'
      },
      {
        Title: 'CAB',
        Description: 'Customer acquisition Bonus',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '4'
      }
    ])
  }, [])

  if (showWallet) {
    return <MyWalletPage />
  }

  if (showDetail) {
    return <HistoryDetail/>
  }

  if (detailToShow === 'verified') {
    return <VerifiedDetail />
  }

  if (detailToShow === 'pending') {
    return <PendingDetail />
  }

  return (
    <div className="w-full bg-white rounded-lg px-6 py-8">
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='text-md lg:text-2xl font-bold'>
            My Commission
          </h1>
        </div>
        <div>
          <h1 className='text-md lg:text-2xl font-bold'>
            Client — NAME
          </h1>
        </div>
      </div>

      <CommissionDetails commissionID={'4567890'} nextWeeklyPayRun={'12-12-2023'} nextMonthlyPayRun={'12-12-2023'} rank={'RANK NAME HERE'} gfrank={'RANK NAME HERE'}/>
      <div className='w-full flex flex-col lg:flex-row'>
        <div className='lg:w-8/12 mt-3'>
          <Notes/>
        </div>
        <div className='lg:w-4/12'>
          <div className='mt-1 lg:mt-10'>
            <VPCard onClick={() => setDetailToShow('verified')}/>
          </div>
          <div className='mt-3'>
            <VPCard onClick={() => setDetailToShow('pending')} title="Pending pay amount" amount="$ 52.16" detailsText="Click for details" bgColor="bg-amber-500"/>
          </div>
        </div>
      </div>
      <div className='lg:w-1/6 flex relative text-center border-2 border-black rounded-2xl left-83 m-4 lg:m-0'>
        <Button className='text-red-500 text-base lg:text-lg font-semibold w-full' onClick={() => setShowWallet(true)}> View E- Wallet</Button>
      </div>
      <DataTableSummary data={jsonData} />
      <DataTableHistory onRowIdClick={() => setShowDetail(true)}/>
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
