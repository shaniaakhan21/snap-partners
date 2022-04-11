import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import { useWallet } from 'lib/hooks/useWallet'

import DashboardLayout from 'layouts/private/Dashboard'
import { EmptyData } from 'components/common/EmptyData'
import { Spinner } from 'components/common/loaders'
import { TableTransactions } from 'components/page/my-wallet/TableTransactions'

const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  const { transactions, loading } = useWallet()

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

              : (<TableTransactions transactions={transactions} />)
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
