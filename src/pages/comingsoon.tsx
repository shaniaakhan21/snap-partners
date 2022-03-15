import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'

const { SEO } = APP_INFO

const ComingSoon: PageNext = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE}</title>
      </Head>

      <div className='h-[60vh] flex justify-center items-center'>
        <CardComingSoon />
      </div>
    </>
  )
}

ComingSoon.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default ComingSoon
