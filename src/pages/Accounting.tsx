import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { useState } from 'react'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import PayRunComponent from './accounting/PayRunComponent'
import MainAccounting from './accounting/MainAccounting'

const { SEO } = APP_INFO

const Accounting: Page = () => {
  const [showComponent, setShowComponent] = useState(false)

  return (
    <div className="flex space-x-4 mt-10">

      {showComponent
        ? (
          <PayRunComponent onBackClick={() => setShowComponent(false)} />
        )
        : (
          <>
            <MainAccounting setShowComponent={setShowComponent} />
          </>
        )}
    </div>

  )
}

Accounting.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Pay Roll</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default Accounting
