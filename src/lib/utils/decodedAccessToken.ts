import jwtDecode from 'jwt-decode'

// interface IDecodedToken extends JwtPayload {
//   email: string
//   iat: number
//   lastname: string
//   name: string
//   phoneNumber: string
//   roles: string | {
//     admin: boolean
//     customer: boolean
//     driver: boolean
//     merchant: boolean
//   }
//   userId: number
//   username: string
// }

export const decodeAccessToken = (token: string) => {
  const decodedToken = jwtDecode<any>(token)
  const roles = decodedToken.roles
  decodedToken.roles = typeof roles === 'string' ? JSON.parse(roles) : roles

  return {
    ...decodedToken,
    token
  }
}
