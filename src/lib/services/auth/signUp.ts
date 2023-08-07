import { IQueryErrorReturn } from 'lib/types/http/query'

interface ISignUpDataBodyStep1 {
  phoneNumber: string
  username: string
  email: string
  sponsorReferralCode: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
    ibo: boolean
    agent: boolean
    integrousCustomer: boolean
    integrousAssociate: boolean
  },
}

interface ISignUpDataBodyStep2 extends ISignUpDataBodyStep1 {
  name: string
  lastname: string
  email: string
  username: string
  password: string
  idImage: string
  insuranceImage: string
  ownerName?: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
    ibo: boolean
    agent: boolean
    integrousCustomer: boolean
    integrousAssociate: boolean
  },
  code: number
  sponsorReferralCode: string
}

interface ISignUpDataBodyMerchant {
  name: string
  lastname: string
  email: string
  username: string
  password: string
  phoneNumber,
  idImage: null,
  insuranceImage: null,
  roles: {
    admin: false,
    customer: false,
    driver: false,
    merchant: true,
    integrousCustomer: false,
    integrousAssociate: false
  },
  code: null,
  ownerName: string
  merchant: {
    city: string
    'street_name': string
    state: string
    'country_code': string
    'delivery_fees': 0.01
    deliverykm: 0.01
    email: string
    maxdeliverytime: 0.01
    'mobile_no': string
    name: string
    password: string
    pincode: '1234',
    'save_on_snap': true
  },
  sponsorReferralCode: string
}

export const signUpStep1 = async (dataBody: ISignUpDataBodyStep1 | ISignUpDataBodyMerchant): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/authentication/signUpStepOne', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      phoneNumber: dataBody.phoneNumber,
      email: dataBody.email,
      username: dataBody.username,
      roles: dataBody.roles,
      sponsorReferralCode: dataBody.sponsorReferralCode
    })
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
    res = await fetch('/api/authentication/signUpStepTwo', {
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

    res = await fetch('/api/authentication/signUpStepTwo', {
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

export const signUpMerchant = async (dataBody: any): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/authentication/signUpStepTwo', {
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
