import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import RankComponent from 'components/common/overview/RankComponent'
import MonthlySubscription from 'components/common/overview/MonthlySubscription'
import MonthlyProduction from 'components/common/overview/MonthlyProduction'
import DashboardLayout from 'layouts/private/Dashboard'
import Certification from 'components/common/overview/Certification'
import TopProducerCategory from 'components/common/overview/TopProducerCategory'
import TierTable from 'components/common/overview/TierTable'
import RewardsProgram from 'components/common/overview/RewardsProgram'
import { useEffect, useState } from 'react'
import { RankData } from 'lib/types/overview'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import Referrals from 'components/common/overview/Referrals'
import { useAuthStore } from 'lib/stores'
import GrowthSummary from '../components/common/overview/GrowthSummary'
import TotalLeg from './backOfficeDashboard'
import ContractModal from './wellness/components/ContractModal'
import TINPopup from './commonPopup'
import AlertWidget from 'components/common/overview/1099Alert'
import NetworkActivity from 'components/common/overview/NetworkActivity'
import Event from 'components/common/overview/Event'
import PVComponentSnap from 'components/common/dashBackOffice/PersonalVolumeSnap'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'

const { SEO } = APP_INFO

const DashboardOverViewPage: Page = () => {
  const { auth } = useAuthStore()
  const [rankData, setRankData] = useState<RankData>(null)
  if (!auth) {
    return <SpinnerPageContent />
  }
  const [viewing, setViewing] = useState<string>('Aug')
  const [openModal, setOpenModal] = useState(!auth.isCertified)
  const [openModalTIN, setOpenModalTIN] = useState(!auth.isValidated)
  const currentOverview = getLocalStorage('currentBackoffice') || ''
  const isIntegrous = (auth.roles.integrousAssociate || auth.roles.integrousCustomer)
  const isCustomer = auth.roles.customer
  const isIntegrousAssociate = auth.roles.integrousAssociate
  const [showPopup, setShowPopup] = useState(false)
  const SSnURL = auth.SSNDocURL
  const doc_b_structure = auth.doc_b_structure
  const doc_irs = auth.doc_irs
  const TinStatus = auth.TINstatus
  const showAlert =
  (TinStatus === 'individual' && (!(auth.newSSN === null) && (SSnURL === null))) ||
  (TinStatus === 'business' && (doc_b_structure === null || doc_irs === null) && !auth.isValidated)

  useEffect(() => {
    fetch('/api/snap/getYearlyCommission', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if ((doc_b_structure === null || doc_irs === null) && (auth.TINstatus === null) && (auth.roles.ibo)) {
          setShowPopup(true)
        } else {
          setShowPopup(false)
        }
      })
      .catch((error) => console.error('Error fetching data: ', error))
  }, [])
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
      {showAlert && (
        <AlertWidget />
      )}
      <div className=''>
        <div className=''>
          <RankComponent data={rankData} />
        </div>

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <div className='mt-8 mr-4'>
            <TierTable />
          </div>
          <div className='mt-8'>
            <NetworkActivity />
          </div>
          <div className='mt-8'>
            <GrowthSummary userId={null} />
          </div>

          <div className='mt-8'>
            <PVComponentSnap userId={null} />
          </div>
        </div>
        <div className='ml-4 mt-8 '>
          <Event />
          <div className='mt-8'>
            <TopProducerCategory />
          </div>

          <div className='mt-8'>
            <Certification />
          </div>

        </div>

      </div>
      <div className='col-span-12 mt-8'>
        {/* <Referrals rankData={rankData} /> */}
        <RewardsProgram />
      </div>

      {!isCustomer && (
        <ContractModal open={openModal} onClose={handleCloseModal} />)
      }

      {showPopup && <TINPopup open={openModalTIN} onClose={handleCloseModalTIN}/>}

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
