import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
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
  TopRestaurantsAcquisition,
  TotalEarnings,
  TotalOrders
} from 'components/page/overview'
import { useAuthStore } from 'lib/stores'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { auth } = useAuthStore()
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
      <Head>
        <title>{SEO.TITLE_PAGE} - Overview</title>
      </Head>

      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-fit gap-4'>
        <Graphics data={data} />
        <PromotionTracker userAuth={auth} />
      </div>

      <OverViewGrid>
        <Stepper data={{}} />
        <TotalEarnings data={{}} />
        <TotalOrders data={{}} />
        <EstimatedCommissions data={{}} />
        <MyOrders data={{}} />
        <PayRank data={{}} />
      </OverViewGrid>

      <TopEntitiesGrid>
        <TopRestaurantsAcquisition data={{}} />
        <TopDriverAcquisition data={{}} />
        <TopCustomerAcquisition data={{}} />
        <TopOrderLine data={{}} />
      </TopEntitiesGrid>
    </>
  )
}

DashboardOverViewPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default DashboardOverViewPage
