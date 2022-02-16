import createAtom from 'zustand'
import { removeLocalStorage } from 'lib/utils/localStorage'

interface ISignInProps {
  email: string
  name: string
  phone: string
  accessToken: string
  iat: number
  lastname: string
  referralCode: string | null
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  }
  id: number,
  username: string
}

interface IAuth extends ISignInProps {
  referralLink: string
}

interface IAuthAtom {
  auth: IAuth | null
  setAuth: ({ email, name, phone, accessToken, iat, lastname, roles, id, username, referralCode }: ISignInProps) => void
  removeAuth: () => void
}

export const useAuthStore = createAtom<IAuthAtom>(set => ({
  auth: null,

  setAuth: ({ email, name, phone, accessToken, iat, lastname, roles, id, username, referralCode }) => {
    set({
      auth: {
        email,
        name,
        phone,
        accessToken,
        iat,
        lastname,
        roles,
        id,
        username,
        referralCode,
        referralLink: referralCode ? `https://dev.snap.devopsteam.info/auth/signup?referralCode=${referralCode}` : null
      }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
