import { TrendingUpIcon } from 'components/common/icons'
import { IReport } from 'lib/types/overview'

export const MyOrders = ({ data }: { data: IReport }) => {
  return (
    <div className=' bg-white rounded-md col-span-1 row-span-1 flex flex-col md:flex-row justify-center items-center gap-3 p-3'>
      <div className='h-12 w-12 rounded-md bg-[#D6D6D6] flex justify-center items-center'>
        <TrendingUpIcon classes='w-7 h-7' />
      </div>

      <div className='leading-5 text-gray-400 text-center md:text-left'>
        <span>My orders</span> <br />
        <span className='text-gray-800 font-bold text-2xl'>${data.myOrders || '0'}</span>
      </div>
    </div>
  )
}
