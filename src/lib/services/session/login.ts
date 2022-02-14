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
  const res = await fetch('http://snap150.snap.devopsteam.info:9090/api/authentication/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })

  console.log(res)

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
