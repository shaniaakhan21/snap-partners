import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    totalEarnings: number
    totalOrders: number
    estimatedCommissions: number
    myOrders: number
    payRank: string
    topMerchants: string
    topRestaurant: string
    topCustomer: string
    topDriver: string
  }
}

export const getReports = async (token: string): Promise<IQueryReturn> => {
  const res = await fetch('/api/report', {
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
