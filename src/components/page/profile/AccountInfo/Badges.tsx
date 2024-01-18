import { UserBadges } from 'components/common/UserBadges'
import { IAuth } from 'lib/stores/Auth'

interface IBadgesProps {
  auth: IAuth
}

export const Badges = ({ auth }: IBadgesProps) => {
  const _auth :any = auth
  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)
  return (
    <div className='text-center mt-4'>
      <span className='text-2xl font-bold text-black-h'>{auth.username}</span>
      <ul className='flex justify-start items-center gap-x-2 mt-1'>
        {!isIntegrous && (
          <>
            <UserBadges userRank={auth.ranks?.type} userRoles={auth.roles} />
            <li>
              <span className='font-bold text-sm capitalize text-[#718798]'>{auth.ranks?.type === 'referralPartner' ? 'Referral Partner' : auth.ranks?.type}</span>
            </li>
          </>
        )}
      </ul>
    </div>
  )
}
