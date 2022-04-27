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
      date: string
      time: string
  }[]
}

export const getWallet = async (token: string, userId: number, page: number): Promise<IQueryReturn> => {
  const res = await fetch(`/api/wallet/${userId}?limit=999&page=${page}`, {
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

  const walletDataNormalized = data.data.map(walletDataItem => {
    const dateAndTimeArr = walletDataItem.createdAt.split(' ')

    return {
      ...walletDataItem,
      date: dateAndTimeArr[0],
      time: dateAndTimeArr[1]
    }
  })

  return {
    data: walletDataNormalized,
    error: null
  }
}
