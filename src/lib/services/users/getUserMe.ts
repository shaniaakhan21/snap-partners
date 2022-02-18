import { API } from 'config/api'
import { IQueryErrorReturn } from 'lib/types/query'

interface IAuthorizations {
  token: string
}

interface IQueryUserMeReturn extends IQueryErrorReturn {
  data: {
    username: string,
    email: string,
    name: string,
    lastname: string,
    phoneNumber: string | null,
    roles: {
        admin: boolean,
        customer: boolean,
        driver: boolean,
        merchant: boolean
    },
    isManager: boolean,
    referralCode: string | null,
    sponsorId: number | null,
    idImage: string | null,
    insuranceImage: string | null,
  } | null
}

export const getUserMe = async (authorizations: IAuthorizations): Promise<IQueryUserMeReturn> => {
  const res = await fetch(`${API.BASE_URL}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${authorizations.token}`
    }
  })

  const data = await res.json()

  console.log('data:', data)

  if (!res.ok) {
    console.log({
      status: res.status,
      message: data.error
    })

    return {
      data: null,
      error: {
        status: res.status,
        message: data.error
      }
    }
  }

  return {
    data: {
      ...data.data,
      sponsorId: data.data.sponsorId ?? null
    },
    error: null
  }
}
