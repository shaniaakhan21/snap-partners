import { useEffect, useMemo, useRef, useState } from 'react'
import { PVProgress } from './CustomCircularProgress'
import { PersonalVolumeInfo } from 'pages/backOfficeDashboard'
import { GeneralModal } from 'components/page/genealogy/OldGenealogy/Modals/GeneralModal'
import { DataGrid } from '@mui/x-data-grid'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

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

export default function PVComponentSnap ({ userId }) {
  const [open, setOpen] = useState(false)
  const [data, setData] = useState(undefined)
  const [mainDivHeight, setMainDivHeight] = useState(0)
  const showDivRef = useRef(null)

  useEffect(() => {
    const calculateHeight = () => {
      if (showDivRef.current) {
        setMainDivHeight(showDivRef.current.offsetHeight)
      }
    }

    const resizeObserver = new ResizeObserver(calculateHeight)
    resizeObserver.observe(showDivRef.current)

    return () => {
      resizeObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/snap/WellnessWidget', {
        params: userId ? { userId } : {},
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setData(response.data)
    })()
  }, [])

  const columns = [
    { field: 'id', headerName: 'Order Id', maxWidth: 90, flex: 1 },
    { field: 'userId', headerName: 'User Id', maxWidth: 90, flex: 1 },
    { field: 'createdAt', headerName: 'Order Date', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
    { field: 'trackingNumber', headerName: 'Tracking Number', minWidth: 270, flex: 1 },
    { field: 'cv', headerName: 'PV', maxWidth: 90, flex: 1 },
    { field: 'subtotal', headerName: 'Order Total', maxWidth: 90, flex: 1 }
  ]

  return (
    <>
      <div ref={showDivRef} className="mainDiv w-full max-w-full py-4 px-6 space-y-2 h-full rounded-3xl shadow-xl flex flex-col justify-around" style={{ background: 'linear-gradient(231deg, #E74426 2.25%, #BD3F27 92.77%)' }}>
        <h1 className="text-base lg:text-lg text-white font-semibold ">Your Store Orders</h1>
        <div>
          <p className="text-xs lg:text-sm text-white font-normal ">Use this widget to track your personal store orders and to compare your stores monthly growth.</p>
        </div>
        <div className='flex flex-row w-full'>
          <div className='flex flex-col w-full'>
            <div className='mt-18'>
              <button onClick={() => { setOpen(true) }} style={{ cursor: 'pointer' }} className="rounded-full bg-none w-full lg:w-8/12 flex flex-row items-center justify-center text-white border-[2px] border-white">
                <p className='text-xs lg:text-sm text-white font-medium p-1 uppercase'>Order History</p>
              </button>
            </div>
            <div className='flex flex-row items-center py-4'>
              <h1 className="text-[10px] lg:text-xs  text-white font-medium ">Current Month PCV</h1><p className="text-xl text-white font-bold p-2">{data?.cv || 0}</p>
            </div>
          </div>
          <div className='w-6/12'>
            <img className='w-full' src='/static/grph.png' alt="graph" />
          </div>
        </div>
      </div>

      <GeneralModal onClose={() => { setOpen(false) }} open={open} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>All Time Order List</h1>
          <Table columns={columns} rows={data?.orders} sortModel={[{ field: 'createdAt', sort: 'desc' }]} />
        </div>
      </GeneralModal>
    </>
  )
}