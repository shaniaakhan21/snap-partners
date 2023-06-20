import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { APP_INFO } from 'config/appInfo'
import { FormResetPassword } from 'components/page/reset-password/FormResetPassword'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {useTranslation} from "next-i18next";

const { SEO } = APP_INFO

const ResetPasswordPage = ({ token }: { token: string }) => {
  return <FormResetPassword token={token} />
}

export const getServerSideProps: GetServerSideProps = async ({ query, locale }: GetServerSidePropsContext) => {
  const { token } = query

  if (!token) {
    return {
      notFound: true
    }
  }

  return {
    props: { token, ...(await serverSideTranslations(locale, ['auth', ...APP_INFO.COMMON_NS_LIST])) }
  }
}

ResetPasswordPage.getLayout = (page) => {
  const { t } = useTranslation('auth')

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('resetpw-page.title')}</title>
      </Head>

      {page}
    </>
  )
}

export default ResetPasswordPage
