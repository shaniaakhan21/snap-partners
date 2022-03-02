import { IReferralLink } from 'lib/types'
import { RegisterRestaurantBasicInfo } from './utils/Steps/RegisterRestaurantBasicInfo'

export const SignUpRestaurantForm = ({ referralLink }: { referralLink: IReferralLink }) => {
  return (
    <div>
      <RegisterRestaurantBasicInfo
        referralLink={referralLink}
      />
    </div>
  )
}
