import { useEffect, useMemo, useState } from 'react'
import { useAuthStore } from 'lib/stores'
import { GeneralModal } from 'components/page/genealogy/OldGenealogy/Modals/GeneralModal'
import { DataGrid } from '@mui/x-data-grid'

interface MonthlyMilestonesData {
  revenue: number
  customerCount: number
}

const Table = (props) => {
  const rows = useMemo(() => props.rows, [props.rows])
  const columns = useMemo(() => props.columns, [props.columns])
  return (
    <DataGrid
      rows={rows}
      autoHeight
      columns={columns}
      density="compact"
      initialState={{
        sorting: {
          sortModel: props.sortModel
        },
        pagination: { paginationModel: { pageSize: 10 } }
      }}
    />
  )
}

export default function MonthlyMilestones () {
  const { auth } = useAuthStore()
  const [data, setData] = useState<MonthlyMilestonesData>()
  const [open, setOpen] = useState(false)
  const [rows, setRows] = useState([])

  useEffect(() => {
    fetch('/api/ibo/customer/tracking', {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setData(data.data)
        setRows(data.data.customers)
      })
    })
  }, [])

  const columns = [
    { field: 'id', headerName: 'User Id', maxWidth: 90, flex: 1 },
    { field: 'orderId', headerName: 'Order Id', maxWidth: 90, flex: 1 },
    { field: 'createdAt', headerName: 'Order Date', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
    { field: 'trackingNumber', headerName: 'Tracking Number', minWidth: 270, flex: 1 },
    { field: 'revenue', headerName: 'Revenue', maxWidth: 90, flex: 1 }
  ]

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl">
        <h1 className="text-lg text-gray-800 font-semibold">Monthly Customer Tracking</h1>
        <div className="flex flex-row w-full items-center">
          <div className="flex flex-col items-center w-1/2 items-center ">
            <div>
              <p className="text-3xl text-gray-800 font-bold p-2">{data?.customerCount}</p>
            </div>
            <div>
              <p className="text-md text-gray-800 pb-6 text-center">Customers</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 items-center ">
            <div>
              <p className="text-3xl text-gray-800 font-bold p-2">${data?.revenue}</p>
            </div>
            <div>
              <p className="text-md text-gray-800 pb-6 text-center">Customer Revenue</p>
            </div>
          </div>
        </div>
        <button onClick={() => { setOpen(true) }} style={{ cursor: 'pointer' }} className="rounded-full bg-primary-500 w-full flex flex-row items-center justify-center bg-red-500 text-gray-500">
          <img className='w-1/14' src='/images/icons/order-details.svg' alt="Current profile photo" />
          <p className='text-xs text-white font-medium p-2 uppercase'>View Customers</p>
        </button>
      </div>

      <GeneralModal onClose={() => { setOpen(false) }} open={open} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>Monthly Customer Tracking List</h1>
          <Table columns={columns} rows={rows} sortModel={[{ field: 'name', sort: 'asc' }]} />
        </div>
      </GeneralModal>
    </>
  )
}
