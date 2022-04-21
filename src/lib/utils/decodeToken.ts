import jwtDecode, { JwtPayload } from 'jwt-decode'

interface IDecodedTokenAT extends JwtPayload {
  userId: number
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  }
  iat: number
}

interface IDecodedTokenReturnAT {
  userId: number
}

interface IDecodedTokenET extends JwtPayload {
  email: string
}

interface IDecodedTokenReturnET {
  email: string
}

export const decodeAccessToken = (token: string): IDecodedTokenReturnAT => {
  const decodedToken = jwtDecode<IDecodedTokenAT>(token)

  return { userId: decodedToken.userId }
}

export const decodeEmailToken = (token: string): IDecodedTokenReturnET => {
  const decodedToken = jwtDecode<IDecodedTokenET>(token)

  return { email: decodedToken.email }
}
