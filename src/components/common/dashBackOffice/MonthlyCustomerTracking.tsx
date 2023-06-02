import { useEffect, useState } from 'react'
import { useAuthStore } from 'lib/stores'

interface MonthlyMilestonesData {
  revenue: number
  customerCount: number
}

export default function MonthlyMilestones () {
  const { auth } = useAuthStore()
  const [data, setData] = useState<MonthlyMilestonesData>()

  useEffect(() => {
    fetch(`/api/ibo/customer/tracking/${auth.id}`, {
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
      <div className="w-full max-w-full p-4 space-y-2 bg-white rounded-xl">
        <h1 className="text-lg text-gray-800 font-semibold">Monthly Customer Tracking</h1>
        <div className="flex flex-row w-full items-center">
          <div className="flex flex-col items-center w-1/2 items-center ">
            <div>
              <p className="text-3xl text-gray-800 font-bold p-2">{data?.customerCount}</p>
            </div>
            <div>
              <p className="text-md text-gray-800 pb-6 text-center">Customers</p>
            </div>
          </div>
          <div className="flex flex-col items-center w-1/2 items-center ">
            <div>
              <p className="text-3xl text-gray-800 font-bold p-2" style={{ marginTop: '-50px' }}>${data?.revenue}</p>
            </div>
          </div>
        </div>
        <button className="rounded-full bg-primary-500 w-full flex flex-row items-center justify-center bg-gray-300 text-gray-500 cursor-not-allowed" disabled>
          <img className='w-1/14' src='/images/icons/order-details.svg' alt="Current profile photo" />
          <p className='text-xs text-white font-medium p-2 uppercase'>View Orders (Coming Soon)</p>
        </button>
      </div>

    </>
  )
}
