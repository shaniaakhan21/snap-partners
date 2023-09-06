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
  referralLinkWellness?: string
  accessToken: string
  deleted: boolean
  blocked: boolean
  level?:string
}

export type TSetAuth = ({
  socialSecurityNumber,
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
  bank_information,
  level
}: IAuth) => void

interface IAuthAtom {
  auth: IAuth
  setAuth: ({
    socialSecurityNumber,
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
    profileImage,
    createdAt,
    ownerName,
    ranks,
    updatedAt,
    nsurAccount,
    blocked,
    deleted,
    bank_information,
    level,
    facebook_url,
    twitter_url,
    linkedin_url,
    instagram_url
  }: IAuth) => void
  removeAuth: () => void
}

export const useAuthStore = createAtom<IAuthAtom>(set => ({
  auth: null,

  setAuth: ({
    socialSecurityNumber,
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
    driver_status,
    idImage,
    insuranceImage,
    profileImage,
    createdAt,
    ownerName,
    ranks,
    updatedAt,
    blocked,
    deleted,
    nsurAccount,
    bank_information,
    level,
    facebook_url,
    twitter_url,
    linkedin_url,
    instagram_url
  }) => {
    set({
      auth: {
        socialSecurityNumber,
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
        driver_status,
        idImage,
        insuranceImage,
        profileImage,
        createdAt,
        ownerName,
        ranks,
        updatedAt,
        blocked,
        deleted,
        nsurAccount,
        referralLink: referralCode ? `${SEO.URL_PAGE}/auth/signup?referralCode=${referralCode}` : null,
        referralLinkWellness: referralCode ? `${SEO.URL_PAGE}/auth/signup-wellness?redirectToWellness=true&referralCode=${referralCode}` : null,
        bank_information,
        level,
        facebook_url,
        twitter_url,
        linkedin_url,
        instagram_url
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
