export interface IDataForm {
  email: string
  confirmEmail: string
  name: string
  phone: string
  password: string
  confirmPassword: string
  referralCode?: string | null
  rememberMe: boolean
  termsAndConditions: boolean
}

export interface IRegisterFormProps {
  code?: string
  role: string
}

export type registerFormIds = 'referralCode' | 'email' | 'name' | 'phone' | 'confirmEmail' | 'password' | 'confirmPassword' | 'rememberMe' | 'termsAndConditions'

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
