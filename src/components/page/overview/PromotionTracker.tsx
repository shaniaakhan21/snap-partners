import { UserBadges } from 'components/common/UserBadges'
import { IAuth } from 'lib/stores/Auth'
import { CurrentRank } from '.'
import { TRANK } from 'lib/types/user/ranks'

export const PromotionTracker = ({ userAuth }: { userAuth: IAuth }) => {
  const handleNextRankType = (currentRank: TRANK): TRANK => {
    if (currentRank === 'referralPartner') return 'manager'
    if (currentRank === 'manager') return 'supervisor'
    if (currentRank === 'supervisor') return 'director'
    if (currentRank === 'director') return 'executive'
    if (currentRank === 'executive') return 'executive'
  }

  return (
    <div className='flex flex-col justify-end items-start col-span-2 row-span-1 md:col-start-1 md:row-start-1 md:col-span-1 text-sm'>
      <div className='flex justify-start items-center gap-x-3 text-xs'>
        <button className='text-gray-400 font-bold whitespace-nowrap uppercase hover:text-gray-800'>Earnings</button>
        <button className='text-gray-800 font-bold whitespace-nowrap uppercase hover:text-gray-800'>This month</button>
        <span className='text-gray-800 font-bold'>$0</span>
      </div>

      <br />
      <CurrentRank rank={userAuth.ranks?.type} roles={userAuth.roles} />

      {
        (userAuth.ranks && userAuth.ranks?.type !== 'executive') && (
          <div className='w-full bg-white flex flex-col sm:flex-row justify-start items-center p-3 gap-3'>
            <div className='h-14 w-14 rounded-md flex justify-center items-center list-none'>
              <UserBadges
                userRank={handleNextRankType(userAuth.ranks?.type)}
                userRoles={userAuth.roles}
              />
            </div>

            <div className='leading-5 text-gray-400 text-center md:text-left'>
              <span>Promotion tracker</span> <br />
              <span className='font-semibold'>Next Rank</span> <br />
              <span className='text-gray-800 font-semibold'>
                {userAuth.ranks?.type === 'referralPartner' && 'Manager'}
                {userAuth.ranks?.type === 'manager' && 'Supervisor'}
                {userAuth.ranks?.type === 'supervisor' && 'Director'}
                {userAuth.ranks?.type === 'director' && 'Executive'}
              </span>
            </div>
          </div>
        )
      }

    </div>
  )
}
