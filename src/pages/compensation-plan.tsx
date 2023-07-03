import Head from 'next/head'
import dynamic from 'next/dynamic'

import type { Page, ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { Spinner } from 'components/common/loaders'
import { APP_INFO } from 'config/appInfo'
import { GTMTrack } from 'lib/utils/gtm'
import {useTranslation} from "next-i18next";
// import { Document, Page } from "react-pdf";


const { SEO } = APP_INFO

const PDFViewer = dynamic(
  () => import('../components/page/compensation-plan/PDFViewer'),
  {
    loading: () => {
      const { t } = useTranslation('compensation-plan')

      return (
        <div className='flex flex-col justify-center items-center'>
          <Spinner />
          <span>{t('loading_compensation_plan')}</span>
        </div>
      )
    },
    ssr: false
  }
)

const CompensationPlanPage: Page = () => {
  const { t } = useTranslation('compensation-plan')

  return (
    <div className='w-full text-center'>
      {/* <h4 className='font-black text-4xl md:text-5xl'>Compensation Plan</h4>
      <div className='mt-8 flex justify-center'>
        <CardComingSoon text='We will get you the new Compensation Plan document soon!'/>
      </div> */}
      <div className='mt-8'>
        <a
          href='/static/new-plan-v2.pdf'
          download
          target='_blank'
          rel='noopener noreferrer'
          className='px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none hover:opacity-90'
          onClick={() => GTMTrack.downloadCompensationPlan('new-plan-v2.pdf')}
        >
          {t('download_compensation_plan')}
        </a>
      </div>

      <div className='mt-10'>
        <PDFViewer />
      </div>
    </div>
  )
}

CompensationPlanPage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation('compensation-plan')

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - {t('title')}</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export default CompensationPlanPage
