import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    totalAmount: number
  }
}

export const getMyPoints = async (userId: number, token: string): Promise<IQueryReturn> => {
  const res = await fetch(`/api/point/amount?userId=${userId}`, {
    headers: { Authorization: `Bearer ${token}` }
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
