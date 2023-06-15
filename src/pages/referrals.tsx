import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { useAuthStore } from 'lib/stores'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { ReferralCards } from 'components/page/referrals/Cards'
import { CustomerIcon, DriverIcon, MerchantIcon } from 'components/common/icons'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const ReferralsPage: Page = () => {
  const { t } = useTranslation()
  const { auth } = useAuthStore()

  const _auth: any = auth

  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4'>
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && !isIntegrous && (
          <ReferralCards
            title={t('referrals:refer_customer')}
            ilustration={<CustomerIcon />}
            link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && !isIntegrous && (
          <ReferralCards
            title={t('referrals:refer_driver')}
            ilustration={<DriverIcon />}
            link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}
        {(auth.roles.customer || auth.roles.driver || auth.roles.merchant) && !isIntegrous && (
          <ReferralCards
            title={t('referrals:refer_merchant')}
            ilustration={<MerchantIcon />}
            link={`${auth.referralLink}&role=${ROLES.MERCHANT}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        )}
        <ReferralCards
          title={t('common:refer_vidgo')}
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
            title={t('referrals:refer_agent')}
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
          title={t('referrals:refer_erc')}
          ilustration={(
            <div className='h-[100px] w-5/6'>
              <img src='/images/j-logo.png' alt={t('referrals:refer_erc')} />
            </div>
          )}
          link={`https://www.jornscpa.com/snap/?refid=${auth.id}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />

        <ReferralCards
          title={t('referrals:refer_energy')}
          ilustration={(
            <div className='h-[100px]'>
              <img src='/images/usaenergy/commercialenergy.png' alt={t('referrals:refer_energy')} />
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

ReferralsPage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()
  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - ${t('referrals:title')}</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...APP_INFO.COMMON_NS_LIST, 'referrals']))
    }
  }
}

export default ReferralsPage
