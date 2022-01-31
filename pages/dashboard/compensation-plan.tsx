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
