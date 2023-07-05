// import { IFormConfig } from './types'

export const registerRulesConfig = {
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
        /^\S[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
  },

  name: {
    required: { value: true, message: 'Name Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  lastname: {
    required: { value: true, message: 'Last Name Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  username: {
    required: { value: true, message: 'Username Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-Z0-9]*$/, message: 'Username can only contain alphanumeric characters.' }
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
    maxLength: { value: 100, message: 'Max 100 Characters *' }
  },

  businessName: {
    maxLength: { value: 500, message: 'Max 500 Characters *' }
  },

  idImage: {
    required: { value: true, message: 'ID Image Required *' }
  },

  insuranceImage: {
    required: { value: true, message: 'Insurance Image Required *' }
  },

  rememberMe: {
    required: { value: false }
  },

  termsAndConditions: {
    required: { value: true, message: 'Terms And Conditions Required *' }
  }
}

export const registerMerchantRulesConfig = {
  username: {
    required: { value: true, message: 'Username Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-Z0-9]*$/, message: 'Username can only contain alphanumeric characters.' }
  },

  ownerName: {
    required: { value: true, message: 'Merchant Owner Name Required *' },
    maxLength: { value: 80, message: 'Max 80 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' },
    pattern: { value: /^[a-zA-Z\s]*$/, message: 'Merchant Owner Name not allow *' }
  },

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
        /^\S[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      message: 'Enter a valid email *'
    }
  },

  name: {
    required: { value: true, message: 'Merchant Name Required *' },
    maxLength: { value: 100, message: 'Max 100 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
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

  city: {
    required: {
      value: true, message: 'City Required *'
    }
  },

  street_name: {
    required: {
      value: true, message: 'Street Name Required *'
    }
  },

  state: {
    required: {
      value: true, message: 'State Required *'
    }
  },

  country_code: {
    required: {
      value: true, message: 'Country Code Required *'
    }
  },

  delivery_fees: {
    required: {
      value: true, message: 'Delivery Fees Required *'
    }
  },

  deliverykm: {
    required: {
      value: true, message: 'Delivery(km) Required *'
    }
  },

  maxdeliverytime: {
    required: {
      value: true, message: 'Max Delivery Time Required *'
    }
  },

  pincode: {
    required: {
      value: true, message: 'Pin Code Required *'
    }
  },

  referralCode: {
    maxLength: { value: 50, message: 'Max 50 Characters *' }
  },

  termsAndConditions: {
    required: { value: true, message: 'Terms And Conditions Required *' }
  }
}
