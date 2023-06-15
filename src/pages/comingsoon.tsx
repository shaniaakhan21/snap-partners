import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
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

export async function getStaticProps ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [...APP_INFO.COMMON_NS_LIST]))
    }
  }
}

export default ComingSoon
