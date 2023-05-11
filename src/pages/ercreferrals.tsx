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
  { name: 'id', header: 'ID', defaultFlex: 1, minWidth: 60 },
  { name: 'createdAtUs', header: 'Signup Date', defaultFlex: 1, minWidth: 130 },
  { name: 'business_name', header: 'Company', defaultFlex: 1, minWidth: 110 },
  { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 85 },
  { name: 'email', header: 'Email', defaultFlex: 1, minWidth: 85 },
  { name: 'phone', header: 'Phone', defaultFlex: 1, minWidth: 90 },
  { name: 'signedAgreement', header: 'Signed Agreement', flex: 1, minWidth: 120 },
  { name: 'depositPaid', header: 'Deposit Paid', flex: 1, minWidth: 110 },
  { name: 'docCollection', header: 'Doc Collection', flex: 1, minWidth: 110 },
  { name: 'excelTeam', header: 'Excel Team', flex: 1, minWidth: 110 },
  { name: 'docsSentForSignature', header: 'Docs Sent For Signature', flex: 1, minWidth: 110 },
  { name: 'docsSentForSignatureDateUs', header: 'Docs Sent For Signature Date', flex: 1, minWidth: 110 },
  { name: 'filledWithIRS', header: 'Filed with IRS?', flex: 1, minWidth: 110 },
  { name: 'filledWithIRSDateUs', header: 'Filed with IRS Date', flex: 1, minWidth: 110 },
  { name: 'paid', header: 'Paid', flex: 1, minWidth: 80 },
  { name: 'paidDateUs', header: 'Paid Date', flex: 1, minWidth: 120 },
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
  { name: 'docsSentForSignatures', header: '# Docs Sent for Signature', flex: 1, minWidth: 220 },
  { name: 'filleds', header: '# Filed', flex: 1, minWidth: 130 },
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
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth()) // 0-11
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear())

  const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

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
        const res = await fetch(`/api/erc/getTableClients?month=${monthSelected + 1}&year=${yearSelected}`, {
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

      <div id="cro-erc-process">
        <img src="https://snapdeliveredteam.com/images/j-logo.png" />
        <div>
          <h1>The ERC Process has 3 Phases</h1>
          <div>
            <ul>
              <li>Phase 1</li>
              <li>New Client</li>
            </ul>
            <ul>
              <li>Phase 2</li>
              <li> Jorns Filling Work</li>
            </ul>
            <ul>
              <li>Phase 3</li>
              <li>IRS Payment</li>
            </ul>
          </div>
        </div>
      </div>

      <div id="table1erc">
        <TableTransactions transactions={transactions} />
      </div>
      <br /><br />
      <span className='text-2xl font-bold'>Your Team Clients</span>

      <select
        id='legalType'
        name='legalType'
        className='ml-5 cursor-pointer relative xs:mr-2 pl-2 pr-12 py-0 xs:py-1 my-2 bg-[rgba(255,255,255,.13)] rounded-md border border-solid border-black outline-none appearance-none leading-8'
        placeholder='User Rank'
        onChange={(current) => { setMonthSelected(parseInt(current.target.value)) }}
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
        onChange={(current) => { setYearSelected(parseInt(current.target.value)) }}
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
