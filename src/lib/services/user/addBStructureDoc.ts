import { IQueryErrorReturn } from 'lib/types/http/query'

interface IAddBStructureDoc {
    doc_b_structure: File
}

export const addBStructureDoc = async (token: string, dataBody: IAddBStructureDoc): Promise<IQueryErrorReturn> => {
  const formData = new FormData()
  const entries = Object.entries(dataBody)

  entries.forEach(([key, value]) => {
    formData.append(key, value)
  })

  const res = await fetch('/api/user/BStructureDocURL', {
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
