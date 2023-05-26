import { useEffect, useState } from 'react'
import { customerTracking } from './MockMilestones'

interface customerInterface {
  customers: number
  value: number
}

export default function MonthlyMilestones () {
  const [data, setData] = useState<customerInterface[]>([])

  useEffect(() => {
    setData(customerTracking as unknown as customerInterface[])
  }, [])
  return (
    <>
      <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl">
        <h1 className="text-lg text-gray-800 font-semibold">Monthly Customer Tracking</h1>
        {data.map(item => (
          <div className="flex flex-row w-full items-center">
            <div className="flex flex-col items-center w-1/2 items-center ">
              <div>
                <p className="text-3xl text-gray-800 font-bold p-2">{item.customers}</p>
              </div>
              <div>
                <p className="text-md text-gray-800 pb-6 text-center">Customers</p>
              </div>
            </div>
            <div className="flex flex-col items-center w-1/2 items-center ">
              <div>
                <p className="text-3xl text-gray-800 font-bold p-2">${item.value}</p>
              </div>
            </div>
          </div>
        ))}
        <button className="rounded-full bg-primary-500 w-full flex flex-row items-center justify-center ">
          <img className='w-1/14' src='/images/icons/order-details.svg' alt="Current profile photo" />
          <p className='text-xs text-white font-medium p-2 uppercase'>View Orders</p>
        </button>
      </div>

    </>
  )
}
