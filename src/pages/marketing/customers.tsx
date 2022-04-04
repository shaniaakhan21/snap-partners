import Head from 'next/head'
import { useEffect, useState } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { ListArticles } from 'components/page/marketing/Details/ListArtcles'
import { Article } from 'components/page/marketing/Details/Article'
import { useAuthStore } from 'lib/stores'
import { FormToCreateArticle } from 'components/page/marketing/FormToCreateArticle'
import { getArticles } from 'lib/services/marketing/getArticles'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IMarketingArticle } from 'lib/types/marketing'
import { Spinner } from 'components/common/loaders'
import { EmptyData } from 'components/common/EmptyData'

const { SEO } = APP_INFO

const CustomersPage: Page = () => {
  const [showAdminArticleEditor, setShowAdminArticleEditor] = useState(false)
  const [loading, setLoading] = useState(false)
  const [articles, setArticles] = useState<IMarketingArticle[]>([])
  const { auth } = useAuthStore()

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data, error } = await getArticles(auth.accessToken, 'customer')

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
          <span className='font-bold text-2xl'>Create Asset for Customers</span>
        </div>

        <FormToCreateArticle typeMarketing='customer' userAuth={auth} />
      </div>
    )
  }

  if (loading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (articles.length === 0) {
    return (
      <div className='flex justify-center items-center h-[70vh]'>
        <EmptyData label='Marketing Articles Empty' />
      </div>
    )
  }

  return (
    <>
      <div className='text-center'>
        <span className='text-3xl font-bold'>Customers</span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>Building your Business with a Few Clicks</span>

        <div className='mt-6'>
          <span className='font-semibold text-gray-800'>Now choose the arts you want to share</span>
        </div>

        {/* {
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
        } */}
      </div>

      <ListArticles>
        {
          articles.map(article => (
            <Article
              linkToShare={`${auth.referralLink}&MarketingId=${article.id}`}
              createdAt={article.createdAt}
              updatedAt={article.updatedAt}
              type={article.type}
              key={article.id}
              id={article.id}
              title={article.title}
              subtitle={article.subtitle}
              caption={article.caption}
              imageId={article.imageId}
              hashtags={article.hashtags}
              isAuthAdmin={auth.roles.admin}
            />
          ))
        }
      </ListArticles>
    </>
  )
}

CustomersPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Marketing Customers</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default CustomersPage
