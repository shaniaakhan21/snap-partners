import { setLocalStorage } from 'lib/utils/localStorage'
import { decodeAccessToken } from 'lib/utils/decodedAccessToken'
import { API } from 'config/api'

interface ILoginDataBody {
  username: string
  password: string
}

interface ILoginDataResponse {
  timestamp: number
  data: {
    success: true
    token: string
  } | null
  error: string | null
}

// type ILoginReturn = Promise<{
//   data: null;
//   error: {
//       message: string;
//       status: number;
//   };
// } | {
//   data: {
//       token: string;
//       email: string;
//       iat: number;
//       lastname: string;
//       name: string;
//       phoneNumber: string;
//       roles: string;
//       userId: number;
//       username: string;

//       iss?: string;
//       sub?: string;
//       aud?: string | string[];
//       exp?: number;
//       nbf?: number;
//       jti?: string;
//   };
//   error: null;
// }>

export const login = async (dataBody: ILoginDataBody) => {
  const res = await fetch('/api/authentication/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  })

  const data: ILoginDataResponse = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: data.error,
        status: res.status
      }
    }
  }

  const token = data.data.token
  setLocalStorage('accessToken', token)

  return {
    data: decodeAccessToken(token),
    error: null
  }
}
