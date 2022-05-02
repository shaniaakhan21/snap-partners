import { IReport } from 'lib/types/overview'
import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
    data: IReport
}

export const getReport = async (token: string): Promise<IQueryReturn> => {
  const res = await fetch('/api/report', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return {
    data: data.data,
    error: null
  }
}
