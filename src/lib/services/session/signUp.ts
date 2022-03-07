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

// interface ISignUpDataBodyRestaurant {
//   'city' : string
//   'street_name': string,
//   'state': string
//   'country_code': string
//   'email': string
//   'mobile_no' : string
//   'name': string
//   'password': string
//   'save_on_snap': boolean

//   lastname: string
//   username: string
//   idImage: string | null
//   insuranceImage: string | null
//   roles: {
//     admin: boolean
//     customer: boolean
//     driver: boolean
//     merchant: boolean
//   },
//   code: number
//   sponsorReferralCode: string | null
// }

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

export const signUpStep2 = async (dataBody: ISignUpDataBodyStep2, isJsonFetch: boolean = true): Promise<IQueryErrorReturn> => {
  let res: Response

  if (isJsonFetch) {
    res = await fetch(`${API.BASE_URL}/api/authentication/signUpStepTwo`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataBody)
    })
  } else {
    const formData = new FormData()

    const entries = Object.entries(dataBody)

    entries.forEach(([key, value]) => {
      if (key === 'roles') {
        formData.append(key, JSON.stringify(value))
        return
      }
      if (key === 'idImage' || key === 'insuranceImage') {
        if (!value) return
      }
      formData.append(key, value)
    })

    res = await fetch(`${API.BASE_URL}/api/authentication/signUpStepTwo`, {
      method: 'POST',
      body: formData
    })
  }

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

export const signUpRestaurant = async (dataBody: any): Promise<IQueryErrorReturn> => {
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
