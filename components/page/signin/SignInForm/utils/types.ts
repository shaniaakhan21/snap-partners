export interface IDataForm {
  email: string
  password: string
  rememberMe: boolean
  privacyPolicy: boolean
}

export interface IRegisterFormProps {
  code?: string
  role: string
}

export type registerFormIds = 'email' | 'password' | 'rememberMe' | 'privacyPolicy'

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

  phone: {
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
