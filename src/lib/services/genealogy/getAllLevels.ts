import { API } from 'config/api'
import { IQueryErrorReturn } from 'lib/types/query'
import { ILevel } from 'lib/types/genealogy'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    userId: number
    name: string
    levels: ILevel[]
  } | null
}

export const getAllLevels = async (
  token: string,
  userData: { username: string, userId: number }
): Promise<IQueryReturn> => {
  const res = await fetch(`${API.BASE_URL}/api/unilevel/getAllLevels?userId=${userData.userId}&includeUsers=1&name=x`, {
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
