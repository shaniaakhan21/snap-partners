import { UserBadges } from 'components/common/UserBadges'
import { IAuth } from 'lib/stores/Auth'

interface IBadgesProps {
  auth: IAuth
}

export const Badges = ({ auth }: IBadgesProps) => {
  return (
    <div>
      <span className='text-2xl font-bold text-gray-800'>{auth.username}</span>
      <ul className='flex justify-start items-center gap-x-2 mt-1'>
        <UserBadges userRank={auth.ranks?.type} userRoles={auth.roles} />

        <li>
          <span className='font-bold text-xl capitalize'>{auth.ranks?.type === 'referralPartner' ? 'Referral Partner' : auth.ranks?.type}</span>
        </li>
      </ul>
    </div>
  )
}
