import CustomCardWeeklyBinary from '../CustomCardWeeklyBinary'
import { useAuthStore } from 'lib/stores'
import { useEffect, useState } from 'react'
import TotalLeg from './TotalLegComp'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { makeStyles } from '@material-ui/core'

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
  amount: number
}

const useStyles = makeStyles({
  dropdown: {
    height: '25px',
    width: '180px'
  }
})

export default function WeeklyBinary () {
  const { auth } = useAuthStore()
  const [data, setData] = useState<WeeklyBinaryData>()
  const [week, setWeek] = useState(null)
  const classes = useStyles()

  useEffect(() => {
    if (week) {
      fetch(`/api/ibo/personal/weeklyBinary?weekNumber=${week}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${auth.accessToken}` }
      }).then((response) => {
        response.json().then((data) => {
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
          <h1 className="text-base text-gray-800 font-medium text-center">{data?.cycles} Current Cycles</h1>
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
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
