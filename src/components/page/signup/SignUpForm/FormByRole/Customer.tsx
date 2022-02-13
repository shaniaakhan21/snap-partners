import { IReferralLink } from 'lib/types'
import { useState } from 'react'
import { StepOne } from './utils/Steps/StepOne'
import { StepFinish } from './utils/Steps/StepFinish'
import { StepTwo } from './utils/Steps/StepTwo'
import { IHandleStep, IUserTrack, IHandleUserInfo } from './utils/types'

export const SignUpCustomerForm = ({ referralLink }: { referralLink: IReferralLink }) => {
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
    <div>
      {
        userTrack.step === 'STEP_1' && (
          <StepOne
            handleUserInfo={handleUserInfo}
            handleStep={handleStep}
            referralLink={referralLink}
          />
        )
      }

      {
        userTrack.step === 'STEP_2' && (
          <StepTwo
            handleStep={handleStep}
          />
        )
      }

      {
        userTrack.step === 'FINISH' && (
          <StepFinish />
        )
      }
    </div>
  )
}
