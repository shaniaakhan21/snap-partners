import { GetServerSideProps, GetServerSidePropsContext } from 'next'

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

export default ResetPasswordPage
