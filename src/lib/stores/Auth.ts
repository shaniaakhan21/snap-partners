import createAtom from 'zustand'

import { removeLocalStorage } from 'lib/utils/localStorage'
import { APP_INFO } from 'config/appInfo'
import { IUserMe } from 'lib/types'

const { SEO } = APP_INFO

export interface INsurAccount {
  nsurAccount?: {
    myPoints: number
    nsurUserId: number
  }
}

export interface IAuth extends IUserMe, INsurAccount {
  referralLink?: string
  accessToken: string
  deleted: boolean
  blocked: boolean
}

export type TSetAuth = ({
  accessToken,
  id,
  username,
  password,
  email,
  name,
  lastname,
  phoneNumber,
  roles,
  isManager,
  referralCode,
  idImage,
  insuranceImage,
  createdAt,
  ownerName,
  ranks,
  updatedAt,
  nsurAccount,
  deleted,
  blocked,
  bank_information
}: IAuth) => void

interface IAuthAtom {
  auth: IAuth
  setAuth: ({
    accessToken,
    id,
    username,
    password,
    email,
    name,
    lastname,
    phoneNumber,
    roles,
    isManager,
    referralCode,
    idImage,
    insuranceImage,
    createdAt,
    ownerName,
    ranks,
    updatedAt,
    nsurAccount,
    blocked,
    deleted,
    bank_information
  }: IAuth) => void
  removeAuth: () => void
}

export const useAuthStore = createAtom<IAuthAtom>(set => ({
  auth: null,

  setAuth: ({
    accessToken,
    id,
    username,
    password,
    email,
    name,
    lastname,
    phoneNumber,
    roles,
    isManager,
    referralCode,
    idImage,
    insuranceImage,
    createdAt,
    ownerName,
    ranks,
    updatedAt,
    blocked,
    deleted,
    nsurAccount,
    bank_information
  }) => {
    set({
      auth: {
        accessToken,
        id,
        username,
        password,
        email,
        name,
        lastname,
        phoneNumber,
        roles,
        isManager,
        referralCode,
        idImage,
        insuranceImage,
        createdAt,
        ownerName,
        ranks,
        updatedAt,
        blocked,
        deleted,
        nsurAccount,
        referralLink: referralCode ? `${SEO.URL_PAGE}/auth/signup?referralCode=${referralCode}` : null,
        bank_information
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
