import { IQueryErrorReturn } from 'lib/types/http/query'
import { IMarketingArticle, TMarketingType } from 'lib/types/marketing'

interface IQueryArticlesReturn extends IQueryErrorReturn {
  data: IMarketingArticle[]
}

export const getArticles = async (token: string, type: TMarketingType): Promise<IQueryArticlesReturn> => {
  const res = await fetch(`/api/marketing?page=1&limit=9999&type=${type}`, {
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
