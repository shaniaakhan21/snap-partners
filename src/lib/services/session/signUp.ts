import { API } from 'config/api'

interface ISignUpDataBody {
  name: string
  lastname: string
  email: string
  username: string
  password: string
  phoneNumber: string
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

interface ISignUpDataResponse {
  timestamp: number
  data: {
    success: true
  }
}

export const sigIn = async (data: ISignUpDataBody) => {
  const resStep1 = await fetch(`${API.BASE_URL}/auth/signUpStepOne`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phoneNumber: data.phoneNumber })
  })

  const dataStep1: ISignUpDataResponse = await resStep1.json()

  if (!resStep1.ok) {
    return {
      data: null,
      error: {
        message: dataStep1,
        status: resStep1.status
      }
    }
  }

  const resStep2 = await fetch(`${API.BASE_URL}/auth/signUpStepTwo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  const dataStep2: ISignUpDataResponse = await resStep2.json()

  if (!resStep2.ok) {
    return {
      data: null,
      error: {
        message: dataStep2,
        status: resStep2.status
      }
    }
  }

  return {
    data: dataStep2,
    error: null
  }
}
