import { GetStaticPaths, GetStaticProps } from 'next'
import { useState } from 'react'
import Head from 'next/head'

import { capitalizeFirstLetter } from 'lib/utils/capitalizeFirstLetter'
import { useMarketingArticles } from 'lib/hooks/useMarketingArticles'
import { TMarketingType } from 'lib/types/marketing'
import { APP_INFO } from 'config/appInfo'
import { useAuthStore } from 'lib/stores'

import DashboardLayout from 'layouts/private/Dashboard'
import { FormToCreateArticle } from 'components/page/marketing/FormToCreateArticle'
import { ListArticles } from 'components/page/marketing/Details/ListArtcles'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { Article } from 'components/page/marketing/Details/Article'
import { EmptyData } from 'components/common/empty/EmptyData'

const { SEO } = APP_INFO

const MarketingArticlePage = ({ typeMarketing }: { typeMarketing: TMarketingType }) => {
  const { auth } = useAuthStore()
  const [showAdminArticleEditor, setShowAdminArticleEditor] = useState(false)
  const { articles, loading } = useMarketingArticles(auth.accessToken, typeMarketing)

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
          <p className='font-bold text-2xl'>
            Create Asset for
            {
              typeMarketing !== 'ibo'
                ? <span className='capitalize'> {typeMarketing}s</span>
                : ' IBOs'
            }
          </p>
        </div>

        <FormToCreateArticle typeMarketing={typeMarketing} userAuth={auth} />
      </div>
    )
  }

  if (loading) return <SpinnerPageContent />

  if (articles.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen-80'>
        <EmptyData label='Marketing Articles Empty' />
      </div>
    )
  }

  return (
    <>
      <div className='text-center bg-white rounded-2xl py-4 lg:py-10 shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] px-2 lg:px-0'>
        <span className='text-xl lg:text-3xl font-bold'>
          {
            typeMarketing !== 'ibo'
              ? <span className='capitalize'> {typeMarketing}s</span>
              : ' IBOs'
          }
        </span> <br />
        <div className='lg:mt-4'>
          <span className='font-bold text-lg lg:text-2xl text-primary-500'>Building your Business with a Few Clicks</span>
        </div>
        <div className='lg:mt-2'>
          <span className='font-semibold text-xs lg:text-lg text-gray-800'>Now choose the arts you want to share</span>
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
          articles.map(article => {
            if (!article.title && !article.caption) return null

            return (
              <Article
                linkToShare={`${SEO.URL_PAGE}/share/${auth.referralCode}/${typeMarketing.toUpperCase()}/${article.id}`}
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
            )
          }
          )
        }
      </ListArticles>
    </>
  )
}

MarketingArticlePage.getLayout = (page) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Marketing {capitalizeFirstLetter(page.props.typeMarketing)}</title>
    </Head>

    {page}
  </DashboardLayout>
)

export const getStaticPaths: GetStaticPaths = async () => {
  const MARKETING_TYPES: TMarketingType[] = ['customer', 'driver', 'ibo', 'merchant']

  const paths = MARKETING_TYPES.map((type) => ({ params: { type } }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  return { props: { typeMarketing: params.type } }
}

export default MarketingArticlePage
