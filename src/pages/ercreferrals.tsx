import Head from 'next/head'
import { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { getLocalStorage } from 'lib/utils/localStorage'
import DashboardLayout from 'layouts/private/Dashboard'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { ITransaction } from 'lib/types/transaction'
import { useEffect, useState } from 'react'

const { SEO } = APP_INFO

const columns = [
  { name: 'id', header: 'Registration ID', defaultFlex: 1 },
  { name: 'business_name', header: 'Company Name', defaultFlex: 1 },
  { name: 'name', header: 'Contact', defaultFlex: 1 },
  { name: 'email', header: 'Email', defaultFlex: 1 },
  { name: 'phone', header: 'Phone', defaultFlex: 1 },
  { name: 'createdAtUs', header: 'Registered', defaultFlex: 1 }
]

const gridStyle = { minHeight: 550 }

const filterValue = [
  { name: 'description', operator: 'startsWith', type: 'string', value: '' },
  { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
]

interface ITableTransactionsProps {
  transactions: ITransaction[]
}

export const TableTransactions = ({ transactions }: ITableTransactionsProps) => {
  return (
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

const ErcreferralsPage: Page = () => {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    (async function () {
      try {
        const token = getLocalStorage('accessToken')

        const res = await fetch('/api/erc/getTable', {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        })

        const data = await res.json()

        setTransactions(data)
      } catch (e) {

      }
    })()
  }, [])

  return (
    <TableTransactions transactions={transactions} />
  )
}

ErcreferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - ERC Referrals</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ErcreferralsPage
