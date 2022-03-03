import createAtom from 'zustand'
import { removeLocalStorage } from 'lib/utils/localStorage'

interface ISignInProps {
  accessToken: string
  id: number,
  username: string
  email: string
  name: string
  lastname: string
  phone: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  }
  isManager: boolean
  referralCode: string | null
  sponsorId: number | null
  idImage: string | null,
  insuranceImage: string | null,
}

export interface IAuth extends ISignInProps {
  referralLink: string
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
    phone,
    roles,
    isManager,
    referralCode,
    sponsorId,
    idImage,
    insuranceImage
  }: ISignInProps) => void
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
    phone,
    roles,
    isManager,
    referralCode,
    sponsorId,
    idImage,
    insuranceImage
  }) => {
    set({
      auth: {
        accessToken,
        id,
        username,
        email,
        name,
        lastname,
        phone,
        roles,
        isManager,
        referralCode,
        sponsorId,
        idImage,
        insuranceImage,
        referralLink: referralCode ? `https://dev.snap.devopsteam.info/auth/signup?referralCode=${referralCode}` : null
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
