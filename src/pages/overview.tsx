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
  // TopOrderLine,
  TopMerchantsAcquisition,
  TopAgentAcquisition,
  TotalEarnings,
  TotalOrders
} from 'components/page/overview'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { reports, dataGraphic, loading } = useReports()
  const { auth } = useAuthStore()

  if (loading) return <SpinnerPageContent />

  return (
    <>
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-5'>
          <a href="https://store.snapdelivered.com/product/snap-disruption-university-part-3-live-event/" target={'_blank'}>
            <img src='/images/img1.jpg' alt='Agent logo' />
          </a>
          <a href="https://store.snapdelivered.com/product/snap-disruption-university-part-3-live-stream/" target={'_blank'}>
            <img src='/images/img2.jpg' alt='Agent logo' />
          </a>
        </div>
      </>
      <>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-5'>
          <a href="https://jorns.smartstudenthub.com/Account/ERCLogin" target={'_blank'}>
            <img src='/images/1.png' alt='Agent logo' />
          </a>
          <a href="https://snapfinancialcertified.com/" target={'_blank'}>
            <img src='/images/2.png' alt='Agent logo' />
          </a>
        </div>
      </>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-full h-fit gap-4'>
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
