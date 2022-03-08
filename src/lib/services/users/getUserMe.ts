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
  const res = await fetch('/api/user/me', {
    headers: {
      Authorization: `Bearer ${authorizations.token}`
    }
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        status: res.status,
        info: data.error
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
