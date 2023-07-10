import { useState, useEffect, useMemo } from 'react'
import { PVProgress } from './CustomCircularProgress'

export default function CustomerGlobalPool ({ data }: { data: any}) {
  const original_value = data?.revenue || 0 / (35 / 100)
  const shares = Math.floor(original_value / 200)
  const needed = 200 - Math.floor(original_value - (shares * 200))
  const percents = ((200 - needed) * 100) / 200
  const amounts = {
    shares: Math.floor(original_value / 200),
    needed: needed,
    percents: Math.floor(percents)
  }

  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl mt-4">
        <h1 className="text-lg text-gray-800 font-semibold">Customer Global Pool</h1>
        <div className="flex flex-row w-full items-center">
          <div className="flex flex-col items-center items-center w-1/2">
            <PVProgress color="#FFBE9D" transformStyle="rotate(120deg)" percentage={amounts.percents ?? 0} />
          </div>
          <div className="flex flex-col items-center w-1/2 items-center ">
            <div className='p-1'>
              <h1 className="text-base text-center pt-2">My Current Shares <strong>{amounts.shares}</strong></h1>
            </div>
            <div className='p-1'>
              <h1 className="text-base text-center pt-2"><strong>{amounts.needed}cv</strong> needed for next share</h1>
            </div>
          </div>
        </div>
        <p className="text-xs text-start text-black text-center pt-4 mx-16">
            200cv = 1 share of the Global Pool Personally sponsored Customer cv
        </p>
      </div>

    </>

  )
}
