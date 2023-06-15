import Head from 'next/head'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import ChoroplethMap from 'components/page/global-reports/ChoroplethMap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { getLocalStorage } from 'lib/utils/localStorage'
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {useTranslation} from "next-i18next";

const { SEO } = APP_INFO

const ComingSoon: PageNext = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getMap', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setData(response.data)
    })()
  }, [])

  return (
    <>
      <div className="w-full min-h-screen flex justify-center">
        <ChoroplethMap dataSet={data} />
      </div>
    </>
  )
}

ComingSoon.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Customer Reports</title>
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
