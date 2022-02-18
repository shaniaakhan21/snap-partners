import jwtDecode, { JwtPayload } from 'jwt-decode'

interface IDecodedToken extends JwtPayload {
  userId: number
  roles: {
    admin: boolean
    customer: boolean
    driver: boolean
    merchant: boolean
  }
  iat: number
}

interface IDecodedTokenReturn {
  userId: number
}

export const decodeAccessToken = (token: string): IDecodedTokenReturn => {
  const decodedToken = jwtDecode<IDecodedToken>(token)

  return { userId: decodedToken.userId }
}
