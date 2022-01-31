import { setLocalStorage } from 'lib/utils/localStorage'
import createAtom from 'zustand'

type IAuth = {
  email: string
  name: string
  phone: string
  accessToken: string
  refreshToken: string
}

type TSignInProps = {
  email: string
  name: string
  phone: string
  accessToken: string
  refreshToken: string
}

interface IAuthAtom {
  auth: IAuth | null
  signIn: ({ email, name, phone, accessToken, refreshToken }: TSignInProps) => void
  signOut: () => void
  createAccout: ({ email, name, phone, accessToken, refreshToken }: TSignInProps) => void

}

export const useAuthStore = createAtom<IAuthAtom>(set => ({
  auth: null,

  signIn: ({ email, name, phone, accessToken, refreshToken }) => {
    setLocalStorage('accessToken', accessToken)
    setLocalStorage('refreshToken', refreshToken)

    set({
      auth: { email, name, phone, accessToken, refreshToken }
    })
  },

  signOut: () => set({ auth: null }),

  createAccout: ({ email, name, phone, accessToken, refreshToken }) => {
    set({
      auth: { email, name, phone, accessToken, refreshToken }
    })
  }
}))
