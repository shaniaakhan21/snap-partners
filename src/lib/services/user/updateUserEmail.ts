import { IQueryErrorReturn } from 'lib/types/http/query'

interface NewEmail {
  newEmail: string
}

interface IDataBodyUpdate extends NewEmail{
  currentEmail: string
}

interface IDataBodySend extends NewEmail {
  domain: string
}

export const sendEmailToConfirm = async (token: string, dataBody: IDataBodySend): Promise<IQueryErrorReturn> => {
  const res = await fetch('/api/user/email', {
    method: 'POST',
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

export const updateUserEmail = async (token: string, dataBody: IDataBodyUpdate): Promise<IQueryErrorReturn> => {
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
