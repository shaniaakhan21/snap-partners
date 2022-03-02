import { API } from 'config/api'
import { IQueryErrorReturn } from 'lib/types/query'

interface ISignUpDataBodyStep1 {
  phoneNumber: string
}

interface ISignUpDataBodyStep2 extends ISignUpDataBodyStep1 {
  name: string
  lastname: string
  email: string
  username: string
  password: string
  idImage: string | null
  insuranceImage: string | null
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  },
  code: number
  sponsorReferralCode: string | null
}

interface ISignUpDataBodyRestaurant {
  'city' : string
  'street_name': string,
  'state': string
  'country_code': string
  'delivery_fees': number
  'deliverykm': number
  'email': string
  'maxdeliverytime': number
  'mobile_no' : string
  'name': string
  'password': string
  'pincode': string
  'save_on_snap': boolean
}

export const signUpStep1 = async (dataBody: ISignUpDataBodyStep1): Promise<IQueryErrorReturn> => {
  const res = await fetch(`${API.BASE_URL}/api/authentication/signUpStepOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phoneNumber: dataBody.phoneNumber })
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return { error: null }
}

export const signUpStep2 = async (dataBody: ISignUpDataBodyStep2): Promise<IQueryErrorReturn> => {
  const res = await fetch(`${API.BASE_URL}/api/authentication/signUpStepTwo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return { error: null }
}

export const signUpRestaurant = async (dataBody: ISignUpDataBodyRestaurant): Promise<IQueryErrorReturn> => {
  const res = await fetch('http://ec2-3-13-46-32.us-east-2.compute.amazonaws.com:3000/restaurent/registerRestaurant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return { error: null }
}
