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

export const login = async (data: ILoginDataBody) => {
  const res = await fetch(`${API.BASE_URL}/api/authentication/login`, {
    method: 'POST',
    body: JSON.stringify(data)
  })

  const dataObj: ILoginDataResponse = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        message: dataObj.error,
        status: res.status
      }
    }
  }

  return {
    data: dataObj,
    error: null
  }
}
