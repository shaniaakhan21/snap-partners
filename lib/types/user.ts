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
