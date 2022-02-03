import Head from 'next/head'
import { PAGE_INFO } from 'config'

import type { Page } from 'lib/types'
import { LoginForm } from 'components/page/login/LoginForm'
import AuthPagesLayout from 'layouts/public/Auth'
const { SEO } = PAGE_INFO

const LoginPage: Page = () => {
  return <LoginForm/>
}

LoginPage.getLayout = (page) => (
  <AuthPagesLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Login</title>
    </Head>

    {page}
  </AuthPagesLayout>
)

export default LoginPage
