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
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const MarketingArticlePage = ({ typeMarketing }: { typeMarketing: TMarketingType }) => {
  const { t } = useTranslation()
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
      <div className='text-center'>
        <span className='text-3xl font-bold'>
          {t(`marketing:page-${typeMarketing}.heading`)}
        </span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>{t(`marketing:page-${typeMarketing}.subtitle`)}</span>

        <div className='mt-6'>
          <span className='font-semibold text-gray-800'>{t(`marketing:page-${typeMarketing}.desc`)}</span>
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

      <ListArticles>

      </ListArticles>
    </>
  )
}

MarketingArticlePage.getLayout = (page) => {
  const { t } = useTranslation()
  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Marketing {t(`marketing:page-${page.props.typeMarketing}.heading`)}</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const MARKETING_TYPES: TMarketingType[] = ['customer', 'driver', 'ibo', 'merchant']

  const paths = MARKETING_TYPES.map((type) => ({ params: { type } }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  return { props: { typeMarketing: params.type } }
}

export default MarketingArticlePage
