import Head from 'next/head'

import type { Page } from 'lib/types'
import { AuthPagesLayout } from 'layouts/public/Auth'
import { PAGE_INFO } from 'config'

import { SignUpCustomerForm, SignUpDriverForm } from 'components/page/signup/SignUpForm'
import { SelectRoleToSignUp } from 'components/page/signup/SelectRoleToSignUp'
import { useRouter } from 'next/router'

const { SEO } = PAGE_INFO

const SignUpPage: Page = () => {
  const router = useRouter()

  if (router.query.referralRole === 'CUSTOMER') {
    return (
      <SignUpCustomerForm
        referralLink={{
          code: router.query.referralCode as string,
          role: router.query.referralRole as 'CUSTOMER' | 'DRIVER'
        }}
      />)
  }
  if (router.query.referralRole === 'DRIVER') {
    return <SignUpDriverForm
      referralLink={{
        code: router.query.referralCode as string,
        role: router.query.referralRole as 'CUSTOMER' | 'DRIVER'
      }}
    />
  }

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

export default SignUpPage
