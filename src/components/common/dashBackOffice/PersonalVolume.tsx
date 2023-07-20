import { useMemo, useState } from 'react'
import { PVProgress } from './CustomCircularProgress'
import { PersonalVolumeInfo } from 'pages/backOfficeDashboard'
import { GeneralModal } from 'components/page/genealogy/OldGenealogy/Modals/GeneralModal'
import { DataGrid } from '@mui/x-data-grid'

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

export default function PVComponent ({ data }: {data: PersonalVolumeInfo}) {
  const [open, setOpen] = useState(false)

  const columns = [
    { field: 'id', headerName: 'Order Id', maxWidth: 90, flex: 1 },
    { field: 'userId', headerName: 'User Id', maxWidth: 90, flex: 1 },
    { field: 'createdAt', headerName: 'Order Date', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
    { field: 'trackingNumber', headerName: 'Tracking Number', minWidth: 270, flex: 1 },
    { field: 'subtotal', headerName: 'Order Total', maxWidth: 90, flex: 1 }
  ]

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 h-fit bg-white rounded-xl">
        <h1 className="text-lg text-gray-800 font-semibold ">Personal Volume (pv)</h1>
        <div className="p-0 flex flex-row items-start">
          <div className="flex flex-col items-center w-1/2 h-3/5">
            <button onClick={() => { setOpen(true) }} style={{ cursor: 'pointer' }} className="rounded-full bg-primary-500 w-full flex flex-row items-center justify-center bg-red-500 text-gray-500">
              <img className='w-1/14' src='/images/icons/order-details.svg' alt="Current profile photo" />
              <p className='text-xs text-white font-medium p-2 uppercase'>Order History</p>
            </button>
            <div className="ml-0">
              <PVProgress color="#82B254" transformStyle="rotate(120deg)" percentage={data?.pvPercentage} />
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 items-center">
            <div>
              <p className="text-3xl text-gray-800 font-bold p-2">{data?.pvValue}</p>
            </div>
            <div>
              <p className="text-xs text-gray-800 pb-6">Active= 100pv/month</p>
            </div>
          </div>
        </div>
        <h1 className="text-lg text-gray-800 font-semibold text-center">Monthly QV Tracking</h1>
        <h1 className="text-lg text-gray-800 font-semibold text-center">Left Leg QV:{data?.leftQV} {'---'} Right Leg QV:{data?.rightQV}</h1>
      </div>

      <GeneralModal onClose={() => { setOpen(false) }} open={open} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>Monthly Order List</h1>
          <Table columns={columns} rows={data?.customers} sortModel={[{ field: 'name', sort: 'asc' }]} />
        </div>
      </GeneralModal>
    </>
  )
}
