import { TrendingUpIcon } from 'components/common/icons'
import { IReport } from 'lib/types/overview'

export const TotalEarnings = ({ data }: { data: IReport }) => {
  return (
    <div className='px-4 py-2 col-span-1 row-span-1 w-full bg-white rounded-md flex flex-col md:flex-row justify-center items-center p-3 gap-3'>
      <div className='h-12 w-12 rounded-md bg-[#D0FEF8] flex justify-center items-center'>
        <TrendingUpIcon classes='w-7 h-7' />
      </div>

      <div className='leading-5 text-gray-400 text-center md:text-left'>
        <span>Total Earnings</span> <br />
        <span className='text-gray-800 font-bold text-2xl'>${data.totalEarnings || '0'}</span>
      </div>
    </div>
  )
}
