import Head from 'next/head'
import {useMemo, useRef} from 'react'

import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CustomerIcon, DriverIcon, IBOIcon, MerchantsIcon } from 'components/common/icons'
import { MarketingTool } from 'components/page/marketing/CardTools/Tool'
import { ListMarketingTools } from 'components/page/marketing/CardTools/ListTools'
import { useTranslation } from "next-i18next";

const { SEO } = APP_INFO

const MarketingPage: Page = () => {
  const { t } = useTranslation('marketing')
  const { auth } = useAuthStore()
  const marketingDetails = useMemo(() => [
    {
      icon: <CustomerIcon />,
      title: t('customer.title'),
      subtitle: 'Subtitle text here',
      description: t('customer.description'),
      to: '/marketing/customer',
      snap: true
    },
    {
      icon: <DriverIcon />,
      title: t('driver.title'),
      subtitle: 'Subtitle text here',
      description: t('driver.description'),
      to: '/marketing/driver',
      snap: true
    },
    {
      icon: <MerchantsIcon />,
      title: t('merchant.title'),
      subtitle: 'Subtitle text here',
      description: t('merchant.description'),
      to: '/marketing/merchant',
      snap: true
    },
    {
      icon: <IBOIcon />,
      title: t('ibo.title'),
      subtitle: 'Subtitle text here',
      description: t('ibo.description'),
      to: '/marketing/ibo'
    }
  ], [t])

  return (
    <>
      <div className='text-center'>
        <span className='text-3xl font-bold'>{t('heading')}</span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>{t('subtitle')}</span>

        <div className='mt-6'>
          <span className='font-semibold'>{t('desc')}</span>
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
        <title>{SEO.TITLE_PAGE} - {t('title')}</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export default MarketingPage
