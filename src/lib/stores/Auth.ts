import createAtom from 'zustand'
import { removeLocalStorage } from 'lib/utils/localStorage'

type TSignInProps = {
  email: string
  name: string
  phone: string
  accessToken: string
  iat: number
  lastname: string
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  }
  id: number,
  username: string
}

interface IAuthAtom {
  auth: TSignInProps | null
  setAuth: ({ email, name, phone, accessToken, iat, lastname, roles, id, username }: TSignInProps) => void
  removeAuth: () => void
}

export const useAuthStore = createAtom<IAuthAtom>(set => ({
  auth: null,

  setAuth: ({ email, name, phone, accessToken, iat, lastname, roles, id, username }) => {
    set({
      auth: { email, name, phone, accessToken, iat, lastname, roles, id, username }
    })
  },

  removeAuth: () => {
    removeLocalStorage('accessToken')
    set({ auth: null })
  }
}))
