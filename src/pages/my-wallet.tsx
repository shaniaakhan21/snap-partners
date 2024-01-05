import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import { useWallet } from 'lib/hooks/useWallet'
import { Overlay } from 'components/common/Overlay'
import DashboardLayout from 'layouts/private/Dashboard'
import { EmptyData } from 'components/common/empty/EmptyData'
import { Spinner } from 'components/common/loaders'
import { TableTransactions } from 'components/page/my-wallet/TableTransactions'
import { Button } from '../components/common/Button'
import { useModal } from 'lib/hooks/useModal'
import { ModalContainer } from 'components/common/ModalContainer'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../lib/stores'
import { toast } from 'react-toastify'
import { GrandfatherRankHr } from 'components/common/overview/GrandfatherRankHr'

const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  const { transactions, loading, refresh } = useWallet()
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
        const res = await fetch('/api/user/get-user-balance', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (res.status === 200) {
          const data = await res.json()
          setBalance(parseFloat(data.balance).toFixed(2))
          if (parseFloat(data.balance) >= 5) {
            setenableWithdraw(true)
          }
          setbank_information(data.bank_information)
        }
      } catch (e) {

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
    <div className='max-w-6xl w-full mx-auto'>
      <div>

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
            <div className='flex flex-col lg:flex-row gap-x-6'>
              <div className='shadow-xl mb-4 bg-white rounded-3xl h-fit w-full lg:w-5/12'>
                <div className='m-2 p-4 bg-[#E1EBF3] rounded-t-3xl'>
                  <h2 className='text-xs lg:text-lg text-center mb-4 text-red-500'>Withdrawals may take up to 5 to 7 business days depending on your bank</h2>
                  <div className='max-w-xl mx-auto w-full text-center mb-0'>
                    <span className='font-semibold text-sm lg:text-xl'>Current Balance <br/><span className='text-2xl font-bold text-[#E74426]'>${balance}</span></span><br/>
                    <span className='font-normal text-xs lg:text-base'>Minimum balance to withdraw is <br/> <span className='text-2xl font-bold text-[#E74426]'>$5.00</span></span>
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-6 mb-6'>
                  <Button disabled={!enableWithdraw} onClick={() => { fnOpenModalConfirmation() }} type='submit' classes=' mr-1 text-sm bg-[#E74426]'>
                      Withdraw Available Balance
                  </Button>
                  <GrandfatherRankHr/>
                </div>
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
                  <div className='flex justify-center items-center bg-white w-full lg:w-7/12 p-10 rounded-3xl shadow-lg mb-8 mt-6 lg:mt-0'>
                    <EmptyData label='No transactions found' />
                  </div>
                )
                : (
                  <div className='bg-white w-full lg:w-7/12 p-8 rounded-3xl shadow-lg mb-8 mt-6 lg:mt-0'>
                    <TableTransactions transactions={transactions} />
                  </div>
                )
              }
            </div>
          </>
        </div>
      </div>
    </div>
  )
}

MyWalletPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - My Wallet</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default MyWalletPage
