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
  { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 220 },
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

const columnsClient = [
  { name: 'level', header: 'Level', defaultFlex: 1, minWidth: 150 },
  { name: 'totalClients', header: 'Total Clients', defaultFlex: 1, minWidth: 150 },
  { name: 'registereds', header: '# Registered', defaultFlex: 1, minWidth: 150 },
  { name: 'signedAgreements', header: '# Signed Agreements', defaultFlex: 1, minWidth: 220 },
  { name: 'depositPaids', header: '# Deposits Paid', defaultFlex: 1, minWidth: 150 },
  { name: 'docCollections', header: '# Doc Collections', defaultFlex: 1, minWidth: 150 },
  { name: 'excelTeams', header: '# Excel Teams', flex: 1, minWidth: 200 },
  { name: 'qualificationTeams', header: '# Qualification Teams', flex: 1, minWidth: 200 },
  { name: 'docsSentForSignatures', header: '# Docs Sent for Signature', flex: 1, minWidth: 220 },
  { name: 'filleds', header: '# Filled', flex: 1, minWidth: 130 },
  { name: 'paids', header: '# Paid?', flex: 1, minWidth: 220 },
  { name: 'totalCommissions', header: 'Total Commission', flex: 1, minWidth: 220 }
]

export const TableClientTransactions = ({ transactions }: ITableTransactionsProps) => {
  return (
    <ReactDataGrid
      idProperty="id"
      columns={columnsClient}
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
  const [transactionsClient, setTransactionsClient] = useState([])
  const [monthSelected, setMonthSelected] = useState(String(new Date().getMonth()))
  const [yearSelected, setYearSelected] = useState(String(new Date().getFullYear()))

  const month = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }

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

  useEffect(() => {
    (async function () {
      try {
        const token = getLocalStorage('accessToken')

        const res = await fetch(`/api/erc/getTableClients?month=${monthSelected}&year=${yearSelected}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        })

        const data = await res.json()

        setTransactionsClient(data)
      } catch (e) {

      }
    })()
  }, [monthSelected, yearSelected])

  return (
    <>
      <span className='text-2xl font-bold'>Your Personal Clients</span> <br /><br />
      <TableTransactions transactions={transactions} />
      <br /><br />
      <span className='text-2xl font-bold'>Your Team Clients</span>

      <select
        id='legalType'
        name='legalType'
        className='ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
        placeholder='User Rank'
        onChange={(current) => { setMonthSelected(current.target.value) }}
      >
        {month.map((m, i) => {
          return (
            <option key={i} selected={(new Date().getMonth() === i)} value={i}>
              {m}
            </option>
          )
        })
        }
      </select>

      <select
        id='legalType'
        name='legalType'
        className='ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
        placeholder='User Rank'
        onChange={(current) => { setYearSelected(current.target.value) }}
      >
        {years.map((y, i) => {
          return (
            <option key={i} selected={(new Date().getFullYear() === y)} value={y}>
              {y}
            </option>
          )
        })
        }
      </select>

      <br /><br />
      <div className='text-center'>
        <TableClientTransactions transactions={transactionsClient} />
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
