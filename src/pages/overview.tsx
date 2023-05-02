import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { useReports } from 'lib/hooks/useReports'
import { APP_INFO } from 'config/appInfo'
import RankComponent from 'components/common/overview/RankComponent'
import MonthlySubscription from 'components/common/overview/MonthlySubscription'
import MonthlyProduction from 'components/common/overview/MonthlyProduction'
import Event from 'components/common/overview/Event'
import DashboardLayout from 'layouts/private/Dashboard'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import Certification from 'components/common/overview/Certification'
import TopProducerCategory from 'components/common/overview/TopProducerCategory'
import Commissions from 'components/common/overview/Comissions'
import TierTable from 'components/common/overview/TierTable'
import RewardsProgram from 'components/common/overview/RewardsProgram'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { loading } = useReports()

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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div>
          <div>
            <RankComponent />
          </div>
          <div className='mt-4'>
            <TierTable />
          </div>
          <div className='mt-4'>
            <Commissions />
          </div>
          <div className='mt-4'>
            <RewardsProgram />
          </div>
          <div className='mt-4 bg-white rounded-lg'>
            <MonthlySubscription />
          </div>
          <div className='mt-4 bg-white rounded-lg'>
            <MonthlyProduction />
          </div>
        </div>
        <div>
          <Event />
          <div className='mt-4 bg-white rounded-lg'>
            <TopProducerCategory />
          </div>
          <div className='mt-4'>
            <Certification />
          </div>
        </div>
      </div>
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
