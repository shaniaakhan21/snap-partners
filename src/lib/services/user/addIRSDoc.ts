import { IQueryErrorReturn } from 'lib/types/http/query'

interface IAddIRSDocs {
  doc_irs: File
}

export const addIRSDocs = async (token: string, dataBody: IAddIRSDocs): Promise<IQueryErrorReturn> => {
  const formData = new FormData()
  const entries = Object.entries(dataBody)

  entries.forEach(([key, value]) => {
    formData.append(key, value)
  })

  const res = await fetch('/api/user/IRSDocURL', {
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
