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

const SignUpPage = () => {
  const { referralCode: code, role } = useHandlerReferralLink()

  if (role === ROLES.CUSTOMER) return <SignUpCustomerForm referralLink={{ code, role }} />
  if (role === ROLES.DRIVER) return <SignUpDriverForm referralLink={{ code, role }} />
  if (role === ROLES.MERCHANT) return <SignUpMerchantForm referralLink={{ code, role }} />

  return <SelectRoleToSignUp />
}

SignUpPage.getLayout = (page) => {
  return (
    <AuthPagesLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Sign Up</title>
        {
          page.props.rrssInfo && (
            <>
              <meta name='title' content={page.props.rrssInfo.title} />
              <meta name='description' content={page.props.rrssInfo.caption} />
              <meta property='og:type' content='website' />
              <meta property='og:url' content={`${APP_INFO.SEO.URL_PAGE}/share/${page.props.referralCode}/${page.props.role}/${page.props.marketingId}`} />
              <meta property='og:title' content={page.props.rrssInfo.title} />
              <meta property='og:description' content={page.props.rrssInfo.caption} />
              <meta property='og:image' content={page.props.rrssInfo.imageId} />
              <meta property='twitter:url' content={`${APP_INFO.SEO.URL_PAGE}/share/${page.props.referralCode}/${page.props.role}/${page.props.marketingId}`} />
              <meta property='twitter:title' content={page.props.rrssInfo.title} />
              <meta property='twitter:image' content={page.props.rrssInfo.imageId} />
              <meta property='twitter:description' content={page.props.rrssInfo.caption} />
            </>
          )
        }
      </Head>

      {page}
    </AuthPagesLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params, resolvedUrl }) => {
  const marketingId = params.marketingId
  const referralCode = params.referralCode
  const role = params.role

  if (marketingId) {
    const res = await fetch(`${APP_INFO.SEO.URL_PAGE}/api/marketing/${marketingId}`)
    const { data } = await res.json()

    return {
      props: {
        rrssInfo: data,
        marketingId,
        referralCode,
        role
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