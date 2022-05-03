import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { useReports } from 'lib/hooks/useReports'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'

import {
  // EstimatedCommissions,
  Graphics,
  // MyOrders,
  // OverViewGrid,
  // PayRank,
  PromotionTracker,
  // Stepper,
  // TopCustomerAcquisition,
  // TopDriverAcquisition,
  // TopEntitiesGrid,
  // TopOrderLine,
  // TopMerchantsAcquisition,
  // TotalEarnings,
  // TotalOrders
} from 'components/page/overview'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { reports, dataGraphic, loading } = useReports()
  const { auth } = useAuthStore()

  if (loading) return <SpinnerPageContent />

  return (
    <>
      {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-fit gap-4'>
        <Graphics data={dataGraphic} />
        <PromotionTracker userAuth={auth} />
      </div> */}

      <div className='w-full h-fit text-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row md:grid-rows-[9] gap-4'>
        <div className=' col-span-1 row-span-1 md:col-span-3 md:col-start-2 flex justify-center items-center'> {/* Graphic */}
          <ResponsiveContainer height={200} className='w-full'>
            <BarChart
              width={60}
              height={200}
              data={dataGraphic as any}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='pv' fill='#18C8FF' />
            </BarChart>
          </ResponsiveContainer>
        </div>

          <div className='flex flex-col justify-end items-start col-span-2 row-span-1 md:col-start-1 md:row-start-1 md:col-span-1 text-sm'> {/* Promotion Tracker */}
          <div className='bg-white rounded-b-md col-span-2 md:col-span-1 row-span-2 md:col-start-1 p-4'></div> {/* Stepper */}
          <div className='px-4 py-2 col-span-1 row-span-1 w-full bg-white rounded-md flex flex-col md:flex-row justify-center items-center p-3 gap-3'></div> {/* Total Earnings */}
          <div className=' bg-white rounded-md col-span-1 row-span-1 flex flex-col md:flex-row justify-center items-center gap-3 p-3'></div> {/* Total Orders */}
          <div className=' bg-white rounded-md col-span-1 row-span-1 flex flex-col md:flex-row justify-center items-center gap-3 p-3'></div> {/* Estimated Commissions */}
          <div className=' bg-white rounded-md col-span-1 row-span-1 flex flex-col md:flex-row justify-center items-center gap-3 p-3'></div> {/* My Orders */}
          <div className=' bg-white rounded-md col-span-2 row-span-1 flex flex-col md:flex-row justify-center items-center gap-3 p-3'></div> {/* Pay Rank */}

          <div className='overviewLayout__topDriverAcquisition h-full p-4 bg-white rounded-md'></div> {/* Top Driver Adquisitions */}
          <div className='overviewLayout__topCustomerAcquisition h-full p-4 bg-white rounded-md'></div> {/* Top Customer Adquisitions */}
          <div className='overviewLayout__topOrderline h-full p-4 bg-white rounded-md'></div> {/* Top Order Line */}
        </div>
      </div>

      {/* <OverViewGrid>
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
      </TopEntitiesGrid> */}
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
