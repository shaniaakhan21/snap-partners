export interface IMarketingArticle {
  hashtags: string[]
  createdAt: string
  id: number
  title: string
  subtitle: string
  caption: string
  imageId: string
  type: string
  updatedAt: string
}

export type TMarketingType = 'customer' | 'driver' | 'merchant' | 'ibo'
