
export const becomeDriverRulesConfig = {
  username: {
    required: { value: true, message: 'Username Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-Z0-9!@#$%\\^&*)(+=._-]*$/, message: 'Username not allow *' }
  },

  name: {
    required: { value: true, message: 'First Name Required *' },
    maxLength: { value: 100, message: 'Max 100 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  lastname: {
    required: { value: true, message: 'Last Name Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-Z0-9!@#$%\\^&*)(+=._-]*$/, message: 'Last Name not allow *' }
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

  idImage: {
    required: { value: true, message: 'ID required *' }
  },

  driverLicense: {
    required: { value: true, message: 'Driver License required *' }
  },

  carInsurance: {
    required: { value: true, message: 'Insurance required *' }
  }
}
