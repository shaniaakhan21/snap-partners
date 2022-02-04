import Head from 'next/head'
import { GetServerSideProps } from 'next'

// import type { Page } from 'lib/types'
import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { AuthPagesLayout } from 'layouts/public/Auth'
import { PAGE_INFO } from 'config'

import { SignUpCustomerForm, SignUpDriverForm } from 'components/page/signup/SignUpForm'
import { SelectRoleToSignUp } from 'components/page/signup/SelectRoleToSignUp'

const { SEO } = PAGE_INFO

const SignUpPage = ({ query, url, resolvedUrl }) => {
  const { referralCode: code, referralRole: role } = useHandlerReferralLink()

  console.log('SignUpPage review referralCode', code)
  console.log('SignUpPage getServerSideProps query', query)
  console.log('SignUpPage getServerSideProps url', url)
  console.log('SignUpPage getServerSideProps resolvedUrl', resolvedUrl)

  if (role === 'CUSTOMER') return <SignUpCustomerForm referralLink={{ code, role }} />
  if (role === 'DRIVER') return <SignUpDriverForm referralLink={{ code, role }} />

  return <SelectRoleToSignUp />
}

SignUpPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Sign Up</title>
    </Head>

    <AuthPagesLayout>
      {page}
    </AuthPagesLayout>
  </>
)

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  return {
    props: {
      query: ctx.query || null,
      url: ctx.req.url,
      resolvedUrl: ctx.resolvedUrl
    }
  }
}

export default SignUpPage
