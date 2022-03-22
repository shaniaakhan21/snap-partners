import { IQueryErrorReturn } from 'lib/types/http/query'

type IDataBody = any // !ESTO DEBE CAMBIARSE A UNA INTERFÁZ Y ADECUARLO.

export const updateUserRole = async (dataBody: IDataBody, token: string): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/rank/update', {
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
