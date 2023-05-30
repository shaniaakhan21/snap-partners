import { useState, useEffect } from 'react'
import { PVProgress } from './CustomCircularProgress'
import { rtData, globalPool } from './MockMilestones'

interface PvInterface {
  rtPercentage: number
  rtNumber: string
}

interface globalPoolInterface {
  value: number
}

export default function CustomerGlobalPool () {
  const [data, setData] = useState<PvInterface[]>([])
  const [poolData, setPoolData] = useState<globalPoolInterface[]>([])

  useEffect(() => {
    setData(rtData as unknown as PvInterface[])
    setPoolData(globalPool as unknown as globalPoolInterface[])
  }, [])
  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl mt-4">
        <h1 className="text-lg text-gray-800 font-semibold">Customer Global Pool</h1>
        <div className="flex flex-row w-full items-center">
          <div className="flex flex-col items-center items-center w-1/2">
            <PVProgress color="#FFBE9D" transformStyle="rotate(120deg)" data={data} />
          </div>
          <div className="flex flex-col items-center w-1/2 items-center ">
            {poolData.map(item => (
              <div className='p-3'>
                <h1 className="text-base text-center pt-2">Current Monthly Customer cv</h1>
                <p className="text-4xl text-black font-bold p-2 text-center">{item.value} cv</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-start text-black text-center pt-4 mx-16">
            200cv= 1 share of the Global Pool Personally sponsored Customer cv
        </p>
      </div>

    </>
  )
}
