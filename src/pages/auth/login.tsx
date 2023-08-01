import Head from 'next/head'

import { APP_INFO } from 'config/appInfo'
import type { Page } from 'lib/types'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { LoginForm } from 'components/page/login/LoginForm'
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const LoginPage: Page = LoginForm

LoginPage.getLayout = (page) => {
  const { t } = useTranslation('auth')

  return (
    <AuthPagesLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('login-page.title')}</title>
      </Head>

      {page}
    </AuthPagesLayout>
  )
}

export default LoginPage
