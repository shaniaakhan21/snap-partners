import { IQueryErrorReturn } from 'lib/types/http/query'

interface IDataBody {
  currentPassword: string
  newPassword: string
}

export const updateUserPassword = async (token: string, dataBody: IDataBody): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/user/password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(dataBody)
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        status: res.status,
        info: data.error
      }
    }
  }

  return { error: null }
}
