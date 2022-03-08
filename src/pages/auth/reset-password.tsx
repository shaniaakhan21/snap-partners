import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PAGE_INFO } from 'config/pageInfo'

const { SEO } = PAGE_INFO

const ResetPasswordPage = ({ token }) => {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl text-center font-bold">RESET PASSWORD PAGE</h1>
      <p className='text-xl mt-8'>Token: {token}</p>
    </section>
  )
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
  <Head>
    <title>{SEO.TITLE_PAGE} - Reset Password</title>
  </Head>
)

export default ResetPasswordPage
