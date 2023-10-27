export interface IUserToSignUp {
  email: string
  username: string
  name: string
  lastname: string
  businessName: string
  phone: string
  password: string
  dateOfBirth: Date
  referralCode?: string | null
  idImage?: any
  insuranceImage?: any
}

export interface IDataForm extends IUserToSignUp {
  confirmEmail: string
  confirmPassword: string
  rememberMe: boolean
  termsAndConditions: boolean
  phoneNumber: string

  // IBO
  street: string
  state: string
  city: string
  zip: string
  ssn: string
  level: string
  dateOfBirth: Date

  //   "name": "CustomerName",
  //   "lastname": "CustomerLastName",
  // "email": "customer@snapdelivery.com",
  //   "username": "customer1",
  // "password": "123456",
  // "phoneNumber": "+584242565184",
  //   "idImage": null,
  //   "insuranceImage": null,
  // "roles": {
  //       "admin": false,
  //       "customer": true,
  //       "driver": false,
  //       "merchant": false
  //   },
  //   "code": "555207",
  //   "sponsorReferralCode":null
}

export interface IUserStepsToSignUp {
  REGISTER_BASIC_INFO: 'STEP_1'
  VERIFY_CODE: 'STEP_2'
  SUCCESS_CODE: 'STEP_3'
  UPGRADE_TO_MANAGER: 'STEP_4'
}

export type TStepsKey = 'REGISTER_BASIC_INFO' | 'VERIFY_CODE' | 'SUCCESS_CODE' | 'UPGRADE_TO_MANAGER'
export type TSteps = IUserStepsToSignUp['REGISTER_BASIC_INFO'] | IUserStepsToSignUp['VERIFY_CODE'] | IUserStepsToSignUp['SUCCESS_CODE'] | IUserStepsToSignUp['UPGRADE_TO_MANAGER']

export interface IUserTrack {
  step: TSteps
  userInfo: IUserToSignUp
}

export type IHandleUserInfo = (userToSignUp: IUserToSignUp) => void
export type IHandleStep = (step: TSteps) => void

export interface IRegisterFormProps {
  code?: string
  role: string
}

export type registerFormIds = 'referralCode' | 'email' | 'username' | 'name' | 'lastname' | 'phoneExt' | 'phoneNumber' | 'confirmEmail' | 'password' | 'confirmPassword' | 'rememberMe' | 'termsAndConditions' | 'dateOfBirth'
export type registerFormMerchantIds = | 'phoneExt' | 'phoneNumber' | 'email' | 'confirmEmail' | 'city' | 'street_name' | 'state' | 'country_code' | 'delivery_fees' | 'deliverykm' | 'email' | 'maxdeliverytime' | 'mobile_no' | 'name' | 'password' | 'pincode' | 'save_on_snap'

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

  lastname: {
    required: { value: boolean, message: string },
    maxLength: { value: number, message: string },
    minLength: { value: number, message: string }
    pattern: { value: RegExp; message: string }
  },

  username: {
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
