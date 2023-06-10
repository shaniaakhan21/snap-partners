import { useState, useEffect } from 'react'
import { PVProgress } from './CustomCircularProgress'
import { useAuthStore } from 'lib/stores'

export interface PersonalVolumeInfo {
  pvValue: number,
  pvPercentage: number,
  leftQV: number,
  rightQV: number
}

export default function PVComponent () {
  const { auth } = useAuthStore()
  const [data, setData] = useState<PersonalVolumeInfo>()

  useEffect(() => {
    fetch('/api/ibo/personal/pvInfo', {
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
        <h1 className="text-lg text-gray-800 font-semibold ">Personal Volume (pv)</h1>
        <div className="p-0 flex flex-row items-start">
          <div className="flex flex-col items-center w-1/2 h-3/5">
            <div>
              <p className="text-xs text-textAcent-500">View Order History</p>
            </div>
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
        <h1 className="text-lg text-gray-800 font-semibold text-center">Left Leg QV:{data?.leftQV} {"---"} Right Leg QV:{data?.rightQV}</h1>
      </div>
    </>
  )
}
