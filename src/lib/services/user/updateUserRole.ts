/* eslint-disable camelcase */
import { IQueryErrorReturn } from 'lib/types/http/query'

interface IMerchant {
  city : string
  street_name: string
  state: string
  country_code: string
  delivery_fees: 0.01
  deliverykm: 0.01
  email: string
  maxdeliverytime: 0.01
  mobile_no: string
  name: string
  password: string
  pincode: '33458'
  save_on_snap: true
}

interface IDataBody {
  name: string
  lastname: string
  email: string
  username: string
  phoneNumber: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  },
  idImage: string
  insuranceImage: string
  merchant: IMerchant
  ownerName: string
  becomeToRole: 'customer' | 'driver' | 'merchant'
}

export const updateUserRole = async (dataBody: IDataBody, token: string): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/user/role', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
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
