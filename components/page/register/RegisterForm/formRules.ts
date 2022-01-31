interface IFormConfig {
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

  rememberMe: {
    required: { value: boolean, message?: string },
  },

  termsAndConditions: {
    required: { value: boolean, message: string },
  }
}

export const loginRulesConfig: IFormConfig = {
  email: {
    required: { value: true, message: 'Email Required *' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
  },

  phone: {
    required: { value: true, message: 'Phone Required *' },
    maxLength: { value: 15, message: 'Max 15 Numbers *' },
    minLength: { value: 10, message: 'Min 10 Numbers *' },
    pattern: { value: /^[0-9]*$/i, message: 'Only Numbers *' }
  },

  confirmEmail: {
    required: { value: true, message: 'Email Required *' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
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

  name: {
    required: { value: true, message: 'Name Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-ZÀ-ÿ0-9 ()-.]*$/, message: 'Name not allow *' }
  },

  rememberMe: {
    required: { value: false }
  },

  termsAndConditions: {
    required: { value: true, message: 'Terms And Conditions Required *' }
  }
}
