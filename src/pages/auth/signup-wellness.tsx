import Head from 'next/head'

import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { APP_INFO } from 'config/appInfo'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { SignUpCustomerForm } from 'components/page/signup/SignUpForm'
import { SelectRoleForWellnessSignUp } from 'components/page/signup/SelectRoleForWellnessSignUp'
import { ROLES } from 'config/roles'
import { SignUpIBOForm } from 'components/page/signup/SignUpForm/FormByRole/ibo'

const { SEO } = APP_INFO

const WellnessSignUpPage = () => {
  const { referralCode: code, role } = useHandlerReferralLink()

  if (role === ROLES.CUSTOMER) return <SignUpCustomerForm referralLink={{ code, role }} />
  if (role === ROLES.IBO) return <SignUpIBOForm referralLink={{ code, role }} />
  return (< SelectRoleForWellnessSignUp />)
}

WellnessSignUpPage.getLayout = (page) => {
  return (
    <AuthPagesLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Sign Up</title>
      </Head>
      {page}
    </AuthPagesLayout>
  )
}

export default WellnessSignUpPage
