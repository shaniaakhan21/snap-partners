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
import GrowthSummary from '../components/common/overview/GrowthSummary'
import TotalLeg from './backOfficeDashboard'
import PVComponentSnap from 'components/common/dashBackOffice/PersonalVolumeSnap'
import Modal from '@mui/material/Modal'
import Button from '@mui/material/Button'
import ContractModal from './wellness/components/ContractModal'
import TINPopup from './commonPopup'
import CommonPopup from './commonPopup/common/index'
import { useRouter } from 'next/router'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  // const { loading } = useReports()
  const [rankData, setRankData] = useState<RankData>(null)
  const [viewing, setViewing] = useState<string>('Aug')
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()
  const [openModal, setOpenModal] = useState(!auth.isCertified)
  const [openModalTIN, setOpenModalTIN] = useState(!auth.isValidated)
  console.log('validation', auth.isValidated)
  const currentOverview = getLocalStorage('currentBackoffice') || ''
  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)
  const isCustomer = auth.roles.customer
  const isIntegrousAssociate = auth.roles.integrousAssociate
  const [open, setOpen] = useState(true)
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleCloseModalTIN = () => {
    setOpenModalTIN(false)
  }

  useEffect(() => {
    (async () => {
      if (isIntegrous && currentOverview === '') return
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getRanks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('rankData is', response.data)
      setRankData(response.data)
    })()
  }, [])

  const handleClose = () => {
    setOpen(false)
  }

  if (isIntegrousAssociate && currentOverview === '') {
    return (
      <>
        <span className="text-sm text-gray-800 font-semibold text-center">Viewing {viewing} 2023</span>
        <button onClick={() => { setViewing('June') }} style={{ cursor: 'pointer', marginLeft: 10 }} className="rounded-full bg-primary-500 bg-red-500 text-gray-500">
          <p className='text-xs text-white font-medium p-2 uppercase'>June 2023</p>
        </button>
        <button onClick={() => { setViewing('July') }} style={{ cursor: 'pointer', marginLeft: 10 }} className="rounded-full bg-primary-500 bg-red-500 text-gray-500">
          <p className='text-xs text-white font-medium p-2 uppercase'>July 2023</p>
        </button>
        <button onClick={() => { setViewing('Aug') }} style={{ cursor: 'pointer', marginLeft: 10 }} className="rounded-full bg-primary-500 bg-red-500 text-gray-500">
          <p className='text-xs text-white font-medium p-2 uppercase'>Aug 2023</p>
        </button>
        <br/>
        <br/>
        <TotalLeg viewing={viewing} />
        {/* <br />
        <h1 style={{ fontSize: 30 }}>Referral link to sign up IBO's (Affiliates) & Customers</h1>
        <a target='_blank' href={`https://www.integrouswellness.com/${auth.referralCode}`} style={{ fontSize: 30, textDecoration: 'underline' }}>https://www.integrouswellness.com/{auth.referralCode}</a>
        <br></br> */}
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
            <Commissions currentRank={(rankData?.currentRank || 'Free Member') as Rank} userId={null}/>
          </div>
          <div className='mt-4'>
            <PVComponentSnap />
          </div>
          <div className='mt-4'>
            <RewardsProgram />
          </div>
          <div className='mt-4'>
            <GrowthSummary userId={null} />
          </div>
          <div className='mt-4 bg-white rounded-lg'>
            <MonthlySubscription userId={ null } />
          </div>
          <div className='mt-4 bg-white rounded-lg'>
            <MonthlyProduction userId={null} />
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
      {!isCustomer && (
        <ContractModal open={openModal} onClose={handleCloseModal} />)
      }

      <TINPopup open={openModalTIN} onClose={handleCloseModalTIN}/>

      {/* <CommonPopup
        image="/static/success.svg"
        title="Success"
        description="Snap has updated your profile"
        buttonText="Back to Home"
        svgId="popupImage-success"
        onClose={handleClose} open={open} />
      <CommonPopup
        image="/static/error.svg"
        title="Failed"
        description="Snap would like you to complete Document verification to move forward."
        buttonText="Verify Documents"
        svgId="popupImage-error"
        onClose={handleClose} open={open} /> */}
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
