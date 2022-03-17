import Head from 'next/head'
import { useRef } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { marketingArticlesDriver } from 'lib/utils/dataTest'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { ListArticles } from 'components/page/marketing/Details/ListArtcles'
import { Article } from 'components/page/marketing/Details/Article'

const { SEO } = APP_INFO

const DriversPage: Page = () => {
  const { current: articles } = useRef(marketingArticlesDriver)

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Marketing Drivers</title>
      </Head>

      <div className='text-center'>
        <span className='text-3xl font-bold'>Drivers</span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>Building your Business with a Few Clicks</span>

        <div className='mt-6'>
          <span className='font-semibold text-gray-800'>Now choose the arts you want to share</span>
        </div>
      </div>

      <ListArticles>
        {
          articles.map(article => (
            <Article
              key={article.id}
              id={article.id}
              title={article.title}
              subtitle={article.subtitle}
              description={article.description}
              imageSrc={article.imageSrc}
              hashtags={article.hashtags}
              linkToShare={article.linkToShare}
            />
          ))
        }
      </ListArticles>
    </>
  )
}

DriversPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default DriversPage
