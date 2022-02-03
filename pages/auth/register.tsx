import Head from 'next/head'

import { PAGE_INFO } from 'config'
import type { Page } from 'lib/types'
import AuthPagesLayout from 'layouts/public/Auth'
import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'

import { RegisterWithOutReferral } from 'components/page/register/RegisterWithReferral'
import { RegisterCustomerForm, RegisterDriverForm, RegisterRestaurantForm } from 'components/page/register/RegisterForm'

const { SEO } = PAGE_INFO

const RegisterPage: Page = () => {
  const { referralCode, referralRole } = useHandlerReferralLink()

  if (referralRole === 'CUSTOMER') return <RegisterCustomerForm referralUser={{ referralCode, role: referralRole }} />
  if (referralRole === 'RESTAURANT') return <RegisterRestaurantForm referralUser={{ referralCode, role: referralRole }} />
  if (referralRole === 'DRIVER') return <RegisterDriverForm referralUser={{ referralCode, role: referralRole }} />

  return <RegisterWithOutReferral/>
}

RegisterPage.getLayout = (page) => (
  <AuthPagesLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Register</title>
    </Head>

    {page}
  </AuthPagesLayout>
)

export default RegisterPage
