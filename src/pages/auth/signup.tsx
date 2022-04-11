import { GetServerSideProps } from 'next'
// import fetch from 'node-fetch'
import Head from 'next/head'

import { useHandlerReferralLink } from 'lib/hooks/useHandlerReferralLink'
import { APP_INFO } from 'config/appInfo'

import { AuthPagesLayout } from 'layouts/public/Auth'
import { SignUpMerchantForm } from 'components/page/signup/SignUpForm/FormByRole/Merchant'
import { SignUpCustomerForm, SignUpDriverForm } from 'components/page/signup/SignUpForm'
import { SelectRoleToSignUp } from 'components/page/signup/SelectRoleToSignUp'
import { ROLES } from 'config/roles'

const { SEO } = APP_INFO

const SignUpPage = ({ rrssInfo }) => {
  const { referralCode: code, role } = useHandlerReferralLink()

  if (role === ROLES.CUSTOMER) return <SignUpCustomerForm referralLink={{ code, role }} />
  if (role === ROLES.DRIVER) return <SignUpDriverForm referralLink={{ code, role }} />
  if (role === ROLES.MERCHANT) return <SignUpMerchantForm referralLink={{ code, role }} />

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Sign Up</title>
        {
          rrssInfo && (
            <>
              <meta property='og:url' content={`${APP_INFO.SEO.URL_PAGE}/auth/signup`} />
              <meta key='twitterImage' property='twitter:image' content={rrssInfo.imageId} />
              <meta key='ogImage' property='og:image' content={rrssInfo.imageId} />
            </>
          )
        }
      </Head>
      <SelectRoleToSignUp />
    </>
  )
}

SignUpPage.getLayout = (page) => (
  <AuthPagesLayout>
    {page}
  </AuthPagesLayout>
)

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const marketingId = query.marketingId

  if (marketingId) {
    const res = await fetch(`https://dev.snap.devopsteam.info/api/marketing/${marketingId}`)
    const { data } = await res.json()

    return {
      props: {
        rrssInfo: data
      }
    }
  } else {
    return {
      props: {
        rrssInfo: null
      }
    }
  }
}

export default SignUpPage
