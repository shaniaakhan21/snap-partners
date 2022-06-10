import Head from 'next/head'
import dynamic from 'next/dynamic'

import type { Page, ReactNode } from 'lib/types'
import DashboardLayout from 'layouts/private/Dashboard'
import { Spinner } from 'components/common/loaders'
import { APP_INFO } from 'config/appInfo'
import { GTMTrack } from 'lib/utils/gtm'

const { SEO } = APP_INFO

const PDFViewer = dynamic(
  () => import('../components/page/compensation-plan/PDFViewer'),
  {
    loading: () => (
      <div className='flex flex-col justify-center items-center'>
        <Spinner />
        <span>Loading Compensation Plan...</span>
      </div>
    ),
    ssr: false
  }
)

const CompensationPlanPage: Page = () => {
  return (
    <div className='w-full text-center'>
      <h4 className='font-black text-4xl md:text-5xl'>Compensation Plan</h4>

      <div className='mt-8'>
        <a
          href='/static/new-plan.pdf'
          download
          target='_blank'
          rel='noopener noreferrer'
          className='px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none hover:opacity-90'
          onClick={() => GTMTrack.downloadCompensationPlan('new-plan.pdf')}
        >
          Download Compensation Plan
        </a>
      </div>

      <div className='mt-10'>
        <PDFViewer />
      </div>
    </div>
  )
}

CompensationPlanPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Compensation Plan</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default CompensationPlanPage
