import { useEffect, useState } from 'react'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import Link from 'next/link'

interface CountData {
  new: number;
  total: number;
}

interface MonthlySubscriptionData {
  customers: CountData;
  drivers: CountData;
  merchants: CountData;
  agents: CountData;
}

const MonthlySubscription = ({ userId }) => {
  const [data, setData] = useState<MonthlySubscriptionData>()

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getMonthlySubscription', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: userId ? { userId } : {}
      })
      setData(response.data)
    })()
  }, [])

  return (
    <>
      {
        data &&
        <div className='grid gap-4 py-6'>
          <div className='pl-5 pr-5'>
            <div className="flex pt-2">
              <h1 className="text-2xl text-black font-bold pb-2">Monthly Subscription</h1>
            </div>
          </div>
          {/* This is visible in 100% zoom */}
          <div className='pl-5 pr-5 zoom-screen-layout-hide'>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 '>
              <div className='border-b border-gray-400'></div>
              <div className='text-green-600 border-b border-gray-400'><strong><p>New</p></strong></div>
              <div><strong><p className='text-right border-b border-gray-400'>Total</p></strong></div>
            </div>
            {/* <Link href={'customer-reports'} passHref> */}
            <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>Customers</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs'>{`${data.customers.new} New Customers!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.customers.total} Total`}</p>
              </div>
            </div>
            {/* </Link> */}
            {/* <Link href={'driver-reports'} passHref> */}
            <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>Drivers</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.drivers.new} New Drivers!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.drivers.total}  Total`}</p>
              </div>
            </div>
            {/* </Link> */}
            {/* <Link href={'merchant-reports'} passHref> */}
            <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>Merchants</p></strong>
              </div>

              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.merchants.new} New Restaurants!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.merchants.total} Total`}</p>
              </div>
            </div>
            {/* </Link> */}
            {/* <Link href={'ercreferrals'} passHref> */}
            <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>ERC Agents</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.agents.new} New Agents!`} </p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.agents.total} Total`}</p>
              </div>
            </div>
            {/* </Link> */}
          </div>
        </div>
      }

    </>
  )
}

export default MonthlySubscription
