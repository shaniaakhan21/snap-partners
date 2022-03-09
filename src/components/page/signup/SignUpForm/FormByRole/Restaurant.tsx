import { IReferralLink } from 'lib/types'
import { useState } from 'react'
import { STEPS, SuccessCode, UpgradeToManager, VerifyCode } from './utils/Steps'
import { RegisterRestaurantBasicInfo } from './utils/Steps/RegisterRestaurantBasicInfo'
import { VerifyCodeToRestaurants } from './utils/Steps/VerifyCodeToRestaurants'
import { IHandleStep, IHandleUserInfo } from './utils/types'

export const SignUpRestaurantForm = ({ referralLink }: { referralLink: IReferralLink }) => {
  const [userTrack, setUserTrack] = useState<any>({ step: 'STEP_1', userInfo: null })

  const handleStep: IHandleStep = (step) => {
    setUserTrack(prevState => ({
      userInfo: { ...prevState.userInfo },
      step
    }))
  }

  const handleUserInfo: IHandleUserInfo = (userToSignUp) => {
    setUserTrack(prevState => ({
      step: prevState.step,
      userInfo: userToSignUp
    }))
  }

  return (
    <div className='w-full'>

      {
        userTrack.step === STEPS.REGISTER_BASIC_INFO && (
          <RegisterRestaurantBasicInfo
            referralLink={referralLink}
            handleUserInfo={handleUserInfo}
            handleStep={handleStep}
          />
        )
      }

      {
        userTrack.step === STEPS.VERIFY_CODE && (
          <VerifyCode
            referralLink={referralLink}
            userTrack={userTrack}
            handleStep={handleStep}
          />
        )
      }

      {
        userTrack.step === STEPS.SUCCESS_CODE && (
          <SuccessCode
            referralLink={referralLink}
            handleStep={handleStep}
            userTrack={userTrack}
          />
        )
      }

      {
        userTrack.step === STEPS.UPGRADE_TO_MANAGER && (
          <UpgradeToManager
            referralLink={referralLink}
            handleStep={handleStep}
            userTrack={userTrack}
          />
        )
      }
    </div>
  )
}
