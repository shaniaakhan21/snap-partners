import { IAuth } from 'lib/stores/Auth'
import { TrendingUpIcon } from 'components/common/icons'

interface IRankProps {
  auth: IAuth
}

export const Rank = ({ auth }: IRankProps) => {
  return (
    <div className='w-full md:w-1/2 h-20 flex items-center bg-white rounded-lg px-4 mr-0 md:mr-4 mb-4 md:mb-0'>
      <div className='bg-warning-300 rounded-lg w-12 h-12 flex items-center justify-center mr-4'>
        <TrendingUpIcon />
      </div>

      <div>
        <span className='block text-gray-400 text-sm'>Rank</span>
        <span className='text-lg font-semibold capitalize'>{auth.ranks?.type === 'referralPartner' ? 'Referral Partner' : auth.ranks?.type}</span>
      </div>
    </div>
  )
}
