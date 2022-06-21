import { IReferralLink } from 'lib/types'
import { useState } from 'react'
import { STEPS, SuccessCode, UpgradeToManager, VerifyCode } from './utils/Steps'
import { RegisterMerchantBasicInfo } from './utils/Steps/RegisterMerchantBasicInfo'
import { IHandleStep, IHandleUserInfo } from './utils/types'

export const SignUpMerchantForm = ({ referralLink }: { referralLink: IReferralLink }) => {
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

      {userTrack.step === STEPS.REGISTER_BASIC_INFO && (
        <RegisterMerchantBasicInfo
          referralLink={referralLink}
          handleUserInfo={handleUserInfo}
          handleStep={handleStep}
        />
      )}

      {userTrack.step === STEPS.VERIFY_CODE && (
        <VerifyCode
          handleUserInfo={handleUserInfo}
          referralLink={referralLink}
          userTrack={userTrack}
          handleStep={handleStep}
        />
      )}

      {userTrack.step === STEPS.SUCCESS_CODE && (
        <SuccessCode
          referralLink={referralLink}
          handleStep={handleStep}
          userTrack={userTrack}
        />
      )}

      {userTrack.step === STEPS.UPGRADE_TO_MANAGER && (
        <UpgradeToManager
          referralLink={referralLink}
          handleStep={handleStep}
          userTrack={userTrack}
        />
      )}
    </div>
  )
}
