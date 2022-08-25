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

const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  const { transactions, loading } = useWallet()
  const { auth, setAuth, removeAuth } = useAuthStore()
  const [balance, setBalance] = useState('')
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
          if (parseFloat(data.balance) >= 50) {
            setenableWithdraw(true)
          }
          setbank_information(data.bank_information)
        }
      } catch (e) {

      }
    })()
  }, [])

  return (
    <div className='max-w-4xl w-full mx-auto'>
      <div className={`relative w-full sm:rounded-lg ${!loading && 'overflow-x-auto'}`}> {/* Can be better */}
        {
          loading
            ? (
              <div className='w-full h-screen-80 flex justify-center items-center'>
                <Spinner />
              </div>
            )

            : transactions.length === 0
              ? (
                <div className='flex justify-center items-center h-[70vh]'>
                  <EmptyData label='No transactions found' />
                </div>
              )

              : (
                <>
                  <div className='max-w-xl mx-auto w-full text-center mb-2'>
                    <Button disabled={!enableWithdraw} onClick={() => { fnOpenModalConfirmation() }} type='submit' classes=' mr-1 text-sm bg-primary-500'>
                      Withdraw Available Balance
                    </Button>
                    <br/>
                    <span className='font-semibold text-lg'>Current Balance: ${balance}</span>
                    <br/>
                    <span className='font-semibold text-sm'>Minimum Balance to withdraw is $50.00</span>
                  </div>
                  {modalConfirmationIsOpen && (
                    <Overlay onClick={fnCloseModalConfirmation}>
                      <ModalContainer>

                        {!bank_information?.accountNumber && (
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

                        {bank_information?.accountNumber && (
                          <>
                            <div className={'w-full referral-list--height rounded-sm bg-white p-4 overflow-y-auto scroll-primary lg:block'}>
                              <div className='max-w-xl mx-auto w-full text-center mb-3'>
                                <span className='font-semibold text-lg'>Withdraw Balance</span>
                              </div>
                                Are you sure you want to withdraw ${balance} to your bank account ending in {bank_information?.accountNumber.substr(-4)}
                            </div>
                            <div className='max-w-xl mx-auto w-full text-center mb-1'>
                              <Button onClick={() => { fnOpenModalConfirmation() }} classes=' mr-1 text-sm '>
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
                  <TableTransactions transactions={transactions} />
                </>
              )
        }

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
