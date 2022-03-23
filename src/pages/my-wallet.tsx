import Head from 'next/head'
import { useEffect, useState } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { getWallet } from 'lib/services/wallet/getUserWallet'

import DashboardLayout from 'layouts/private/Dashboard'
import { useAuthStore } from 'lib/stores'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { Spinner } from 'components/common/loaders'

const { SEO } = APP_INFO

const MyWalletPage: Page = () => {
  const { auth } = useAuthStore()
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const { data, error } = await getWallet(auth.accessToken, auth.id, 1)

      if (error) {
        handleFetchError(error.status, error.info)
        setIsLoading(false)
      }

      setTransactions(data)
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className='max-w-3xl w-full mx-auto'>
      <div className={`relative w-full sm:rounded-lg ${!isLoading && 'overflow-x-auto'}`}> {/* Can be better */}
        {
          isLoading
            ? <div className='w-full h-full flex justify-center items-center'><Spinner /></div>
            : transactions.length === 0
              ? <div className='w-full flex justify-center items-center text-2xl font-bold'>Empty</div>
              : <table className='w-full text-sm text-left'>
                <thead className='text-xs text-gray-800 uppercase'>
                  <tr>
                    <th scope='col' className='px-6 py-3 text-left'>Transaction ID</th>
                    <th scope='col' className='px-6 py-3'>Full Name</th>
                    <th scope='col' className='px-6 py-3'>Description</th>
                    <th scope='col' className='px-6 py-3'>Amount</th>
                    <th scope='col' className='px-6 py-3 text-right'>Date</th>
                  </tr>

                </thead>

                <tbody>
                  {
                    transactions.map(transaction => (
                      <tr className='bg-white border-b text-gray-700'>
                        <td className='px-6 py-4 text-center'>{transaction.id}</td>
                        <td className='px-6 py-4'>{transaction.user.name} {transaction.user.lastname && transaction.user.lastname}</td>
                        <td className='px-6 py-4'>{transaction.description}</td>
                        <td className='px-6 py-4'>${transaction.amount}</td>
                        <td className='px-6 py-4 text-right'>{transaction.createdAt}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
        }

      </div>
    </div>
  )
}

MyWalletPage.getLayout = (page: ReactNode) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - My Wallet</title>
    </Head>

    <DashboardLayout>
      {page}
    </DashboardLayout>
  </>
)

export default MyWalletPage
