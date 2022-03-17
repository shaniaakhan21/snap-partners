// IUserData is test interface to test/dataEmails
// import { IRANKS } from './ranks'

import type { TRANK } from './ranks'
export type { IROLES, TROLE } from './roles'
export type { IReferralLink } from './referralLink'

export interface IUserData {
  id: string
  name: string
  numUsers?: number
  email: string
  phone: string
}

export interface IUserCommonData {
  id: number
  name: string
  lastname: string
  email: string
  username: string
  phoneNumber: string
  referralCode: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  },
  isManager: boolean // ?
  ownerName: string
  updatedAt: string
  ranks: {
    type: TRANK
    earns: string
    percentage: string
    updatedAt: string
  } | null
}

export interface IUserById extends IUserCommonData {
  sponsor: string | null
}

export interface IUserMe extends IUserCommonData {
  createdAt: string
  idImage: string
  insuranceImage: string
}
