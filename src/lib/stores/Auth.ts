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
  referralLinkWeightCare?:string
  accessToken: string
  deleted: boolean
  blocked: boolean
  level?:string
  isCertified?: boolean
  isValidated?: boolean
  socialSecurityNumber: string
  SSNDocURL?: string
  doc_irs?: string
  doc_b_structure?: string
  TINstatus?: string
  newSSN?: string
  business_approved?: boolean
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
  level,
  isCertified,
  isValidated,
  street,
  state,
  city,
  zip,
  dateOfBirth,
  SSNDocURL,
  doc_irs,
  doc_b_structure,
  TINstatus,
  newSSN,
  ein,
  businessName,
  business_type,
  b_start_date,
  business_approved
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
    isCertified,
    isValidated,
    facebook_url,
    twitter_url,
    linkedin_url,
    instagram_url,
    street,
    state,
    city,
    zip,
    dateOfBirth,
    SSNDocURL,
    doc_irs,
    doc_b_structure,
    TINstatus,
    newSSN,
    ein,
    businessName,
    business_type,
    b_start_date,
    business_approved
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
    isCertified,
    isValidated,
    facebook_url,
    twitter_url,
    linkedin_url,
    instagram_url,
    street,
    state,
    city,
    zip,
    dateOfBirth,
    SSNDocURL,
    doc_irs,
    doc_b_structure,
    TINstatus,
    newSSN,
    ein,
    businessName,
    business_type,
    b_start_date,
    business_approved
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
        referralLink: referralCode ? `${SEO.URL_PAGE}auth/signup?referralCode=${referralCode}` : null,
        referralLinkWellness: referralCode ? `${SEO.URL_PAGE}wellness?referralCode=${referralCode}` : null,
        referralLinkWeightCare: referralCode ? `${SEO.URL_PAGE}WeightCare?referralCode=${referralCode}` : null,
        bank_information,
        level,
        isCertified,
        isValidated,
        facebook_url,
        twitter_url,
        linkedin_url,
        instagram_url,
        street,
        state,
        city,
        zip,
        dateOfBirth,
        SSNDocURL,
        doc_irs,
        doc_b_structure,
        TINstatus,
        newSSN,
        ein,
        businessName,
        business_type,
        b_start_date,
        business_approved
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
