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

const MonthlyProduction = () => {
  const [data, setData] = useState<MonthlyProductionData>()

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getMonthlyProduction', {
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
              <div className="text-left text-10">
                <h1 className="text-2xl text-black font-bold pb-2">Monthly Production</h1>
              </div>
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
                <strong><p className='text-xs'>Customers Orders</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs  '>{`${data.customers.new} Orders`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.customers.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>Driver Deliveries</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.drivers.new} Deliveries`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.drivers.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>Merchants Orders</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.merchants.new}  Orders`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.merchants.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>VIDGO</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.vidgo.new} Vidgo`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.vidgo.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3  pt-5'>
              <div>
                <strong><p className='text-xs'>ERC</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs'>{`${data.erc.new} Erc`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.erc.total} Total`}</p>
              </div>
            </div>
          </div>
          {/* This is visible above 100% zoom */}
          <div className='pl-5 pr-5 zoom-screen-layout-show hidden'>
            <div className='grid grid-cols-1 '>
              <div></div>
              <div className='text-green-600 '><strong><p>New</p></strong></div>
              <div><strong><p className=''>Total</p></strong></div>
            </div>
            <div className='grid grid-cols-1   pt-5'>
              <div>
                <strong><p className='text-xs'>Customers Orders</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs  '>{`${data.customers.new} Orders`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.customers.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>Driver Deliveries</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.drivers.new} Deliveries`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.drivers.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1   pt-5'>
              <div>
                <strong><p className='text-xs'>Merchants Orders</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.merchants.new}  Orders`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.merchants.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>VIDGO</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.vidgo.new} Vidgo`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.vidgo.total} Total`}</p>
              </div>
            </div>
            <div className='grid grid-cols-1  pt-5'>
              <div>
                <strong><p className='text-xs'>ERC</p></strong>
              </div>
              <div>
                <strong><p className='text-green-600 text-xs '>{`${data.erc.new} Erc`}</p></strong>
              </div>
              <div>
                <p className='text-xs text-right'>{`${data.erc.total} Total`}</p>
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

export default MonthlyProduction
