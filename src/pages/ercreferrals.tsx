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
  { name: 'id', header: 'Registration ID', defaultFlex: 1, minWidth: 150 },
  { name: 'createdAtUs', header: 'Signup Date', defaultFlex: 1, minWidth: 150 },
  { name: 'business_name', header: 'Company Name', defaultFlex: 1, minWidth: 220 },
  { name: 'email', header: 'Email', defaultFlex: 1, minWidth: 150 },
  { name: 'phone', header: 'Phone', defaultFlex: 1, minWidth: 150 },
  { name: 'signedAgreement', header: 'Signed Agreement', flex: 1, minWidth: 220 },
  { name: 'depositPaid', header: 'Deposit Paid', flex: 1, minWidth: 130 },
  { name: 'docCollection', header: 'Doc Collection', flex: 1, minWidth: 130 },
  { name: 'excelTeam', header: 'Excel Team', flex: 1, minWidth: 130 },
  { name: 'qualificationTeam', header: 'Qualification Team', flex: 1, minWidth: 220 },
  { name: 'docsSentForSignature', header: 'Docs Sent For Signature', flex: 1, minWidth: 220 },
  { name: 'docsSentForSignatureDateUs', header: 'Docs Sent For Signature Date', flex: 1, minWidth: 250 },
  { name: 'filledWithIRS', header: 'Filled with IRS?', flex: 1, minWidth: 130 },
  { name: 'filledWithIRSDateUs', header: 'Filled with IRS Date', flex: 1, minWidth: 180 },
  { name: 'paid', header: 'Paid', flex: 1, minWidth: 130 },
  { name: 'paidDateUs', header: 'Paid Date', flex: 1, minWidth: 130 },
  { name: 'commission', header: 'Commision', flex: 1, minWidth: 130 }
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
    <>
      <span className='text-2xl font-bold'>Your Personal Clients</span> <br /><br />
      <TableTransactions transactions={transactions} />
      <br /><br />
      <span className='text-2xl font-bold'>Your Team Clients</span> <br /><br />
      <div className='text-center'>
        <span className='text-2xl'>COMING SOON</span>
      </div>
    </>
  )
}

ErcreferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - ERC Reporting</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ErcreferralsPage
