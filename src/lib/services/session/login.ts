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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  if (!res?.ok) {
    return {
      data: null,
      error: {
        message: 'Error Login',
        status: res.status
      }
    }
  }

  const dataObj: ILoginDataResponse = await res.json()

  return {
    data: dataObj,
    error: null
  }
}
