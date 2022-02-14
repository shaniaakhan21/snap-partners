interface IFormConfig {
  username: {
    maxLength: { value: number; message: string }
    minLength: { value: number; message: string }
    pattern: { value: RegExp; message: string }
  }

  password: {
    required: { value: boolean; message: string }
    maxLength: { value: number; message: string }
    minLength: { value: number; message: string }
  }
}

export const signInRulesConfig: IFormConfig = {
  password: {
    required: { value: true, message: 'Password Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  username: {
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-ZÀ-ÿ0-9 ()-.]*$/, message: 'Username not allow *' }
  }
}
