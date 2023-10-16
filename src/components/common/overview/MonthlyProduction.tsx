import { useEffect, useState } from 'react'
import Image from 'next/image'
import ServeImage from '../../../../public/images/subscription_serve.svg'
import { monthlyProductionData } from './mock'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'

interface CountData {
  new: number;
  total: number;
}

interface MonthlyProductionData {
  customers: CountData;
  drivers: CountData;
  merchants: CountData;
  vidgo: CountData;
  erc: CountData;
}

const MonthlyProduction = ({ userId }) => {
  const [data, setData] = useState<MonthlyProductionData>()

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getMonthlyProduction', {
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
                    <h1 className="text-2xl text-black font-bold pb-2">Monthly Production</h1>
                  </div>
                </div>
                <div className='pl-5 pr-5 zoom-screen-layout-hide'>
                  <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 '>
                    <div className='border-b border-gray-400'></div>
                    <div className='text-green-600 border-b border-gray-400'><strong><p>New</p></strong></div>
                    <div><strong><p className='text-right border-b border-gray-400'>Total</p></strong></div>
                  </div>
                  <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
                    <div>
                      <strong><p className='text-xs'>Customer Orders</p></strong>
                    </div>
                    <div>
                      <strong><p className='text-green-600 text-xs'>{`${data.customers.new} new Orders!`}</p></strong>
                    </div>
                    <div>
                      <p className='text-xs text-right'>{`${data.customers.total} Total`}</p>
                    </div>
                  </div>
                  <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
                    <div>
                      <strong><p className='text-xs'>Driver Deliveries</p></strong>
                    </div>
                    <div>
                      <strong><p className='text-green-600 text-xs '>{`${data.drivers.new} new Deliveries!`}</p></strong>
                    </div>
                    <div>
                      <p className='text-xs text-right'>{`${data.drivers.total}  Total`}</p>
                    </div>
                  </div>
                  <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
                    <div>
                      <strong><p className='text-xs'>Merchant Orders</p></strong>
                    </div>

                    <div>
                      <strong><p className='text-green-600 text-xs '>{`${data.merchants.new} new Orders!`}</p></strong>
                    </div>
                    <div>
                      <p className='text-xs text-right'>{`${data.merchants.total} Total`}</p>
                    </div>
                  </div>
                  <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
                    <div>
                      <strong><p className='text-xs'>Vidgo</p></strong>
                    </div>
                    <div>
                      <strong><p className='text-green-600 text-xs '>{`${data.vidgo.new} new Vidgo!`} </p></strong>
                    </div>
                    <div>
                      <p className='text-xs text-right'>{`${data.vidgo.total} Total`}</p>
                    </div>
                  </div>
                  <div role='button' className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
                    <div>
                      <strong><p className='text-xs'>ERC</p></strong>
                    </div>
                    <div>
                      <strong><p className='text-green-600 text-xs '>{`${data.vidgo.new} new ERC!`} </p></strong>
                    </div>
                    <div>
                      <p className='text-xs text-right'>{`${data.vidgo.total} Total`}</p>
                    </div>
                  </div>
                </div>
              </div>
      }
    </>
  )
}

export default MonthlyProduction
