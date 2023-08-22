import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { useState } from 'react'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import PayRunComponent from './accounting/PayRunComponent'
import PayReportComponent from './accounting/PayReportComponent' // Ensure you import this
import MainAccounting from './accounting/MainAccounting'

const { SEO } = APP_INFO

const Accounting: Page = () => {
  const [currentComponent, setCurrentComponent] = useState('None')

  const renderContent = () => {
    switch (currentComponent) {
    case 'PayRun':
      return <PayRunComponent onBackClick={() => setCurrentComponent('None')} />
    case 'PayReport':
      return <PayReportComponent onBackClick={() => setCurrentComponent('None')} />
    default:
      return <MainAccounting setCurrentComponent={setCurrentComponent} />
    }
  }

  return (
    <div className="flex space-x-4 mt-10">
      {renderContent()}
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
