import { IQueryErrorReturn } from 'lib/types/http/query'

interface IArticleToCreate {
  image: File
  title: string
  subtitle: string
  caption: string
  hashtags: string // if we have more than one hashtag, we must separate with ; example: 'test;test;test'
}

export const createArticle = async (articleToCreate: IArticleToCreate, token: string): Promise<IQueryErrorReturn> => {
  const formData = new FormData()

  const entries = Object.entries(articleToCreate)

  entries.forEach(([key, value]) => formData.append(key, value))

  const res = await fetch('/api/marketing', {
    method: 'POST',
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
