import { IQueryErrorReturn } from 'lib/types/http/query'

interface IAddVerificationDocuments {
  image: File
}

export const addVerificationDocuments = async (token: string, dataBody: IAddVerificationDocuments): Promise<IQueryErrorReturn> => {
  const formData = new FormData()
  const entries = Object.entries(dataBody)

  entries.forEach(([key, value]) => {
    formData.append(key, value)
  })

  const res = await fetch('/api/user/SSNDocURL', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
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