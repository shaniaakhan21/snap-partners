import createAtom from 'zustand'
import { removeLocalStorage } from 'lib/utils/localStorage'
import { APP_INFO } from 'config/appInfo'
import { IUserMe } from 'lib/types'

const { SEO } = APP_INFO

export interface IAuth extends IUserMe {
  referralLink?: string
  accessToken: string
}

interface IAuthAtom {
  auth: IAuth | null
  setAuth: ({
    accessToken,
    id,
    username,
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
    updatedAt
  }: IAuth) => void
  removeAuth: () => void
}

export const useAuthStore = createAtom<IAuthAtom>(set => ({
  auth: null,

  setAuth: ({
    accessToken,
    id,
    username,
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
    updatedAt
  }) => {
    set({
      auth: {
        accessToken,
        id,
        username,
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
        referralLink: referralCode ? `${SEO.URL_PAGE}/auth/signup?referralCode=${referralCode}` : null
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
