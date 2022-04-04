import { useEffect, useState } from 'react'

import { IMarketingArticle, TMarketingType } from 'lib/types/marketing'
import { getArticles } from 'lib/services/marketing/getArticles'
import { handleFetchError } from 'lib/utils/handleFetchError'

export const useMarketingArticles = (accessToken: string, typeMarketing: TMarketingType) => {
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<IMarketingArticle[]>([])

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data, error } = await getArticles(accessToken, typeMarketing)

      if (error) {
        handleFetchError(error.status, error.info)
        console.error(error)
        setLoading(false)
        return
      }

      setLoading(false)
      setArticles(data)
    })()
  }, [])

  return {
    articles,
    loading
  }
}
