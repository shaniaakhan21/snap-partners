import { IQueryErrorReturn } from 'lib/types/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    id: 1,
    email: string,
    phoneNumber: string,
    sponsorId: number | null,
  } | null
}
// ? This interface will be change.

export const getUserById = async (id: number | string, token: string): Promise<IQueryReturn> => {
  const res = await fetch(`/api/user/getUserById?id=${id}`, {
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
