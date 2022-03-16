// IUserData is test interface to test/dataEmails
export type { IRANKS, TRANK } from './ranks'
export type { IROLES, TROLE } from './roles'
export type { IReferralLink } from './referralLink'
export interface IUserData {
  id: string
  name: string
  numUsers?: number
  email: string
  phone: string
}

export interface IUser {
  id: number,
  lastname: string,
  email: string,
  username: string,
  password: string,
  phoneNumber: string,
  name: string,
  sponsorId: number,
  roles: {
    customer: boolean,
    driver: boolean,
    merchant: boolean
  },
  referralCode: string,
  idImage: string,
  insuranceImage: string,
}
