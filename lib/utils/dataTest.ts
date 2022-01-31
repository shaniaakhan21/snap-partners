type TMarketingArticleDetail = {
  id: string
  imageSrc: string
  title: string
  subtitle: string
  description: string
  hashtags: string[]
  linkToShare: string
}

type TMarketingArticles = TMarketingArticleDetail[]

export const marketingArticles: TMarketingArticles = [
  {
    id: Math.random().toString(36).slice(2),
    imageSrc: '/images/logo.svg',
    title: 'Name of the image',
    subtitle: 'Subtitle text here',
    description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
    hashtags: ['#hashtags', '#here'],
    linkToShare: '#'
  },
  {
    id: Math.random().toString(36).slice(2),
    imageSrc: '/images/logo.svg',
    title: 'Name of the image',
    subtitle: 'Subtitle text here',
    description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
    hashtags: ['#hashtags', '#here'],
    linkToShare: '#'
  },
  {
    id: Math.random().toString(36).slice(2),
    imageSrc: '/images/logo.svg',
    title: 'Name of the image',
    subtitle: 'Subtitle text here',
    description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
    hashtags: ['#hashtags', '#here'],
    linkToShare: '#'
  },
  {
    id: Math.random().toString(36).slice(2),
    imageSrc: '/images/logo.svg',
    title: 'Name of the image',
    subtitle: 'Subtitle text here',
    description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
    hashtags: ['#hashtags', '#here'],
    linkToShare: '#'
  },
  {
    id: Math.random().toString(36).slice(2),
    imageSrc: '/images/logo.svg',
    title: 'Name of the image',
    subtitle: 'Subtitle text here',
    description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
    hashtags: ['#hashtags', '#here'],
    linkToShare: '#'
  },
  {
    id: Math.random().toString(36).slice(2),
    imageSrc: '/images/logo.svg',
    title: 'Name of the image',
    subtitle: 'Subtitle text here',
    description: 'Caption retales to the image so share as a idea how to promote the image in a more personal, and close way',
    hashtags: ['#hashtags', '#here'],
    linkToShare: '#'
  }
]
