import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { useReports } from 'lib/hooks/useReports'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import {
  EstimatedCommissions,
  Graphics,
  MyOrders,
  OverViewGrid,
  PayRank,
  PromotionTracker,
  Stepper,
  TopCustomerAcquisition,
  TopDriverAcquisition,
  TopEntitiesGrid,
  TopOrderLine,
  TopMerchantsAcquisition,
  TotalEarnings,
  TotalOrders
} from 'components/page/overview'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { auth } = useAuthStore()
  const { reports } = useReports()

  const data = [
    {
      name: '1a',
      pv: 0
    },
    {
      name: '6m',
      pv: 0
    },
    {
      name: '1m',
      pv: 0
    },
    {
      name: '1s',
      pv: 0
    },
    {
      name: '1d',
      pv: 0
    }
  ]

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-fit gap-4'>
        <Graphics data={data} />
        <PromotionTracker userAuth={auth} />
      </div>

      <OverViewGrid>
        <Stepper data={{}} />
        <TotalEarnings data={reports} />
        <TotalOrders data={reports} />
        <EstimatedCommissions data={reports} />
        <MyOrders data={reports} />
        <PayRank data={reports} />
      </OverViewGrid>

      <TopEntitiesGrid>
        <TopMerchantsAcquisition data={reports} />
        <TopDriverAcquisition data={reports} />
        <TopCustomerAcquisition data={reports} />
        <TopOrderLine data={reports} />
      </TopEntitiesGrid>
    </>
  )
}

DashboardOverViewPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Overview</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default DashboardOverViewPage
