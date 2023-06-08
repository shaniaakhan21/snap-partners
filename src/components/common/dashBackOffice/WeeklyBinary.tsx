import CustomCardWeeklyBinary from '../CustomCardWeeklyBinary'
import { useAuthStore } from 'lib/stores'
import { useEffect, useState } from 'react'
import TotalLeg from './TotalLegComp'

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

export default function WeeklyBinary () {
  const { auth } = useAuthStore()
  const [data, setData] = useState<WeeklyBinaryData>()

  useEffect(() => {
    fetch('/api/ibo/personal/weeklyBinary', {
      method: 'GET',
      headers: { Authorization: `Bearer ${auth.accessToken}` }
    }).then((response) => {
      response.json().then((data) => {
        setData(data.data)
      })
    })
  }, [])

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 h-fit bg-white rounded-xl">
        <div className="flex flex-row justify-between items-center">
          <div>
            <h1 className="text-lg text-gray-800 font-semibold">Weekly Binary</h1>
          </div>
          <div>
            <p className="text-xs text-textAcent-500">View Requirements</p>
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
        </div>
      </div>
    </>
  )
}
