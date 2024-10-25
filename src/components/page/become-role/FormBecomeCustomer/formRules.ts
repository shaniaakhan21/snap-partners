
export const becomeCustomerRulesConfig = {
  username: {
    required: { value: true, message: 'Username Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-Z0-9]*$/, message: 'Username can only contain alphanumeric characters.' }
  },

  name: {
    required: { value: true, message: 'First Name Required *' },
    maxLength: { value: 100, message: 'Max 100 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  lastname: {
    required: { value: true, message: 'Last Name Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  email: {
    required: { value: true, message: 'Email Required *' },
    pattern: {
      value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
  },

  phoneNumber: {
    required: { value: true, message: 'Phone number required *' },
    maxLength: { value: 20, message: 'Max 20 Numbers *' },
    minLength: { value: 8, message: 'Min 18 Numbers *' },
    pattern: { value: /^[0-9+]*$/i, message: 'Only Numbers *' }
  },

  termsAndConditions: {
    required: { value: true, message: 'Terms And Conditions Required *' }
  }
}
