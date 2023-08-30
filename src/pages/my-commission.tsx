import CommissionDetails from './commission/CommissionDetails'
import Notes from './commission/Notes'
import VPCard from './commission/VPCard'
import DataTableSummary, { DataRow } from './commission/DataTableSummary'
import DataTableHistory from './commission/DataTableHistory'
import { Button } from '@mui/material'
import VerifiedDetail from './commission/VerifiedDetail'
import { useEffect, useState, useRef } from 'react'
import PendingDetail from './commission/PendingDetail'
import HistoryDetail from './commission/HistoryDetail'
import MyWalletPage from './wallet'

const MyCommissionComponent = () => {
  const [detailToShow, setDetailToShow] = useState<null | 'verified' | 'pending'>(null)
  const [showDetail, setShowDetail] = useState(false)
  const [showWallet, setShowWallet] = useState(false)
  const [jsonData, setJsonData] = useState<DataRow[]>([])
  const [componentHistory, setComponentHistory] = useState<string[]>([])
  const topRef = useRef(null)

  useEffect(() => {
    setComponentHistory(prevHistory => [...prevHistory, 'None'])
  }, [])

  const goBack = () => {
    setComponentHistory(prevHistory => {
      const newHistory = [...prevHistory]
      newHistory.pop()
      const previousState = newHistory[newHistory.length - 1]

      switch (previousState) {
      case 'None':
        setDetailToShow(null)
        setShowDetail(false)
        setShowWallet(false)
        break
      case 'showWallet':
        setShowWallet(true)
        break
      case 'showDetail':
        setShowDetail(true)
        break
      case 'verified':
        setDetailToShow('verified')
        break
      case 'pending':
        setDetailToShow('pending')
        break
      default:
        break
      }

      return newHistory
    })
  }

  const handleVerifiedClick = () => {
    setDetailToShow('verified')
    setComponentHistory(prevHistory => [...prevHistory, 'verified'])
  }

  const handlePendingClick = () => {
    setDetailToShow('pending')
    setComponentHistory(prevHistory => [...prevHistory, 'pending'])
  }

  const handleShowWalletClick = () => {
    setShowWallet(true)
    setComponentHistory(prevHistory => [...prevHistory, 'showWallet'])
  }

  const handleShowHistoryClick = () => {
    setShowDetail(true)
    setComponentHistory(prevHistory => [...prevHistory, 'showDetail'])
    if (topRef.current) {
      topRef.current.scrollIntoView({
        behavior: 'smooth'
      })
    }
  }

  useEffect(() => {
    setJsonData([
      {
        Title: 'Personal Income',
        Description: 'Personal sales',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '1'
      },
      {
        Title: 'Team Bonus',
        Description: 'Downline one-time product sales',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '2'
      },
      {
        Title: 'Team Residual',
        Description: 'Downline residual services sales',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '3'
      },
      {
        Title: 'CAB',
        Description: 'Customer acquisition Bonus',
        Pending: '$0.00',
        Verified: '$ 214.00',
        id: '4'
      }
    ])
  }, [])

  if (showWallet) {
    return <MyWalletPage onBackClick={goBack} />
  }

  if (showDetail) {
    return <HistoryDetail onBackClick={goBack}/>
  }

  if (detailToShow === 'verified') {
    return <VerifiedDetail onBackClick={goBack}/>
  }

  if (detailToShow === 'pending') {
    return <PendingDetail onBackClick={goBack} />
  }

  return (
    <div className="w-full bg-white rounded-lg px-6 py-8" ref={topRef}>
      <div className='flex flex-row justify-between'>
        <div>
          <h1 className='text-md lg:text-2xl font-bold'>
            My Commission
          </h1>
        </div>
        <div>
          <h1 className='text-md lg:text-2xl font-bold'>
            Client — NAME
          </h1>
        </div>
      </div>

      <CommissionDetails commissionID={'4567890'} nextWeeklyPayRun={'12-12-2023'} nextMonthlyPayRun={'12-12-2023'} rank={'RANK NAME HERE'} gfrank={'RANK NAME HERE'}/>
      <div className='w-full flex flex-col lg:flex-row'>
        <div className='lg:w-8/12 mt-3'>
          <Notes/>
        </div>
        <div className='lg:w-4/12'>
          <div className='mt-1 lg:mt-10'>
            <VPCard onClick={handleVerifiedClick}/>
          </div>
          <div className='mt-3'>
            <VPCard onClick={handlePendingClick} title="Pending pay amount" amount="$ 52.16" detailsText="Click for details" bgColor="bg-amber-500"/>
          </div>
        </div>
      </div>
      <div className='lg:w-1/6 flex relative text-center border-2 border-black rounded-2xl left-83 m-4 lg:m-0'>
        <Button className='text-red-500 text-base lg:text-lg font-semibold w-full' onClick={handleShowWalletClick}> View E- Wallet</Button>
      </div>
      <DataTableSummary data={jsonData} />
      <DataTableHistory onRowIdClick={handleShowHistoryClick}/>
    </div>
  )
}

export default MyCommissionComponent
