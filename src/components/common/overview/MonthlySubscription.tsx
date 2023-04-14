import * as React from 'react'
import Image from 'next/image'
import ServeImage from '../../../../public/images/subscription_serve.svg'

const MonthlySubscription = () => {
  return (
    <>
      <div className='grid grid-rows-3 gap-4 py-6'>
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
            <div>
                1
            </div>
            <div>
                1
            </div>
            <div>
                1
            </div>
            <div>
                1
            </div>
          </div>
        </div>
        <div className='pl-5 pr-5'>
            1
        </div>
      </div>
    </>
  )
}

export default MonthlySubscription
