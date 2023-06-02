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
import { useEffect, useState } from 'react'
import { Rank, RankData } from 'lib/types/overview'
import { getLocalStorage, setLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import Referrals from 'components/common/overview/Referrals'
import { useAuthStore } from 'lib/stores'
import TotalLeg from './backOfficeDashboard'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  // const { loading } = useReports()
  const [rankData, setRankData] = useState<RankData>(null)
  const store = useAuthStore()
  const auth: any = store.auth

  const currentOverview = getLocalStorage('currentBackoffice') || ''
  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)

  useEffect(() => {
    (async () => {
      if (isIntegrous && currentOverview === '') return
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getRanks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setRankData(response.data)
    })()
  }, [])

  // if (loading) return <SpinnerPageContent />

  if (isIntegrous && currentOverview === '') {
    return (
      <>
        <TotalLeg />
        <br />
        <h1 style={{ fontSize: 30 }}>Referral link to sign up IBO's (Affiliates) & Customers</h1>
        <a target='_blank' href={`https://www.integrouswellness.com/${auth.referralCode}`} style={{ fontSize: 30, textDecoration: 'underline' }}>https://www.integrouswellness.com/{auth.referralCode}</a>
        <br></br>
        <br></br>
        <h1 style={{ fontSize: 60 }}>WE'RE OPEN</h1>
        <br />
        <h1 style={{ fontSize: 30 }}>Log back in every day to see us roll out your new dashboard widgets</h1>
      </>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
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
      </div>
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
