import Head from 'next/head'

import type { Page } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { LoginForm } from 'components/page/login/LoginForm'

const { SEO } = PAGE_INFO

const LoginPage: Page = () => <LoginForm/>

LoginPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Login</title>
    </Head>

    <AuthPagesLayout>
      {page}
    </AuthPagesLayout>
  </>
)

export default LoginPage
