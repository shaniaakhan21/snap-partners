import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    nsurUserId: number
  }
}

export const connectNsurAccount = async (email: string, password: string): Promise<IQueryReturn> => {
  const res = await fetch('/api/nsur/checkUser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })

  const { data } = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        info: data.error,
        status: res.status
      }
    }
  }

  return {
    data,
    error: null
  }
}
