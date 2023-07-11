import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { useAuthStore } from 'lib/stores'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { ReferralCards } from 'components/page/referrals/Cards'
import { CustomerIcon, DriverIcon, MerchantIcon, IBOIcon } from 'components/common/icons'

const { SEO } = APP_INFO

const ReferralsPage: Page = () => {
  const { auth } = useAuthStore()

  const _auth: any = auth

  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4'>
        {auth.roles.ibo && (
          <ReferralCards
            title='Sponsor a Snap IBO'
            ilustration={<IBOIcon />}
            link={`${auth.referralLink}&role=${ROLES.IBO}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}

        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && !isIntegrous && (
          <ReferralCards
            title='Refer Customers'
            ilustration={<CustomerIcon />}
            link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && !isIntegrous && (
          <ReferralCards
            title='Refer Driver'
            ilustration={<DriverIcon />}
            link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && !isIntegrous && (
          <ReferralCards
            title='Refer Merchant/SK'
            ilustration={<MerchantIcon />}
            link={`${auth.referralLink}&role=${ROLES.MERCHANT}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}
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

        {!isIntegrous && (
          <ReferralCards
            title='Refer ERC Agent'
            ilustration={(
              <div className='h-[100px]'>
                <img src='/images/agentv4.png' alt='Agent logo' />
              </div>
            )}
            link={`${auth.referralLink}&role=${ROLES.AGENT}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}

        <ReferralCards
          title='Refer ERC Client'
          ilustration={(
            <div className='h-[100px] w-5/6'>
              <img src='/images/j-logo.png' alt='Refer ERC' />
            </div>
          )}
          link={`https://www.jornscpa.com/snap/?refid=${auth.id}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />

        <ReferralCards
          title='Refer Commercial Energy'
          ilustration={(
            <div className='h-[100px]'>
              <img src='/images/usaenergy/commercialenergy.png' alt='USA Commercial Energy Logo' />
            </div>
          )}
          link={`https://usaenergy.com/free-rate-analysis/?subid=${auth.id}` || 'With Out Link'}
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
