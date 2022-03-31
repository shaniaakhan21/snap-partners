import { IQueryErrorReturn } from 'lib/types/http/query'

interface IArticleToUpdate {
  image: File
  title: string
  subtitle: string
  caption: string
  hashtags: string
}

export const updateArticle = async (articleToUpdate: IArticleToUpdate | string, token: string): Promise<IQueryErrorReturn> => {
  const formData = new FormData()

  const entries = Object.entries(articleToUpdate)

  entries.forEach(([key, value]) => formData.append(key, value))

  const res = await fetch('/api/marketing', {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })

  const data = await res.json()

  if (!res.ok) {
    return {
      error: {
        info: data.error,
        status: res.status
      }
    }
  }

  return { error: null }
}
