import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryReturn extends IQueryErrorReturn {
  data: {
    hashtags: string[]
    createdAt: string
    id: number
    title: string
    subtitle: string
    caption: string
    imageId: string
    updatedAt: string
  }
}

export const getArticleById = async (id: number, token: string): Promise<IQueryReturn> => {
  const res = await fetch(`/api/marketing?id=${id}`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` }
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      data: null,
      error: {
        info: data.error,
        status: res.status
      }
    }
  }

  return {
    data: data.data,
    error: null
  }
}
