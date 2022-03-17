import { ArrowHeadRightIcon } from 'components/common/icons'
import { TRANK } from 'lib/types/user/ranks'

export const CurrentRank = ({ rank }: { rank: TRANK }) => {
  return (
    <div className=' bg-white w-full rounded-t-md col-span-1 row-span-1 md:col-span-1 md:col-start-4 lg:col-span-1 flex flex-col md:flex-row justify-start items-center gap-3 p-3'>
      <div className='h-12 w-12 rounded-md bg-[#FFE59E] flex justify-center items-center'>
        <ArrowHeadRightIcon classes='w-7 h-7' />
      </div>

      <div className='leading-5 text-gray-400 text-center md:text-left'>
        <span>Rank</span> <br />
        <span className='text-gray-800 font-bold text-2xl capitalize'>
          {
            rank
              ? rank === 'referralPartner'
                ? 'Referral Partner'
                : rank
              : 'No Ranked'
          }
        </span>
      </div>
    </div>
  )
}
