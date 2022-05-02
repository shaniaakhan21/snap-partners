import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import { getReport } from 'lib/services/overview/reports'

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
import { useEffect, useState } from 'react'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { auth } = useAuthStore()
  const [overViewData, setOverViewData] = useState({
    estimatedCommissions: '-',
    myOrders: '-',
    payRank: '-',
    topCustomer: '-',
    topDriver: '-',
    topMerchants: '-',
    topRestaurant: '-',
    totalEarnings: '-',
    totalOrders: '-'
  })

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

  const loadReport = async () => {
    const { data, error } = await getReport(auth.accessToken)
    setOverViewData(data)
  }

  useEffect(() => {
    loadReport()
  }, [])

  console.log(overViewData)

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-fit gap-4'>
        <Graphics data={data} />
        <PromotionTracker userAuth={auth} />
      </div>

      <OverViewGrid>
        <Stepper data={{}} />
        <TotalEarnings data={overViewData} />
        <TotalOrders data={overViewData} />
        <EstimatedCommissions data={overViewData} />
        <MyOrders data={overViewData} />
        <PayRank data={overViewData} />
      </OverViewGrid>

      <TopEntitiesGrid>
        <TopMerchantsAcquisition data={overViewData} />
        <TopDriverAcquisition data={overViewData} />
        <TopCustomerAcquisition data={overViewData} />
        <TopOrderLine data={overViewData} />
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
