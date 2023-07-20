// import { useEffect, useState } from 'react'
// import { Link, Tab, Tabs } from '@mui/material'
// import { Button } from 'components/common/Button'
// import { getLocalStorage } from 'lib/utils/localStorage'
// import axios from 'axios'
// import { Rank } from 'lib/types/overview'
// import HiddenTabScrollButton from 'components/common/overview/HiddenTabScrollButton'

// const tabStyle = {
//   color: '#777777',
//   backgroundColoR: '#FFFFFF',
//   fontSize: 12,
//   width: '20%',
//   '&.Mui-selected': {
//     backgroundColor: '#E35C49',
//     color: '#FFFFFF'
//   }
// }

// interface Commission{
//   manager: number;
//   supervisor: number;
//   director: number;
//   executive: number
// }

// interface RankedCommissions{
//   allTime: Commission
//   currentPeriod: Commission;
//   lastMonth: Commission
//   quarter: Commission
//   year: Commission
// }

// const timelineMap = {
//   0: 'currentPeriod',
//   1: 'lastMonth',
//   2: 'quarter',
//   3: 'year',
//   4: 'allTime'
// }

// interface CommissionsProps{
//   currentRank: string
//   userId: number
// }

// export default function CommissionsTab (props: CommissionsProps) {
//   const { currentRank, userId } = props
//   let rankKey: keyof Commission = 'manager'
//   switch (currentRank) {
//   case 'manager': {
//     rankKey = 'manager'
//     break
//   }
//   case 'director': {
//     rankKey = 'director'
//     break
//   }
//   case 'supervisor': {
//     rankKey = 'supervisor'
//     break
//   }
//   case 'executive': {
//     rankKey = 'executive'
//     break
//   }
//   default:
//     break
//   }
//   const [selectedTimeline, setSelectedTimeline] = useState(0)
//   const [commissionData, setCommissionData] = useState<RankedCommissions>(null)
//   const selectedData: Commission = commissionData ? commissionData[timelineMap[selectedTimeline]] : { manager: 0, supervisor: 0, director: 0, executive: 0 }

//   useEffect(() => {
//     (async () => {
//       const token = getLocalStorage('accessToken')
//       const response = await axios.get('/api/reports/getEstimatedCommissions', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         },
//         params: {
//           id: userId
//         }
//       })
//       setCommissionData(response.data)
//     })()
//   }, [])

//   return (
//     <div className="bg-white rounded-lg px-2.5 py-3">
//       <div className='flex flex-row justify-between'>
//         <span className='text-lg text-semibold'>Commissions</span>
//         {/* <Button classes='bg-white  focus:ring-0'>
//           <Link href='/my-wallet' sx={{ textTransform: 'none', textDecoration: 'none' }}>
//             <span className='font-normal text-textAcent-500'>
//               See Details
//             </span>
//           </Link>
//         </Button> */}
//       </div>
//       <Tabs value={selectedTimeline}
//         onChange={(_, value) => setSelectedTimeline(value)}
//         className='mt-2.5 border-b-4 border-textAcent-500'
//         textColor="inherit"
//         indicatorColor="secondary"
//         variant='scrollable'
//         ScrollButtonComponent={HiddenTabScrollButton}
//         scrollButtons='auto'
//         TabIndicatorProps={{
//           style: { display: 'none' }
//         }}>
//         <Tab sx={tabStyle} color='#Ffffff' label="Current" />
//         <Tab sx={tabStyle} label="Last Month" />
//         <Tab sx={tabStyle} label="Quarter" />
//         <Tab sx={tabStyle} label="Year" />
//         <Tab sx={tabStyle} label="All time" />
//       </Tabs>
//       <div className=''>
//         <div style={{ textAlign: 'center' }}>
//           <span className='text-xs sm:text-sm'>
//             Commissions at current rank
//           </span>
//           <div className='text-2xl font-bold'>
//             ${currentRank === 'Free Member' ? 0 : selectedData[rankKey]}
//           </div>
//         </div>
//         {/* <table className="table-fixed flex-1 ml-2 text-center">
//           <thead>
//             <tr>
//               <th className='text-xs font-normal'>Manager</th>
//               <th className='text-xs font-normal'>Supervisor</th>
//               <th className='text-xs font-normal'>Director</th>
//               <th className='text-xs font-normal'>Executive</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className='text-sm'>${selectedData.manager}</td>
//               <td className='text-sm'>${selectedData.supervisor}</td>
//               <td className='text-sm'>${selectedData.director}</td>
//               <td className='text-sm'>${selectedData.executive}</td>
//             </tr>
//           </tbody>
//         </table> */}
//       </div>
//       {/* <div className='text-center'>
//         <span className='text-xs sm:text-sm md:text-base text-center font-semibold'>Your Potential Commission</span>
//       </div> */}
//     </div>
//   )
// }

import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import { useWallet } from 'lib/hooks/useWallet'
import { Overlay } from 'components/common/Overlay'
import DashboardLayout from 'layouts/private/Dashboard'
import { EmptyData } from 'components/common/empty/EmptyData'
import { Spinner } from 'components/common/loaders'
import { TableTransactions } from 'components/page/my-wallet/TableTransactions'
import { Button } from '../../../../components/common/Button'
import { useModal } from 'lib/hooks/useModal'
import { ModalContainer } from 'components/common/ModalContainer'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../../../../lib/stores'
import { toast } from 'react-toastify'
import axios from 'axios'

const { SEO } = APP_INFO

const ComissionsTab = ({ userId }) => {
  const { transactions, loading, refresh } = useWallet(userId)
  const { auth, setAuth, removeAuth } = useAuthStore()
  const [balance, setBalance] = useState('')
  const [loadingButton, setloadingButton] = useState(false)
  const [enableWithdraw, setenableWithdraw] = useState(false)
  const [bank_information, setbank_information] = useState({}) as any

  const {
    isOpen: modalConfirmationIsOpen,
    fnOpenModal: fnOpenModalConfirmation,
    fnCloseModalManually: fnOpenModalConfirmationManually,
    fnCloseModal: fnCloseModalConfirmation
  } = useModal(false)

  useEffect(() => {
    (async function () {
      try {
        console.log('in use effect function', userId)
        const requestData = {
          userId: userId
        }
        await axios.get('/api/user/get-user-balance', {
          params: requestData,
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          }
        })
        // const res = await fetch('/api/user/get-user-balance', {
        //   method: 'GET',
        //   headers: {
        //     Authorization: `Bearer ${auth.accessToken}`,
        //     'Content-Type': 'application/json'
        //   },
        //   params: requestData
        // })

          .then(async (result) => {
            if (result.status === 200) {
              const data = result.data
              console.log('result data is', data)
              setBalance(parseFloat(data?.balance).toFixed(2))
              if (parseFloat(data.balance) >= 5) {
                setenableWithdraw(true)
              }
              setbank_information(data.bank_information)
              await refresh(userId)
            }
          })
      } catch (e) {
        console.log('error while getting waqllet', e)
      }
    })()
  }, [])


  const withdraw = async () => {
    setloadingButton(true)
    const res = await fetch('/api/user/withdraw-balance', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth.accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    fnOpenModalConfirmationManually()
    setloadingButton(false)
    await refresh()
    if (res.status !== 200) {
      toast('Error while processing transfer, contact support', { type: 'error' })
      return
    }
    toast('Transfer processed succesfully', { type: 'success' })
  }

  return (
    <div className='max-w-4xl w-full mx-auto'>
      <div className={`relative w-full sm:rounded-lg ${!loading && 'overflow-x-auto'}`}> {/* Can be better */}
        {
          loading &&
            (
              <div className='w-full h-screen-80 flex justify-center items-center'>
                <Spinner/>
              </div>
            )
        }
        <>
          <div className='max-w-xl mx-auto w-full text-center mb-2'>
            {/* <Button disabled={!enableWithdraw} onClick={() => { fnOpenModalConfirmation() }} type='submit' classes=' mr-1 text-sm bg-primary-500'>
                      Withdraw Available Balance
            </Button> */}
            <br/>
            <span className='font-semibold text-lg'>Current Balance: ${balance}</span>
            <br/>
            <span className='font-semibold text-sm'>minimum balance to withdraw is $5.00</span>
          </div>
          {modalConfirmationIsOpen && (
            <Overlay onClick={fnCloseModalConfirmation}>
              <ModalContainer>

                { loadingButton && (
                  <div className='w-full flex justify-center items-center'>
                    <Spinner />
                  </div>
                )}

                {(!bank_information?.accountNumber && !loadingButton) && (
                  <>
                    <div className={'w-full referral-list--height rounded-sm bg-white p-4 overflow-y-auto scroll-primary lg:block'}>
                      <div className='max-w-xl mx-auto w-full text-center mb-3'>
                        <span className='font-semibold text-lg'>Withdraw Balance</span>
                      </div>
                              In order to withdraw your balance, please add your bank account in profile
                    </div>
                    <div className='max-w-xl mx-auto w-full text-center mb-1'>
                      <Button onClick={() => { window.location.href = '/profile' }} classes=' mr-1 text-sm '>
                                Go to Profile
                      </Button>
                      <Button onClick={() => { fnOpenModalConfirmationManually() }} style={{ backgroundColor: 'grey' }} classes=' mr-1 text-sm '>
                                Cancel
                      </Button>
                    </div>
                  </>
                )}

                {(bank_information?.accountNumber && !loadingButton) && (
                  <>
                    <div className={'w-full referral-list--height rounded-sm bg-white p-4 overflow-y-auto scroll-primary lg:block'}>
                      <div className='max-w-xl mx-auto w-full text-center mb-3'>
                        <span className='font-semibold text-lg'>Withdraw Balance</span>
                      </div>
                                Are you sure you want to withdraw ${balance} to your bank account ending in {bank_information?.accountNumber.substr(-4)}
                    </div>
                    <div className='max-w-xl mx-auto w-full text-center mb-1'>
                      <Button onClick={() => { withdraw() }} classes=' mr-1 text-sm '>
                                  Withdraw
                      </Button>
                      <Button onClick={() => { fnOpenModalConfirmationManually() }} style={{ backgroundColor: 'grey' }} classes=' mr-1 text-sm '>
                                  Cancel
                      </Button>
                    </div>
                  </>

                )}
              </ModalContainer>
            </Overlay>
          )}
          { transactions.length === 0
            ? (
              <div className='flex justify-center items-center'>
                <EmptyData label='No transactions found' />
              </div>
            )
            : (
              <TableTransactions transactions={transactions} />
            )
          }
        </>
      </div>
    </div>
  )
}

export default ComissionsTab
