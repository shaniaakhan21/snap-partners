import { useEffect, useState } from 'react'
import Image from 'next/image'
import ServeImage from '../../../../public/images/subscription_serve.svg'
import { monthlySubscriptionData } from './mock'
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

const MonthlySubscription = () => {
  const [data, setData] = useState<MonthlySubscriptionData>()

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getMonthlySubscription', {
        headers: {
          Authorization: `Bearer ${token}`
        }
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
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
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
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
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
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
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
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
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
          </div>
          {/* This is visible above 100% zoom */}
          <div className='pl-5 pr-5 zoom-screen-layout-show hidden'>
            <div className='grid grid-cols-1 '>
              <div className='border-gray-400'></div>
              <div className='text-green-600 border-gray-400'><strong><p>New</p></strong></div>
              <div><strong><p className='border-gray-400'>Total</p></strong></div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>Customers</p></strong>
              </div>
              <div>
                <Link href={'customer-reports'}>
                  <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
                </Link>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.customers.new} New Customers!`}</p></strong>
              </div>
              <div>
                <p className='text-xs '>{`${data.customers.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>Drivers</p></strong>
              </div>
              <div>
                <Link href={'driver-reports'}>
                  <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
                </Link>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.drivers.new} New Drivers!`}</p></strong>
              </div>
              <div>
                <p className='text-xs '>{`${data.drivers.total}  Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>Merchants</p></strong>
              </div>
              <div>
                <Link href={'merchant-reports'}>
                  <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
                </Link>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.merchants.new} New Restaurants!`}</p></strong>
              </div>
              <div>
                <p className='text-xs '>{`${data.merchants.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>ERC Agents</p></strong>
              </div>
              <div>
                <Link href={'ercreferrals'}>
                  <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
                </Link>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.agents.new} New Agents!`} </p></strong>
              </div>
              <div>
                <p className='text-xs '>{`${data.agents.total} Total`}</p>
              </div>
            </div>
          </div>
        </div>
      }
      <style jsx>
        {`
          @media only screen and (min-resolution: 105dpi) and (max-resolution: 210dpi) {
            /* Adjust the layout for zoom levels between 110% to 210% */
            .zoom-screen-layout-hide {
              display: none;
            }
            .zoom-screen-layout-show {
              display: block;
            }
          }
        `}
      </style>
    </>
  )
}

export default MonthlySubscription
