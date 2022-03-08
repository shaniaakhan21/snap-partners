import { IQueryErrorReturn } from 'lib/types/query'

export const resetPasswordStepOne = async (email: string): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/authentication/resetPasswordStepOne', {
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

export const resetPasswordStepTwo = async (password: string, token: string): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/authentication/resetPasswordStepTwo', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ password })
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
