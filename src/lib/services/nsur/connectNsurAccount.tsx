import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: { points: number }
}

export const connectNsurAccount = async (email: string, username: string): Promise<IQueryReturn> => {
  const res = await fetch('/api/nsur', {
    method: 'POST',
    body: JSON.stringify({ email, username })
  })

  const data = await res.json()

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
    data: data.data,
    error: null
  }
}
