import Image from 'next/image'
import ServeImage from '../../../../public/images/subscription_serve.svg'

const MonthlyProduction = () => {
  return (
    <>
      <div className='grid gap-4 py-6'>
        <div className='pl-5 pr-5'>
          <div className="flex pt-2">
            <div className="text-left text-10">
              <Image src={ServeImage} alt="monthly subscription" width={100} height={100} />
            </div>
            <div className="text-left text-10">
              <h1 className="text-2xl text-black font-bold pb-2 pl-5">Monthly</h1>
              <h1 className="text-2xl text-black font-bold pb-2 pl-5">Production</h1>
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
              <strong><u><p className='text-xs'>Customers Orders</p></u></strong>
            </div>
            <div>
              <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
            </div>
            <div>
              <strong><p className='text-green-600 text-xs text-right'>20 Orders</p></strong>
            </div>
            <div>
              <p className='text-xs text-right'>8823 Total</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
            <div>
              <strong><u><p className='text-xs'>Driver Deliveries</p></u></strong>
            </div>
            <div>
              <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
            </div>
            <div>
              <strong><p className='text-green-600 text-xs text-right'>20 Deliveries</p></strong>
            </div>
            <div>
              <p className='text-xs text-right'>4546 Total</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
            <div>
              <strong><u><p className='text-xs'>Merchants Orders</p></u></strong>
            </div>
            <div>
              <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
            </div>
            <div>
              <strong><p className='text-green-600 text-xs text-right'>20 Orders</p></strong>
            </div>
            <div>
              <p className='text-xs text-right'>682 Total</p>
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
              <strong><p className='text-green-600 text-xs text-right'>20 Vidgo</p></strong>
            </div>
            <div>
              <p className='text-xs text-right'>34 Total</p>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 gap-2 pt-5'>
            <div>
              <strong><u><p className='text-xs'>ERC</p></u></strong>
            </div>
            <div>
              <button className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">SEE MORE</button>
            </div>
            <div>
              <strong><p className='text-green-600 text-xs text-right'>20 Orders</p></strong>
            </div>
            <div>
              <p className='text-xs text-right'>34 Total</p>
            </div>
          </div>
        </div>
        <div className='pl-5 pr-5'>
          <button className="text-sm bg-red-600 hover:bg-red-700 text-white font-bold h-10 w-full py-3 px-4 rounded-l-full rounded-r-full">SEE REPORT</button>
        </div>
      </div>
    </>
  )
}

export default MonthlyProduction
