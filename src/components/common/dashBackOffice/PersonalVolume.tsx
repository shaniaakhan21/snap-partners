import { useState, useEffect } from 'react'
import { PVProgress } from './CustomCircularProgress'
import { pvData } from './MockMilestones'

interface PvInterface {
  pvPercentage: number;
  pvNumber: string;
}

export default function PVComponent () {
  const [data, setData] = useState<PvInterface[]>([])

  useEffect(() => {
    const details = pvData
    setData(details)
  }, [])

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 h-fit bg-white rounded-xl">
        <h1 className="text-lg text-gray-800 font-semibold ">Personale Volume (pv)</h1>
        <div className="p-0 flex flex-row items-start">
          <div className="flex flex-col items-center w-1/2 h-3/5">
            <div>
              <p className="text-xs text-textAcent-500">View Order History</p>
            </div>
            <div className="ml-0">
              <PVProgress color="#82B254" transformStyle="rotate(120deg)" data={data} />
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 items-center">
            {data.map((item) => (
              <div key={item.pvNumber}>
                <p className="text-3xl text-gray-800 font-bold p-2">{item.pvNumber}</p>
              </div>
            ))}
            <div>
              <p className="text-xs text-gray-800 pb-6">Active= 100pv/month</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
