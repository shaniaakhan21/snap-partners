import { IUserStepsToSignUp } from '../types'
export { RegisterBasicInfo } from './RegisterBasicInfo'
export { VerifyCode } from './VerifyCode'
export { SuccessCode } from './SuccessCode'
export { UpgradeToManager } from './UpgradeToManager'

export const STEPS: IUserStepsToSignUp = {
  REGISTER_BASIC_INFO: 'STEP_1',
  VERIFY_CODE: 'STEP_2',
  SUCCESS_CODE: 'STEP_3',
  UPGRADE_TO_MANAGER: 'STEP_4'
}
