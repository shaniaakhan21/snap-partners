import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { DataGrid, GridSortModel } from '@mui/x-data-grid'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers-pro'
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker'
import dayjs, { Dayjs } from 'dayjs'
import { Spinner } from 'components/common/loaders'

import DashboardLayout from 'layouts/private/Dashboard'
import { useMemo, useState, useEffect } from 'react'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'

const { SEO } = APP_INFO

const Table = (props) => {
  const rows = useMemo(() => props.rows, [props.rows])
  const columns = useMemo(() => props.columns, [props.columns])
  console.log(rows)
  return (
    <DataGrid
      rows={rows}
      autoHeight
      columns={columns}
      density="compact"
      hideFooter={true}
      getRowClassName={(params) => 'mui-table-bg-row'}
    />
  )
}

const Table2 = (props) => {
  const rows = useMemo(() => props.rows, [props.rows])
  const columns = useMemo(() => props.columns, [props.columns])
  return (
    <DataGrid
      rows={rows}
      autoHeight
      columns={columns}
      density="compact"
      getRowClassName={(params) => 'mui-table-bg-row'}
    />
  )
}

const ComingSoon: PageNext = () => {
  const [dateRange, setDateRange] = useState([null, null])
  const [rowsOrdersList, setRowsOrdersList] = useState([])
  const [loading, setLoading] = useState(false)
  const [rowsOrdersSummary, setRowsOrdersSummary] = useState([])
  const [buttonDisabled, setbuttonDisabled] = useState(true)

  const columns = [
    { field: 'orders', headerName: 'Deliveries', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 },
  ]

  const columns2 = [
    { field: 'id', headerName: 'Order Id', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 },
    { field: 'date', headerName: 'Date', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 },
    { field: 'customerName', headerName: 'User Name', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 },
    { field: 'city', headerName: 'City', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 },
    { field: 'state', headerName: 'State', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 },
    { field: 'level', headerName: 'Depth in Network', align: 'center', headerClassName: 'mui-table-bg-header', minWidth: 130, flex: 1 }
  ]

  useEffect(() => {
    (async () => {
      const [startDate, endDate] = dateRange as Dayjs[]
      if (startDate === null || endDate === null) {
        setbuttonDisabled(true)
      } else {
        setbuttonDisabled(false)
      }
    })()
  }, [dateRange])

  const handleDateChange = async () => {
    const [startDate, endDate] = dateRange as Dayjs[]
    setLoading(true)
    setbuttonDisabled(true)
    const from = startDate.format('YYYY-MM-DD')
    const to = endDate.format('YYYY-MM-DD')

    const token = getLocalStorage('accessToken')
    const response = await axios.get('/api/reports/getReport', {
      params: { from, to, type: 'driver' },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setRowsOrdersList(response.data.ordersList)
    setRowsOrdersSummary(response.data.ordersSummary)
    setLoading(false)
    setbuttonDisabled(false)
  }

  let stylesButtonEnabled = 'text-white bg-primary-500'
  if (buttonDisabled) {
    stylesButtonEnabled = 'text-white bg-gray-400'
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-10">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              localeText={{ start: 'From', end: 'To' }}
              onChange={(newDateRange) => setDateRange(newDateRange)}
            />
          </LocalizationProvider>
        </div>
        <div className="col-span-2 flex items-center">
          <button disabled={buttonDisabled} onClick={() => { handleDateChange() }} className={`uppercase ${stylesButtonEnabled} px-4 py-1.5 rounded-full font-semibold hover:opacity-80`}>
              Search Report
          </button>
        </div>
      </div>

      {(loading)
        ? <div className='w-full h-screen flex justify-center items-center'>
          <Spinner />
        </div>
        : <>
          <br />
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <h1 style={{ fontWeight: 'bold' }}>Total Deliveries on my team</h1>
              <br/>
              <Table columns={columns} rows={rowsOrdersSummary}/>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="col-span-1">
              <br/>
              <h1 style={{ fontWeight: 'bold' }}>Orders List</h1>
              <br/>
              <Table2 columns={columns2} rows={rowsOrdersList}/>
            </div>
          </div>
        </>
      }

    </>
  )
}

ComingSoon.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Customer Reports</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ComingSoon
