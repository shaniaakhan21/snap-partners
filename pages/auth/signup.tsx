import Head from 'next/head'

import type { Page } from 'lib/types'
import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { AuthPagesLayout } from 'layouts/public/Auth'
import { PAGE_INFO } from 'config'

import { SignUpCustomerForm, SignUpDriverForm } from 'components/page/signup/SignUpForm'
import { SelectRoleToSignUp } from 'components/page/signup/SelectRoleToSignUp'

const { SEO } = PAGE_INFO

const SignUpPage: Page = () => {
  const { referralCode: code, referralRole: role } = useHandlerReferralLink()

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

export default SignUpPage
