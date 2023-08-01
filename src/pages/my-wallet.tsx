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
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  const { t } = useTranslation('my-wallet')
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
      toast(t('error_transfer'), { type: 'error' })
      return
    }
    toast(t('success_transter'), { type: 'success' })
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
            <Button disabled={!enableWithdraw} onClick={() => { fnOpenModalConfirmation() }} type='submit' classes=' mr-1 text-sm bg-primary-500'>
              {t('withdraw_button')}
            </Button>
            <br/>
            <span className='font-semibold text-lg'>{t('current_balance', { balance })}</span>
            <br/>
            <span className='font-semibold text-sm'>{t('min_withdraw')}</span>
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
                        <span className='font-semibold text-lg'>{t('withdraw_balance.title')}</span>
                      </div>
                      {t('withdraw_balance.subtitle')}
                    </div>
                    <div className='max-w-xl mx-auto w-full text-center mb-1'>
                      <Button onClick={() => { window.location.href = '/profile' }} classes=' mr-1 text-sm '>
                        {t('withdraw_balance.goto_profile')}
                      </Button>
                      <Button onClick={() => { fnOpenModalConfirmationManually() }} style={{ backgroundColor: 'grey' }} classes=' mr-1 text-sm '>
                        {t('withdraw_balance.cancel')}
                      </Button>
                    </div>
                  </>
                )}

                {(bank_information?.accountNumber && !loadingButton) && (
                  <>
                    <div className={'w-full referral-list--height rounded-sm bg-white p-4 overflow-y-auto scroll-primary lg:block'}>
                      <div className='max-w-xl mx-auto w-full text-center mb-3'>
                        <span className='font-semibold text-lg'>{t('confirmation.title')}</span>
                      </div>
                      {t('confirmation.message', { balance, accountNumber: bank_information?.accountNumber.substr(-4) })}
                    </div>
                    <div className='max-w-xl mx-auto w-full text-center mb-1'>
                      <Button onClick={() => { withdraw() }} classes=' mr-1 text-sm '>
                        {'withdraw_balance.withdraw'}
                      </Button>
                      <Button onClick={() => { fnOpenModalConfirmationManually() }} style={{ backgroundColor: 'grey' }} classes=' mr-1 text-sm '>
                        {t('withdraw_balance.cancel')}
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
                <EmptyData label={t('no_transactions')} />
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

MyWalletPage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation('my-wallet')

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('title')}</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export default MyWalletPage
