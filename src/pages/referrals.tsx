import Head from 'next/head'
import { ROLES } from 'config/roles'
import { PAGE_INFO } from 'config/pageInfo'
import { useAuthStore } from 'lib/stores'
import type { Page, ReactNode } from 'lib/types'

import DashboardLayout from 'layouts/private/Dashboard'
import { ReferralCards } from 'components/page/referrals/Cards'
import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'

const { SEO } = PAGE_INFO

const ReferralsPage: Page = () => {
  const { auth } = useAuthStore()

  return (
    <>
      <div className='min-h-[80vh] grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4'>
        <ReferralCards
          title='Refer Customers'
          ilustration={<CustomerIcon />}
          link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
          newUser
          classes='col-span-1'
        />
        <ReferralCards
          title='Driver'
          ilustration={<DriverIcon />}
          link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
          classes='col-span-1'
        />
        <ReferralCards
          title='Merchant Customers'
          ilustration={<MerchantIcon />}
          link={`${auth.referralLink}&role=${ROLES.RESTAURANT}` || 'With Out Link'}
          newUser
          classes='col-span-1'
        />
      </div>
    </>
  )
}

ReferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Referrals</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ReferralsPage
