import { IFormConfig } from './types'

export const registerRulesConfig: IFormConfig = {
  email: {
    required: { value: true, message: 'Email Required *' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
  },

  confirmEmail: {
    required: { value: true, message: 'Email Required *' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
  },

  name: {
    required: { value: true, message: 'Name Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-ZÀ-ÿ0-9 ()-.]*$/, message: 'Name not allow *' }
  },

  phoneExt: {
    required: { value: true, message: 'Phone extension required *' },
    maxLength: { value: 4, message: 'Max 4 Numbers *' },
    pattern: { value: /^[0-9]*$/i, message: 'Only Numbers *' }
  },

  phoneNumber: {
    required: { value: true, message: 'Phone number required *' },
    maxLength: { value: 20, message: 'Max 20 Numbers *' },
    minLength: { value: 8, message: 'Min 18 Numbers *' },
    pattern: { value: /^[0-9]*$/i, message: 'Only Numbers *' }
  },

  password: {
    required: { value: true, message: 'Password Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  confirmPassword: {
    required: { value: true, message: 'Password Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  referralCode: {
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    pattern: { value: /^[a-zA-ZÀ-ÿ0-9 ()-.]*$/, message: 'Referral Code not allow *' }
  },

  rememberMe: {
    required: { value: false }
  },

  termsAndConditions: {
    required: { value: true, message: 'Terms And Conditions Required *' }
  }
}
