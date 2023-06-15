import Head from 'next/head'
import { useRef } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CustomerIcon, DriverIcon, IBOIcon, MerchantsIcon } from 'components/common/icons'
import { MarketingTool } from 'components/page/marketing/CardTools/Tool'
import { ListMarketingTools } from 'components/page/marketing/CardTools/ListTools'
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const MarketingPage: Page = () => {
  const { t } = useTranslation()
  const { auth } = useAuthStore()
  const { current: marketingDetails } = useRef([
    {
      icon: <CustomerIcon />,
      title: t('marketing:customer.title'),
      subtitle: 'Subtitle text here',
      description: t('marketing:customer.description'),
      to: '/marketing/customer',
      snap: true
    },
    {
      icon: <DriverIcon />,
      title: t('marketing:driver.title'),
      subtitle: 'Subtitle text here',
      description: t('marketing:driver.description'),
      to: '/marketing/driver',
      snap: true
    },
    {
      icon: <MerchantsIcon />,
      title: t('marketing:merchant.title'),
      subtitle: 'Subtitle text here',
      description: t('marketing:merchant.description'),
      to: '/marketing/merchant',
      snap: true
    },
    {
      icon: <IBOIcon />,
      title: t('marketing:ibo.title'),
      subtitle: 'Subtitle text here',
      description: t('marketing:ibo.description'),
      to: '/marketing/ibo'
    }
  ])

  return (
    <>
      <div className='text-center'>
        <span className='text-3xl font-bold'>{t('marketing:heading')}</span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>{t('marketing:subtitle')}</span>

        <div className='mt-6'>
          <span className='font-semibold'>{t('marketing:desc')}</span>
        </div>
      </div>

      <ListMarketingTools>
        {marketingDetails.map(detail => {
          const isSnap = (auth.roles.customer || auth.roles.driver || auth.roles.merchant)
          if (detail.snap && !isSnap) return <></>
          return (
            <MarketingTool
              key={detail.title}
              title={detail.title}
              subtitle={detail.subtitle}
              description={detail.description}
              icon={detail.icon}
              to={detail.to}
            />
          )
        })}
      </ListMarketingTools>
    </>
  )
}

MarketingPage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('marketing:title')}</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...APP_INFO.COMMON_NS_LIST, 'marketing']))
    }
  }
}

export default MarketingPage
