import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { config } from 'config'
import DashboardLayout from 'layouts/private/Dashboard'

const { PAGE_INFO: { SEO } } = config

const GenealogyPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Genealogy</title>
      </Head>

      <div className='grid place-content-center text-center font-black text-5xl'>
      Genealogy
      </div>
    </>
  )
}

GenealogyPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default GenealogyPage
