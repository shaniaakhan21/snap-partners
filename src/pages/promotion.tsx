import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import FirstCol from './promotion/FirstCol'
import TopSection from './promotion/TopSection'
import BottomSection from './promotion/BottomSection'

const { SEO } = APP_INFO

const PromotionViewPage: Page = () => {
  return (
    <>
      <span className='text-3xl font-bold'>Sprint To Paradise Promotion Tracker</span> <br /><br />
      <div className="w-full bg-white rounded-lg px-0 py-0 flex flex-row">
        <div className='w-1/6'>
          <div className='light-border-bottom'>
            <FirstCol
              image="/static/promotion/star-one.svg"
              text="1 Star"
            />
          </div>
          <FirstCol
            image="/static/promotion/star-three.png"
            text="Achieve More Stars!"
          />
        </div>
        <div className='w-5/6'>
          <div className='border-bot-box flex flex-row'>
            <div className='w-9/12'>
              <TopSection/>
            </div>
            <div className='py-10 px-10'>
              <img src='/static/promotion/first-promo-rounded.svg'/>
            </div>
          </div>

          <div className='flex flex-row'>
            <div className='w-9/12'>
              <BottomSection/>
            </div>
            <div className='py-10 px-10'>
              <img src='/static/promotion/first-promo-rounded.svg'/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

PromotionViewPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Dashboard</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default PromotionViewPage
