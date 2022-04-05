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

import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

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

const columns = [
  { name: 'id', header: 'Transaction ID', defaultFlex: 1 },
  { name: 'description', header: 'Description', defaultFlex: 1 },
  {
    name: 'user',
    header: 'Name',
    render: ({ value }) => {
      return `${value.name} ${value.lastname}`
    },
    defaultFlex: 1
  },
  { name: 'amount', header: 'Amount', defaultFlex: 1, type: 'number' },
  {
    name: 'state',
    header: 'State',
    render: ({ value }) => {
      return value ? '✔ APPROVED' : '❌ DENIED'
    },
    defaultFlex: 1
  },
  { name: 'date', header: 'Date', defaultFlex: 1 },
  { name: 'time', header: 'Time', defaultFlex: 1 }
]

const gridStyle = { minHeight: 550 }

const filterValue = [
  { name: 'description', operator: 'startsWith', type: 'string', value: '' },
  { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
]

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
              <div className='w-full h-screen-80 flex justify-center items-center h-'>
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
                <ReactDataGrid
                  idProperty="id"
                  columns={columns}
                  dataSource={transactions}
                  sortable={true}
                  defaultFilterValue={filterValue}
                  style={gridStyle}
                  defaultLimit={10}
                  pagination
                />
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
