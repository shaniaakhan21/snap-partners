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
