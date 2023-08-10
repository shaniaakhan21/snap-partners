import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { Spinner } from 'components/common/loaders'
import { useEffect, useState } from 'react'
import { useAuthStore } from '../lib/stores'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'

const { SEO } = APP_INFO

const columns = [
  { name: 'description', header: 'Description', defaultFlex: 3 },
  {
    name: 'date',
    header: 'Date',
    defaultFlex: 1
  }
]

const gridStyle = { minHeight: 525 }

const filterValue = [
  { name: 'description', operator: 'contains', type: 'string', value: '' }
]

const TableNotifications = ({ notifications }) => {
  return (
    <ReactDataGrid
      columns={columns}
      dataSource={notifications}
      sortable={false}
      defaultFilterValue={filterValue}
      style={gridStyle}
      defaultLimit={10}
      pagination
    />
  )
}

const MyWalletPage: Page = () => {
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState([])
  const { auth } = useAuthStore()

  useEffect(() => {
    (async function () {
      try {
        setLoading(true)
        const res = await fetch('/api/integrous/getNotifications', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
            'Content-Type': 'application/json'
          }
        })

        if (res.status === 200) {
          const data = await res.json()
          setNotifications(data)
        }
      } catch (e) {

      }
      setLoading(false)
    })()
  }, [])

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
          {
            !loading &&
              <TableNotifications notifications={notifications} />
          }
        </>
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
