import Head from 'next/head'
import { useEffect, useState } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { getWallet } from 'lib/services/wallet/getUserWallet'

import DashboardLayout from 'layouts/private/Dashboard'
import { useAuthStore } from 'lib/stores'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { Spinner } from 'components/common/loaders'
import { EmptyData } from 'components/common/EmptyData'

const { SEO } = APP_INFO

interface ITransaction {
  createdAt: string
  id: number
  state: number
  type: number
  description: string
  amount: number
  userId: number
  updatedAt: string
  user: {
      id: number,
      name: string,
      lastname: string
  }
  date: string
  time: string
}

const MyWalletPage: Page = () => {
  const { auth } = useAuthStore()
  const [transactions, setTransactions] = useState<ITransaction[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      const { data, error } = await getWallet(auth.accessToken, auth.id, 1)

      if (error) {
        handleFetchError(error.status, error.info)
        setIsLoading(false)
      }

      setTransactions([...data])
      setIsLoading(false)
    })()
  }, [])

  return (
    <div className='max-w-4xl w-full mx-auto'>
      <div className={`relative w-full sm:rounded-lg ${!isLoading && 'overflow-x-auto'}`}> {/* Can be better */}
        {
          isLoading
            ? (
              <div className='w-full h-full flex justify-center items-center'>
                <Spinner />
              </div>
            )

            : transactions.length === 0
              ? (
                <div className='flex justify-center items-center h-[70vh]'>
                  <EmptyData
                    label='No transactions found'
                    description='Please change the date , ID or try different Keyword'
                  />
                </div>
              )

              : (
                <table className='w-full text-sm text-left'>
                  <thead className='text-xs text-gray-800 uppercase'>
                    <tr>
                      <th scope='col' className='px-6 py-3 text-left'>Transaction ID</th>
                      <th scope='col' className='px-6 py-3'>Name</th>
                      <th scope='col' className='px-6 py-3'>Description</th>
                      <th scope='col' className='px-6 py-3'>Amount</th>
                      <th scope='col' className='px-6 py-3 text-center'>State</th>
                      <th scope='col' className='px-6 py-3 text-right'>Date</th>
                      <th scope='col' className='px-6 py-3 text-right'>Time</th>
                    </tr>

                  </thead>

                  <tbody>
                    {
                      transactions.map(transaction => (
                        <tr className='bg-white border-b text-gray-700'>
                          <td className='px-6 py-4 text-center text-red-500'>{transaction.id}</td>
                          <td className='px-6 py-4'>{transaction.user.name} {transaction.user.lastname && transaction.user.lastname}</td>
                          <td className='px-6 py-4'>{transaction.description}</td>
                          <td className='px-6 py-4 font-bold'>${transaction.amount}</td>
                          <td className={`px-6 py-4 font-bold text-center ${transaction.state ? 'bg-success-200' : 'bg-primary-300'}`}>{transaction.state ? 'APPROVED' : 'DENIED'}</td>
                          <td className='px-6 py-4 text-right'>{transaction.date}</td>
                          <td className='px-6 py-4 text-right'>{transaction.time}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              )
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
