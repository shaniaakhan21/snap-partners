import Head from 'next/head'
import PVComponent from 'components/common/overview/PersonalVolume'
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
import { useEffect, useState } from 'react'
import { Rank, RankData } from 'lib/types/overview'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import Referrals from 'components/common/overview/Referrals'
import { useAuthStore } from 'lib/stores'
import MonthlyMilestones from 'components/common/overview/MonthlyMilestones'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { loading } = useReports()
  const [rankData, setRankData] = useState<RankData>(null)
  const store = useAuthStore()
  const auth: any = store.auth

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getRanks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRankData(response.data)
    })()
  }, [])

  if (loading) return <SpinnerPageContent />

  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)

  if (isIntegrous) {
    return (
      <>
        <h1 style={{ fontSize: 60 }}>Launching June 1, 2023</h1>
        <br></br>
        <h1 style={{ fontSize: 30 }}>Dashboard Widgets & More Left Bar Menu Items</h1>
      </>
    )
  }

  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full md:w-1/3">
          <PVComponent/>
          <MonthlyMilestones/>
        </div>
        <div className="w-full md:w-1/3">
          <PVComponent/>
          <MonthlyMilestones/>
        </div>
        <div className="w-full md:w-1/3">
          <PVComponent/>
          <MonthlyMilestones/>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div>
            <RankComponent data={rankData} />
          </div>
          <div className='mt-4'>
            <TierTable />
          </div>
          <div className='mt-4'>
            <Commissions currentRank={(rankData?.currentRank || 'Free Member') as Rank} />
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
        <div className='ml-4'>
          <Event />
          <div className='mt-4 bg-white rounded-lg'>
            <TopProducerCategory />
          </div>
          <div className='mt-4'>
            <Certification />
          </div>
        </div>
      </div>
      <div className='col-span-12 mt-4'>
        <Referrals rankData={rankData} />
      </div> */}
    </>
  )
}

DashboardOverViewPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Dashboard</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default DashboardOverViewPage
