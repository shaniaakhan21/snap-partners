import CustomCardWeeklyBinary from '../CustomCardWeeklyBinary'
import { useAuthStore } from 'lib/stores'
import { useEffect, useMemo, useState } from 'react'
import TotalLeg from './TotalLegComp'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { makeStyles } from '@material-ui/core'
import { DataGrid } from '@mui/x-data-grid'
import { GeneralModal } from 'components/page/genealogy/OldGenealogy/Modals/GeneralModal'

interface WeeklyBinaryData {
  leftLeg: {
      legVal: number,
      rollOver: number,
      total: number
  },
  rightLeg: {
      legVal: number,
      rollOver: number,
      total: number
  },
  cycles: number,
  leftLegUsableVol: {
      value: number
  },
  rightLegUsableVol: {
      value: number
  },
  amount: number,
  tableData: any
}

const useStyles = makeStyles({
  dropdown: {
    height: '25px',
    width: '180px'
  }
})

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
        columns: {
          columnVisibilityModel: {
            id: false
          }
        },
        sorting: {
          sortModel: props.sortModel
        },
        pagination: { paginationModel: { pageSize: 10 } }
      }}
    />
  )
}

export default function WeeklyBinary () {
  const { auth } = useAuthStore()
  const [data, setData] = useState<WeeklyBinaryData>()
  const [week, setWeek] = useState(null)
  const [noSnapshotfound, setNoSnapshotFound] = useState(false)
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  useEffect(() => {
    setNoSnapshotFound(false)
    if (week) {
      fetch(`/api/ibo/personal/weeklyBinary?weekNumber=${week}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      }).then((response) => {
        response.json().then((data) => {
          if (data.data === 'no snapshot found') {
            setNoSnapshotFound(true)
          }
          setData(data.data)
        })
      })
    } else {
      fetch('/api/ibo/personal/weeklyBinary', {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      }).then((response) => {
        response.json().then((data) => {
          setData(data.data)
        })
      })
    }
  }, [week])

  const timingStatusTracker = (event) => {
    setWeek(event.target.value)
  }

  const columns = [
    { field: 'id', headerName: 'Point Id', maxWidth: 90, flex: 1, hide: true, sortable: false },
    { field: 'description', headerName: 'Description', minWidth: 150, flex: 1, sortable: false },
    { field: 'left', headerName: 'left', maxWidth: 90, flex: 1, sortable: false },
    { field: 'right', headerName: 'right', maxWidth: 90, flex: 1, sortable: false },
    { field: 'createdAt', headerName: 'Date', minWidth: 270, flex: 1, headerAlign: 'center', align: 'center', sortable: false }
  ]

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 h-fit bg-white rounded-xl">
        <div className="flex flex-row justify-between">
          <div>
            <h1 className="text-lg text-gray-800 font-semibold">Weekly Binary</h1>
          </div>
          <div>
            <div>
              <p className="text-xs text-textAcent-500 pt-5">View Requirements</p>
            </div>
            <div className='pt-4'>
              <Select onChange={(e) => timingStatusTracker(e)} className={classes.dropdown}>
                <MenuItem value="">None</MenuItem>
                {
                  Array.from({ length: 10 }).map((item, index) => (
                    <MenuItem value={index + 1}>{index + 1} Week ago</MenuItem>
                  ))
                }
              </Select>
            </div>
          </div>
        </div>
        {
          <div className="flex flex-row">
            <CustomCardWeeklyBinary legName={'LEFT LEG'} legCVvalue={data?.leftLeg?.legVal} rollovervalue={data?.leftLeg?.rollOver} totalValue={data?.leftLeg?.total} />
            <CustomCardWeeklyBinary legName={'RIGHT LEG'} legCVvalue={data?.rightLeg?.legVal} rollovervalue={data?.rightLeg?.rollOver} totalValue={data?.rightLeg?.total} />
          </div>
        }
        <div>
          {
            !week && <h1 className="text-base text-gray-800 font-medium text-center">{data?.cycles} Current Cycles</h1>
          }
          {
            week && <h1 className="text-base text-gray-800 font-medium text-center">{data?.cycles} cycles {week} week(s) ago</h1>
          }
          <div className="flex flex-row align-start w-full p-1">
            <div className="flex flex-col w-2/3">
              <TotalLeg legValue={data?.leftLegUsableVol?.value} legVLabel={'LEFT LEG Usable Volume'} />
              <TotalLeg legValue={data?.rightLegUsableVol?.value} legVLabel={'RIGHT LEG Usable Volume'} />
            </div>
            <div className='w-1/2 pt-4'>
              <p className="text-3xl text-black-800 font-bold p-2">$ {data?.amount}</p>
            </div>
          </div>
          <div className='flex flex-row justify-center items-center w-full p-1'>
            <div className='flex flex-col'>
              <p className="text-black-100 p-2">Settles Every Monday at 12:01AM Pacific</p>
              {
                noSnapshotfound && <p className="text-black-100 p-2 text-red-500">Could not find binary data for this week</p>
              }
            </div>
          </div>
          <button onClick={() => { setOpen(true) }} style={{ cursor: 'pointer' }} className="rounded-full bg-primary-500 w-full flex flex-row items-center justify-center bg-red-500 text-gray-500">
            <img className='w-1/14' src='/images/icons/order-details.svg' alt="Current profile photo" />
            <p className='text-xs text-white font-medium p-2 uppercase'>View Binary Points History</p>
          </button>
        </div>
      </div>

      <GeneralModal onClose={() => { setOpen(false) }} open={open} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>Binary Points History</h1>
          <Table columns={columns} rows={data?.tableData || [] } sortModel={[{ field: 'name', sort: 'asc' }]} />
        </div>
      </GeneralModal>
    </>
  )
}
