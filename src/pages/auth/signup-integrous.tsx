import Head from 'next/head'

import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { APP_INFO } from 'config/appInfo'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { SignUpINTEGROUSaSSOCIATEForm, SignUpINTEGROUScUSTOMERForm } from 'components/page/signup/SignUpForm'
import { SelectRoleForIntegrousSignUp } from 'components/page/signup/SelectRoleForIntegrousSignUp'
import { ROLES } from 'config/roles'

const { SEO } = APP_INFO

const IntegrousSignUpPage = () => {
  const { referralCode: code, role } = useHandlerReferralLink()

  if (role === ROLES.INTEGROUScUSTOMER) return <SignUpINTEGROUScUSTOMERForm referralLink={{ code, role }} />
  if (role === ROLES.INTEGROUSaSSOCIATE) return <SignUpINTEGROUSaSSOCIATEForm referralLink={{ code, role }} />
  return (<SelectRoleForIntegrousSignUp />)
}

IntegrousSignUpPage.getLayout = (page) => {
  return (
    <AuthPagesLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Sign Up</title>
      </Head>
      {page}
    </AuthPagesLayout>
  )
}

export default IntegrousSignUpPage
