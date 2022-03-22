import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data : {
    createdAt: string
    id: number
    state: number
    type: number
    description: string
    amount: number
    userId: number
    updatedAt: string
    user: {
        id: number,
        name: string,
        lastname: string
    }
  }[] | null
}

export const getWallet = async (token: string, userId: number, page: number): Promise<IQueryReturn> => {
  const res = await fetch(`/api/wallet/${userId}?limit=3?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
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
