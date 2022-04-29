import { IQueryErrorReturn } from 'lib/types/http/query'

interface IPointHistory {
  createdAt: string
  id: number
  description: string
  amount: string
  userId: number
  updatedAt: string
}

interface IQueryReturn extends IQueryErrorReturn {
  data: IPointHistory[]
}

export const getHistoryPoints = async (userId: number, token: string, limit: number, page: number): Promise<IQueryReturn> => {
  const res = await fetch(`/api/point/history?limit=${limit}&page${page}${userId && `&userId=${userId}`}`, {
    headers: { Authorization: `Bearer ${token}` }
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
