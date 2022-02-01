import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { config } from 'config'
import DashboardLayout from 'layouts/private/Dashboard'
import { PDFViewer } from 'components/page/dashboard/compensation-plan/PDFViewer'

const { PAGE_INFO: { SEO } } = config

const CompensationPlanPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Compensation Plan</title>
      </Head>

      <div className='w-full text-center'>
        <h4 className='font-black text-5xl'>Compensation Plan</h4>

        <div className='mt-8'>
          <a
            href='/static/plan.pdf'
            download
            target='_blank'
            rel='noopener noreferrer'
            className='px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full font-semibold focus:outline-none hover:opacity-90'
          >
            Download Compensation Plan
          </a>
        </div>

        <div className='mt-10'>
          <PDFViewer />
        </div>
      </div>
    </>
  )
}

CompensationPlanPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default CompensationPlanPage
