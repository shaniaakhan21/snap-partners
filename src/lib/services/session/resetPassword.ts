import { IQueryErrorReturn } from 'lib/types/query'

export const resetPassword = async (email: string): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/authentication/resetPassword', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email })
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
