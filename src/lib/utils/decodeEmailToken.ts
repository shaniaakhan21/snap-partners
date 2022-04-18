import jwtDecode, { JwtPayload } from 'jwt-decode'

interface IDecodedToken extends JwtPayload {
  email: string
}

interface IDecodedTokenReturn {
  email: string
}

export const decodeEmailToken = (token: string): IDecodedTokenReturn => {
  const decodedToken = jwtDecode<IDecodedToken>(token)

  return { email: decodedToken.email }
}
