import Head from 'next/head'

import { APP_INFO } from 'config/appInfo'
import type { Page } from 'lib/types'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { LoginForm } from 'components/page/login/LoginForm'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const { SEO } = APP_INFO

const LoginPage: Page = () => <LoginForm/>

LoginPage.getLayout = (page) => (
  <AuthPagesLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Login</title>
    </Head>

    {page}
  </AuthPagesLayout>
)

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['auth', 'footer', 'common']))
    }
  }
}

export default LoginPage
