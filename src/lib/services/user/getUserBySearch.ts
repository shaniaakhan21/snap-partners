import { IUserBySearch } from 'lib/types/user'
import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: IUserBySearch[]
}

export const getUserBySearch = async (search, token: string): Promise<IQueryReturn> => {
  const res = await fetch(`/api/user/getUsersBySearch?search=${search}`, {
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
  console.log('data no formateada:', data.data.users)

  return {
    data: [...data.data.users],
    error: null
  }
}
