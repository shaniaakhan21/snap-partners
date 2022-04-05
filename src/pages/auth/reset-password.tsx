import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'

import { APP_INFO } from 'config/appInfo'
import { FormResetPassword } from 'components/page/reset-password/FormResetPassword'

const { SEO } = APP_INFO

const ResetPasswordPage = ({ token }: { token: string }) => {
  return <FormResetPassword token={token} />
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { token } = query

  if (!token) {
    return {
      notFound: true
    }
  }

  return {
    props: { token }
  }
}

ResetPasswordPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Reset Password</title>
    </Head>

    {page}
  </>
)

export default ResetPasswordPage
