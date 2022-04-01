import Head from 'next/head'
import { useRef, useState } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { marketingArticlesRest } from 'lib/utils/dataTest'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { ListArticles } from 'components/page/marketing/Details/ListArtcles'
import { Article } from 'components/page/marketing/Details/Article'
import { useAuthStore } from 'lib/stores'
import { FormToCreateArticle } from 'components/page/marketing/FormToCreateArticle'
import { Button } from 'components/common/Button'

const { SEO } = APP_INFO

const RestaurantsPage: Page = () => {
  const { current: articles } = useRef(marketingArticlesRest)
  const [showAdminArticleEditor, setShowAdminArticleEditor] = useState(false)
  const { auth } = useAuthStore()

  if (showAdminArticleEditor) {
    return (
      <div className='relative mt-10'>
        <div
          onClick={() => setShowAdminArticleEditor(false)}
          className='justify-self-end cursor-pointer text-xl font-bold hover:text-primary-500 w-fit h-fit absolute top-0 right-0'
        >
          X
        </div>

        <div className='text-center'>
          <span className='font-bold text-2xl'>Create Asset for Merchants</span>
        </div>

        <FormToCreateArticle typeMarketing='merchant' userAuth={auth} />
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Marketing Merchants</title>
      </Head>

      <div className='text-center'>
        <span className='text-3xl font-bold'>Merchants</span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>Building your Business with a Few Clicks</span>

        <div className='mt-6'>
          <span className='font-semibold text-gray-800'>Now choose the arts you want to share</span>
        </div>

        {
          auth.roles.admin && (
            <div className='text-left mt-4'>
              <Button
                classes='uppercase'
                onClick={() => setShowAdminArticleEditor(true)}
              >
                Create New Asset
              </Button>
            </div>
          )
        }
      </div>

      <ListArticles>
        {
          articles.map(article => (
            <Article
              key={article.id}
              id={article.id}
              title={article.title}
              subtitle={article.subtitle}
              isAuthAdmin={auth.roles.admin}
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

RestaurantsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default RestaurantsPage
