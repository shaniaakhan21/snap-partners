import { useEffect, useState } from 'react'
import Image from 'next/image'
import ServeImage from '../../../../public/images/subscription_serve.svg'
import { monthlySubscriptionData } from './mock'

interface CountData {
  new: number;
  total: number;
}

interface MonthlySubscriptionData {
  customers: CountData;
  drivers: CountData;
  merchants: CountData;
  vidgo: CountData;
  erc: CountData;
}

const MonthlySubscription = () => {
  const [data, setData] = useState<MonthlySubscriptionData>()

  useEffect(() => {
    const details = monthlySubscriptionData as MonthlySubscriptionData
    setData(details)
  }, [])

  return (
    <>
      {
        data &&
        <div className='grid gap-4 py-6'>
          <div className='pl-5 pr-5'>
            <div className="flex pt-2">
              <div className="text-left text-10">
                <Image src={ServeImage} alt="monthly subscription" width={100} height={100} />
              </div>
              <div className="text-left text-10">
                <h1 className="text-2xl text-black font-bold pb-2 pl-5">Monthly</h1>
                <h1 className="text-2xl text-black font-bold pb-2 pl-5">Subscription</h1>
              </div>
            </div>
          </div>
          <div className='pl-5 pr-5'>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2'>
              <div></div>
              <div></div>
              <div className='text-green-600 text-right'><strong><p>New</p></strong></div>
              <div><strong><p className='text-right'>Total</p></strong></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
              <div>
                <strong><u><p className='text-xs'>Customers</p></u></strong>
              </div>
              <div>
                <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs text-right'>{`${data.customers.new} New Customers!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.customers.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
              <div>
                <strong><u><p className='text-xs'>Drivers</p></u></strong>
              </div>
              <div>
                <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs text-right'>{`${data.drivers.new} New Drivers!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.drivers.total}  Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
              <div>
                <strong><u><p className='text-xs'>Merchants</p></u></strong>
              </div>
              <div>
                <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs text-right'>{`${data.merchants.new} New Restaurants!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.merchants.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
              <div>
                <strong><u><p className='text-xs'>VIDGO</p></u></strong>
              </div>
              <div>
                <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs text-right'>{`${data.vidgo.new} New Agents!`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.vidgo.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
              <div>
                <strong><u><p className='text-xs'>ERC Agents</p></u></strong>
              </div>
              <div>
                <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs text-right'>{`${data.erc.new} New Agents!`} </p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.erc.total} Total`}</p>
              </div>
            </div>
          </div>
          <div className='pl-5 pr-5'>
            <button className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold h-10 w-full py-3 px-4 rounded-l-full rounded-r-full">SEE REPORT</button>
          </div>
        </div>
      }
    </>
  )
}

export default MonthlySubscription
