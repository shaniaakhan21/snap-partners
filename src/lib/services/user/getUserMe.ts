import { IQueryErrorReturn } from 'lib/types/http/query'
import { TRANK } from 'lib/types/user/ranks'

interface IAuthorizations {
  token: string
}

interface IQueryUserMeReturn extends IQueryErrorReturn {
  data: {
    TINstatus?: string
    dateOfBirth: Date
    socialSecurityNumber: string
    createdAt: string
    id: number
    name: string
    lastname: string
    password: string
    email: string
    username: string
    phoneNumber: string
    referralCode: string
    idImage: string
    insuranceImage: string
    profileImage: string
    street: string
    city: string
    state: string
    zip: string
    roles: {
      admin: boolean
      customer: boolean
      driver: boolean
      merchant: boolean
      agent: boolean
      ibo: boolean
      integrousAssociate: boolean
      integrousCustomer: boolean
    },
    isManager: boolean
    ownerName: string
    updatedAt: string
    ranks: {
      type: TRANK
      earns: string
      percentage: string
      updatedAt: string
    },
    deleted: boolean,
    blocked: boolean,
    driver_status: boolean | null,
    nsurUserId: number,
    bank_information: {
      city: string,
      state: string
      abartn: string
      postCode: string
      firstLine: string
      legalType: string
      accountType: string
      accountNumber: string
      accountHolderName: string
    },
    level?: string,
    isCertified?: boolean
    isValidated?: boolean
    SSNDocURL?: string
    doc_irs?: string
    doc_b_structure?: string
  }
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
    data: { ...data.data.user },
    error: null
  }
}
