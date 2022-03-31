import { IQueryErrorReturn } from 'lib/types/http/query'

interface IQueryArticlesReturn extends IQueryErrorReturn {
  data: [
    {
      hashtags: string[]
      createdAt: string
      id: number
      title: string
      subtitle: string
      caption: string
      imageId: string
      updatedAt: string
    }
  ] | null
}

export const getArticles = async (token: string): Promise<IQueryArticlesReturn> => {
  const res = await fetch('/api/marketing?page=1&limit=9999', {
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
