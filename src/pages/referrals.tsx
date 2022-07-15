import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { useAuthStore } from 'lib/stores'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { ReferralCards } from 'components/page/referrals/Cards'
import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'

const { SEO } = APP_INFO

const ReferralsPage: Page = () => {
  const { auth } = useAuthStore()

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4'>
        <ReferralCards
          title='Refer Customers'
          ilustration={<CustomerIcon />}
          link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Driver'
          ilustration={<DriverIcon />}
          link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Merchant Customers'
          ilustration={<MerchantIcon />}
          link={`${auth.referralLink}&role=${ROLES.MERCHANT}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Refer Vidgo'
          ilustration={(
            <div className='h-[100px]'>
              <img src='/images/vidgo/vidgo-ilustration.jpg' alt='Vidgo logo' />
            </div>
          )}
          link={`https://www.vidgo.com/snap/?subpid=${auth.referralCode}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />

        <ReferralCards
          title='Refer ERC'
          ilustration={(
            <div className='h-[100px] w-5/6'>
              <img src='/images/j-logo.png' alt='Refer ERC' />
            </div>
          )}
          link={'https://www.jornscpa.com/snap/' || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />

        {/* <ReferralCards
        title='Refer Snap Kitchens'
        ilustration={(
          <div className='h-[100px] '>
            <img src='/images/snap-kitchen-logo.png' alt='Snap Kitchens' className='w-[110px]' />
          </div>
        )}
        link={'https://snapkitchens.net/' || 'With Out Link'}
        newUser={false}
        classes='col-span-1'
      /> */}
      </div>
    </div>
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
