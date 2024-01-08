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
      icon: <img src={'/images/marketing/customer.png'} />,
      title: 'Customer',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Customers!',
      to: '/marketing/customer',
      snap: true
    },
    {
      icon: <img src={'/images/marketing/driver.png'} />,
      title: 'Driver',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Drivers On Board',
      to: '/marketing/driver',
      snap: true
    },
    {
      icon: <img src={'/images/marketing/merchant.png'} />,
      title: 'Merchant',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Merchant Partners',
      to: '/marketing/merchant',
      snap: true
    },
    {
      icon: <img src={'/images/marketing/ibo.png'} />,
      title: 'IBO',
      subtitle: 'Subtitle text here',
      description: 'Select an image and share the link in the different social networks to get new Business partners',
      to: '/marketing/ibo'
    }
  ])

  return (
    <>
      <div className='flex flex-col lg:flex-row mx-2 lg:mx-20 gap-x-6'>
        <div className='text-center  h-fit w-full lg:w-1/2 rounded-3xl border-4 border-white m-4 shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] pt-8 lg:pt-14 pb-12 lg:pb-28 px-4 lg:px-20 bg-[#E1EBF3] '>
          <div className='w-full flex justify-center py-4'>
            <img src='/images/tools.png'/>
          </div>
          <span className='text-xl lg:text-3xl font-bold'>Marketing Tools</span> <br />
          <div className='mt-2 lg:mt-4'>
            <span className='font-bold text-lg lg:text-2xl text-[#E74426]'>Building your Business with a Few Clicks</span>
          </div>
          <div className='mt-4'>
            <span className='text-sm lg:text-base font-semibold text-[#5E5E5E]'>Send Branded Campaings with our system, let’s start by clicking who you want to reach out.</span>
          </div>
        </div>
        <div className='w-full lg:w-1/2'>
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
        </div>
      </div>
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
