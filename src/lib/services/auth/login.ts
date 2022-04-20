import { setLocalStorage } from 'lib/utils/localStorage'
import { IQueryErrorReturn } from 'lib/types/http/query'
import { decodeAccessToken } from 'lib/utils/decodeAccessToken'

interface ILoginDataBody {
  username?: string
  email?: string
  phoneNumber?: string
  password: string
}

interface IQueryLoginReturn extends IQueryErrorReturn {
  data: {
    token: string,
    userId: number
  } | null
}

export const login = async (dataBody: ILoginDataBody): Promise<IQueryLoginReturn> => {
  const res = await fetch('/api/authentication/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataBody)
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  const token = data.data.token
  setLocalStorage('accessToken', token)
  const { userId } = decodeAccessToken(token)

  return {
    data: {
      ...data.data,
      userId
    },
    error: null
  }
}
