import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { useReports } from 'lib/hooks/useReports'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import RankComponent from 'components/common/overview/RankComponent'
import MonthlySubscription from 'components/common/overview/MonthlySubscription'
import MonthlyProduction from 'components/common/overview/MonthlyProduction'
import TeamCommission from 'components/common/overview/TeamCommission'
import Event from 'components/common/overview/Event'

import DashboardLayout from 'layouts/private/Dashboard'
// import {
//   EstimatedCommissions,
//   Graphics,
//   MyOrders,
//   OverViewGrid,
//   PayRank,
//   PromotionTracker,
//   Stepper,
//   TopCustomerAcquisition,
//   TopDriverAcquisition,
//   TopEntitiesGrid,
//   // TopOrderLine,
//   TopMerchantsAcquisition,
//   TopAgentAcquisition,
//   TotalEarnings,
//   TotalOrders
// } from 'components/page/overview'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import TopProducers from 'components/common/overview/TopProducers'
import Certification from 'components/common/overview/Certification'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { reports, dataGraphic, loading } = useReports()
  const { auth } = useAuthStore()

  if (loading) return <SpinnerPageContent />

  return (
    <>
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-5'>
          <a href="https://store.snapdelivered.com/product/snap-u-live-event-in-cincinnati-ohio/" target={'_blank'}>
            <img src='/images/livev1.jpg' alt='Agent logo' />
          </a>
          <a href="https://store.snapdelivered.com/product/snap-u-live-stream-in-cincinnati-ohio/" target={'_blank'}>
            <img src='/images/streamv1.jpg' alt='Agent logo' />
          </a>
        </div>
      </>
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-5'>
          <a href="https://jorns.smartstudenthub.com/ERC/Register" target={'_blank'}>
            <img src='/images/1v1.png' alt='Agent logo' />
          </a>
          <a href="https://snapfinancialcertified.com/" target={'_blank'}>
            <img src='/images/2.png' alt='Agent logo' />
          </a>
        </div>
      </>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="col-span-3 sm:col-span-3 md:col-span-1 row-span-2">
          <div className="bg-white">
            <div className='pt-2 pl-2 pr-2'>
              <RankComponent />
            </div >
          </div>
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-1 row-span-1 bg-white">
          <MonthlySubscription />
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-1 row-span-1 bg-white">
          <MonthlyProduction />
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-1 row-span-1 bg-white">
          <Event />
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-1 row-span-1 bg-white">
          <TopProducers />
        </div>
        <div className="col-span-3 sm:col-span-3 md:col-span-1 row-span-1 bg-white">
          <Certification />
        </div>
        {/*
        <div className="col-span-3 sm:col-span-3 md:col-span-3 bg-white">
          <div className='p-10'>
            <TeamCommission />
          </div>
        </div>
  */}
      </div>
      {/* <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-fit gap-4'>
        <Graphics data={dataGraphic} />
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
        <TopAgentAcquisition data={reports} />
        {/* <TopOrderLine data={reports} /> */}
      {/* </TopEntitiesGrid> */}
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
