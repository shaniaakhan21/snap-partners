import Head from 'next/head'

import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { APP_INFO } from 'config/appInfo'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { SignUpMerchantForm } from 'components/page/signup/SignUpForm/FormByRole/Merchant'
import { SignUpCustomerForm, SignUpDriverForm, SignUpAgentForm } from 'components/page/signup/SignUpForm'
import { SelectRoleToSignUp } from 'components/page/signup/SelectRoleToSignUp'
import { ROLES } from 'config/roles'
import {SignUpIBOForm} from "../../components/page/signup/SignUpForm/FormByRole/ibo";

const { SEO } = APP_INFO

const SignUpPage = () => {
  const { referralCode: code, role } = useHandlerReferralLink()

  if (role === ROLES.CUSTOMER) return <SignUpCustomerForm referralLink={{ code, role }} />
  if (role === ROLES.DRIVER) return <SignUpDriverForm referralLink={{ code, role }} />
  if (role === ROLES.MERCHANT) return <SignUpMerchantForm referralLink={{ code, role }} />
  if (role === ROLES.AGENT) return <SignUpAgentForm referralLink={{ code, role }} />
  if (role === ROLES.IBO) return <SignUpIBOForm referralLink={{ code, role }} />

  return (<SelectRoleToSignUp />)
}

SignUpPage.getLayout = (page) => {
  return (
    <AuthPagesLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Sign Up</title>
      </Head>
      {page}
    </AuthPagesLayout>
  )
}

export default SignUpPage
