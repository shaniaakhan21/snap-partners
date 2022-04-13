import { IQueryErrorReturn } from 'lib/types/http/query'

interface IDataBody {
  currentEmail: string
  newEmail: string
}

export const updateUserEmail = async (token: string, dataBody: IDataBody): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/user/email', {
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
