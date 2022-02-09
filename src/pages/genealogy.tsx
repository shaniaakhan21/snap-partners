import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { GenealogyTable } from 'components/page/genealogy'

const { SEO } = PAGE_INFO

const GenealogyPage: Page = () => {
  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Genealogy</title>
      </Head>

      <GenealogyTable />
    </>
  )
}

GenealogyPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
)

export default GenealogyPage
