import { UserBadges } from 'components/common/UserBadges'
import { TRANK } from 'lib/types/user/ranks'

export const CurrentRank = ({ rank, roles }: { rank: TRANK, roles: any }) => {
  return (
    <div className=' bg-white w-full rounded-t-md col-span-1 row-span-1 md:col-span-1 md:col-start-4 lg:col-span-1 flex flex-col md:flex-row justify-start items-center gap-3 p-3'>
      <div className='h-14 w-14 rounded-md flex justify-center items-center list-none'>
        <UserBadges userRank={rank} userRoles={roles} />
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
