import Head from 'next/head'

import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { APP_INFO } from 'config/appInfo'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { SignUpintegrousAssociateForm, SignUpintegrousCustomerForm } from 'components/page/signup/SignUpForm'
import { SelectRoleForIntegrousSignUp } from 'components/page/signup/SelectRoleForIntegrousSignUp'
import { ROLES } from 'config/roles'
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const IntegrousSignUpPage = () => {
  const { referralCode: code, role } = useHandlerReferralLink()

  if (role === ROLES.integrousCustomer) return <SignUpintegrousCustomerForm referralLink={{ code, role }} />
  if (role === ROLES.integrousAssociate) return <SignUpintegrousAssociateForm referralLink={{ code, role }} />
  return (<SelectRoleForIntegrousSignUp />)
}

IntegrousSignUpPage.getLayout = (page) => {
  const { t } = useTranslation('auth')

  return (
    <AuthPagesLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('signup-title')}</title>
      </Head>
      {page}
    </AuthPagesLayout>
  )
}

export default IntegrousSignUpPage
