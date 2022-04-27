/* eslint-disable camelcase */
import { IQueryErrorReturn } from 'lib/types/http/query'

interface IMerchant {
  city : string
  street_name: string
  state: string
  country_code: string
  email: string
  mobile_no: string
  name: string
  password: string
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
  idImage: File
  insuranceImage: File
  merchant: IMerchant
  ownerName: string
  becomeToRole: string
}

export const updateUserRole = async (dataBody: IDataBody, token: string): Promise<IQueryErrorReturn> => {
  const formData = new FormData()

  const entries = Object.entries(dataBody)

  entries.forEach(([key, value]) => {
    if (key === 'roles' || key === 'merchant') {
      formData.append(key, JSON.stringify(value))
      return
    }
    if (key === 'idImage' || key === 'insuranceImage') {
      if (!value) return
    }
    formData.append(key, value)
  })

  const res = await fetch('/api/user/role', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
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
