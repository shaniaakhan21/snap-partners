import { IQueryErrorReturn } from 'lib/types/http/query'
import { TRANK } from 'lib/types/user/ranks'

export const updateUserRank = async (userId, rankToUpdate: TRANK, token: string, byUser?: string): Promise<IQueryErrorReturn> => {
  const newByUser = byUser && byUser !== '' ? byUser : 'system'
  const res = await fetch('/api/rank/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ userId, rank: rankToUpdate, byUser: newByUser })
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
