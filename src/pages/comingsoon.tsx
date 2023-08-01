import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'
import {useTranslation} from "next-i18next";

const { SEO } = APP_INFO

const ComingSoon: PageNext = () => {
  return (
    <div className='h-[60vh] flex justify-center items-center'>
      <CardComingSoon />
    </div>
  )
}

ComingSoon.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Coming Soon</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export default ComingSoon
