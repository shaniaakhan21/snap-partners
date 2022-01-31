import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { config } from 'config'

import DashboardLayout from 'layouts/private/Dashboard'
import {
  CurrentRank,
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
} from 'components/page/dashboard/overview'

const { PAGE_INFO: { SEO } } = config

const DashboardOverViewPage: Page = () => {
  const data = [
    {
      name: '1a',
      pv: 2400
    },
    {
      name: '6m',
      pv: 1398
    },
    {
      name: '1m',
      pv: 9800
    },
    {
      name: '1s',
      pv: 3908
    },
    {
      name: '1d',
      pv: 4800
    }
  ]

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Overview</title>
      </Head>

      <div className='grid grid-cols-1 sm:grid-cols-4 max-w-6xl mx-auto w-full h-fit gap-4'>
        <Graphics data={data} />
        <PromotionTracker data={{}} />
      </div>

      <OverViewGrid>
        <Stepper data={{}} />
        <TotalEarnings data={{}} />
        <TotalOrders data={{}} />
        <EstimatedCommissions data={{}} />
        <MyOrders data={{}} />
        <PayRank data={{}} />
        <CurrentRank data={{}} />
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
