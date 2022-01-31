import { TrendingUpIcon } from 'components/common/icons'

export const PromotionTracker = ({ data }: { data: any }) => {
  return (
    <div className='flex flex-col justify-center items-start col-span-2 row-span-1 sm:col-start-1 sm:row-start-1 md:col-span-1 text-sm'>
      <div className='flex justify-start items-center gap-x-3 text-xs'>
        <button className='text-gray-400 font-bold whitespace-nowrap uppercase hover:text-gray-800'>Earnings</button>
        <button className='text-gray-800 font-bold whitespace-nowrap uppercase hover:text-gray-800'>This month</button>
      </div>

      <div className='mt-2'>
        <span className='text-gray-800 font-bold'>$563,486,50</span>
      </div>

      <div className='w-full bg-white rounded-md flex flex-col sm:flex-row justify-start items-center p-3 mt-2 gap-3'>
        <div className='h-14 w-14 rounded-md bg-[#FFE59E] flex justify-center items-center'>
          <TrendingUpIcon classes='w-10 h-10' />
        </div>

        <div className='leading-5 text-gray-400 text-center md:text-left'>
          <span>Promotion tracker</span> <br />
          <span className='font-semibold'>Next Rank</span> <br />
          <span className='text-gray-800 font-semibold'>Director</span>
        </div>
      </div>
    </div>
  )
}
