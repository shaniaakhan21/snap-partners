export interface IUserToSignUp {
  email: string
  name: string
  phone: string
  password: string
  referralCode?: string | null
}

export interface IDataForm extends IUserToSignUp {
  confirmEmail: string
  confirmPassword: string
  rememberMe: boolean
  termsAndConditions: boolean
  phoneExt: string
  phoneNumber: string
}

type TUserStepsToSignUp = 'STEP_1' | 'STEP_2' | 'FINISH'

export interface IUserTrack {
  step: TUserStepsToSignUp
  userInfo: IUserToSignUp
}

export type IHandleUserInfo = (userToSignUp: IUserToSignUp) => void
export type IHandleStep = (step: TUserStepsToSignUp) => void

export interface IRegisterFormProps {
  code?: string
  role: string
}

export type registerFormIds = 'referralCode' | 'email' | 'name' | 'phoneExt' | 'phoneNumber' | 'confirmEmail' | 'password' | 'confirmPassword' | 'rememberMe' | 'termsAndConditions'

export interface IFormConfig {
  email: {
    required: { value: boolean; message: string }
    pattern: { value: RegExp; message: string }
  },

  confirmEmail: {
    required: { value: boolean; message: string }
    pattern: { value: RegExp; message: string }
  },

  name: {
    required: { value: boolean, message: string },
    maxLength: { value: number, message: string },
    minLength: { value: number, message: string }
    pattern: { value: RegExp; message: string }
  },

  phoneExt: {
    required: { value: boolean, message: string },
    maxLength: { value: number, message: string },
    pattern: { value: RegExp, message: string }
  },

  phoneNumber: {
    required: { value: boolean, message: string },
    maxLength: { value: number, message: string },
    minLength: { value: number, message: string },
    pattern: { value: RegExp, message: string }
  },

  password: {
    required: { value: boolean; message: string }
    maxLength: { value: number; message: string }
    minLength: { value: number; message: string }
  },

  confirmPassword: {
    required: { value: boolean, message: string },
    maxLength: { value: number, message: string },
    minLength: { value: number, message: string },
  },

  referralCode: {
    maxLength: { value: number, message: string },
    pattern: { value: RegExp; message: string }
  },

  rememberMe: {
    required: { value: boolean, message?: string },
  },

  termsAndConditions: {
    required: { value: boolean, message: string },
  }
}
