import { useState } from 'react'

import { IReferralLink } from 'lib/types'
import { STEPS, RegisterBasicInfo, VerifyCode, SuccessCode, UpgradeToManager } from './utils/Steps'
import { IHandleStep, IUserTrack, IHandleUserInfo } from './utils/types'

export const SignUpintegrousAssociateForm = ({ referralLink }: { referralLink: IReferralLink }) => {
  const [userTrack, setUserTrack] = useState<IUserTrack>({ step: 'STEP_1', userInfo: null })

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
        <RegisterBasicInfo
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
