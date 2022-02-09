import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'

const { SEO } = PAGE_INFO

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
