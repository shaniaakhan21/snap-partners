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
import { MenuItem, Select } from '@mui/material'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  // const { loading } = useReports()
  const [rankData, setRankData] = useState<RankData>(null)
  const [lastMonth, setLastMonth] = useState<boolean>(false)
  const [selectedMonth, setSelectedMonth] = useState('Current Month')
  const store = useAuthStore()
  const auth: any = store.auth

  const currentOverview = getLocalStorage('currentBackoffice') || ''
  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)
  const isIntegrousAssociate = auth.roles.integrousAssociate
  const isIntegrousCustomer = auth.roles.integrousCustomer

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
  }, [lastMonth])

  if (isIntegrousAssociate && currentOverview === '') {
    return (
      <>
        <span className="text-sm text-gray-800 font-semibold text-center">Viewing Monthly Data</span>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          style={{ marginLeft: 10 }}
          sx={{
            marginLeft: 10,
            backgroundColor: 'none',
            border:'transparent!important',
            color: 'white',
            borderRadius: '60px',
            '& .MuiSelect-select': {
              borderRadius: '60px',
              backgroundColor: '#DD4C37!important',
              border:'0!important',
              padding:'4px 35px!important',
              fontSize:'0.875rem',
              '&:focus':{
                borderRadius: '60px!important',
              }
            },
            '& .MuiOutlinedInput-notchedOutline':{
              borderWidth:'0px!important'
            },
            '& .MuiSvgIcon-root': {
              color:'white!important'
            }
          }}
        >
          <MenuItem value="Current Month">Current Month</MenuItem>
          <MenuItem value="Last Month">Last Month</MenuItem>
          <MenuItem value="Last 2 Months">Last 2 Months</MenuItem>
        </Select>
        <br/>
        <br/>
        <TotalLeg selectedMonth={selectedMonth} />
        <br />
        <h1 style={{ fontSize: 30 }}>Referral link to sign up IBO's (Affiliates) & Customers</h1>
        <a target='_blank' href={`https://www.integrouswellness.com/${auth.referralCode}`} style={{ fontSize: 30, textDecoration: 'underline' }}>https://www.integrouswellness.com/{auth.referralCode}</a>
        <br></br>
      </>
    )
  }

  if (isIntegrousCustomer && currentOverview === '') {
    return (
      <>
        <h1 style={{ fontSize: 35 }}>Welcome To SNAP WELLNESS </h1>
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
          {/* <div className='mt-4 bg-white rounded-lg'> */}
          {/*  <MonthlySubscription /> */}
          {/* </div> */}
          {/* <div className='mt-4 bg-white rounded-lg'> */}
          {/*  <MonthlyProduction /> */}
          {/* </div> */}
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
      {/* <div className='col-span-12 mt-4'> */}
      {/*  <Referrals rankData={rankData} /> */}
      {/* </div> */}
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
