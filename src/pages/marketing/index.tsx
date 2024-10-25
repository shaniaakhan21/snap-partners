import Head from 'next/head'
import { useRef } from 'react'

import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CustomerIcon, DriverIcon, IBOIcon, MerchantsIcon } from 'components/common/icons'
import { MarketingTool } from 'components/page/marketing/CardTools/Tool'
import { ListMarketingTools } from 'components/page/marketing/CardTools/ListTools'

const { SEO } = APP_INFO

const MarketingPage: Page = () => {
  const { auth } = useAuthStore()
  const { current: marketingDetails } = useRef([
    {
      icon: <CustomerIcon />,
      title: 'Customer',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Customers!',
      to: '/marketing/customer',
      snap: true
    },
    {
      icon: <DriverIcon />,
      title: 'Driver',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Drivers On Board',
      to: '/marketing/driver',
      snap: true
    },
    {
      icon: <MerchantsIcon />,
      title: 'Merchant',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Merchant Partners',
      to: '/marketing/merchant',
      snap: true
    },
    {
      icon: <IBOIcon />,
      title: 'IBO',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Business partners',
      to: '/marketing/ibo'
    }
  ])

  return (
    <>
      <div className='text-center'>
        <span className='text-3xl font-bold'>Marketing Tools</span> <br /><br />
        <span className='font-bold text-2xl text-primary-500'>Building your Business with a Few Clicks</span>

        <div className='mt-6'>
          <span className='font-semibold'>Send Branded Campaings with our system, let’s start by clicking who you want to reach out</span>
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

MarketingPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Marketing</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default MarketingPage
