import { IQueryErrorReturn } from 'lib/types/http/query'
import { TRANK } from 'lib/types/user/ranks'

interface IAuthorizations {
  token: string
}

interface IQueryUserMeReturn extends IQueryErrorReturn {
  data: {
    createdAt: string
    id: number
    name: string
    lastname: string
    email: string
    username: string
    phoneNumber: string
    referralCode: string
    idImage: string
    insuranceImage: string
    roles: {
      admin: boolean
      customer: boolean
      driver: boolean
      merchant: boolean
    },
    isManager: boolean
    ownerName: string
    updatedAt: string
    ranks: {
      type: TRANK
      earns: string
      percentage: string
      updatedAt: string
    }
  }
 | null
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
      ...data.data.user,
      sponsorId: data.data.user.sponsorId ?? null
    },
    error: null
  }
}
