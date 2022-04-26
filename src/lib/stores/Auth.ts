import createAtom from 'zustand'
import { removeLocalStorage } from 'lib/utils/localStorage'
import { APP_INFO } from 'config/appInfo'
import { IUserMe } from 'lib/types'

const { SEO } = APP_INFO

export interface INsurAccount {
  nsurAccount?: {
    myPoints: number
  }
}

export interface IAuth extends IUserMe, INsurAccount {
  referralLink?: string
  accessToken: string
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
  nsurAccount
}: IAuth) => void

interface IAuthAtom {
  auth: IAuth | null
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
    nsurAccount
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
    nsurAccount
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
        nsurAccount,
        referralLink: referralCode ? `${SEO.URL_PAGE}/auth/signup?referralCode=${referralCode}` : null
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
