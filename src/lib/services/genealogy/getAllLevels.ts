import { IQueryErrorReturn } from 'lib/types/http/query'
import { ILevel } from 'lib/types/genealogy'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    userId: number
    name: string
    levels: ILevel[]
  }
}

export const getAllLevels = async (
  userId: number,
  token: string,
  page: number
): Promise<IQueryReturn> => {
  const res = await fetch(`/api/unilevel/getAllLevels?userId=${userId}&includeUsers=1&limit=999999999&page=${page}`, {
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
