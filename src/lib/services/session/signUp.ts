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

interface ISignUpDataResponse {
  timestamp: number
  data: {
    success: true
    token: string
  } | null
  error: string | null
}

export const signUpStep1 = async (dataBody: ISignUpDataBodyStep1) => {
  const res = await fetch('/api/authentication/signUpStepOne', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phoneNumber: dataBody.phoneNumber })
  })

  const data: ISignUpDataResponse = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: data.error,
        status: res.status
      }
    }
  }

  return {
    data,
    error: null
  }
}

export const signUpStep2 = async (dataBody: ISignUpDataBodyStep2) => {
  const res = await fetch('/api/authentication/signUpStepTwo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  })

  const data: ISignUpDataResponse = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: data.error,
        status: res.status
      }
    }
  }

  return {
    data,
    error: null
  }
}
