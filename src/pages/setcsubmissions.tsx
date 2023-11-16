import { useEffect, useState } from 'react'
import '@inovua/reactdatagrid-community/index.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Head from 'next/head'
import { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { getLocalStorage } from 'lib/utils/localStorage'
import DashboardLayout from 'layouts/private/Dashboard'
import { SetcClientSubmission } from 'lib/types/setc'
import PersonalClientSubmissionTable from 'components/page/setc/PersonalClientSubmissionTable'
import { Spinner } from 'components/common/loaders'
dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

const { SEO } = APP_INFO

const SetcClientSubmissionsPage: Page = () => {
  const [personalClients, setPersonalClients] = useState<SetcClientSubmission[]>([])
  const [personalClientsLoading, setPersonalClientsLoading] = useState(false)

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }

  const getPersonalClients = async (page = 1) => {
    try {
      setPersonalClientsLoading(true)
      const token = getLocalStorage('accessToken')
      const res = await fetch('/api/ffcra', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setPersonalClients(data)
    } catch (error) {
      // ignore
    } finally {
      setPersonalClientsLoading(false)
    }
  }

  useEffect(() => {
    getPersonalClients()
  }, [])

  return (
    <div className='bg-white rounded-lg px-8 py-12'>
      <div className='flex flex-row justify-between items-center'>
        <p className='text-lg font-sans font-semibold text-gray-800'>Your Personal SETC Client Submissions</p>
        {
          personalClientsLoading && (
            <Spinner />
          )
        }
      </div>
      <div className='mt-4'>
        <PersonalClientSubmissionTable clients={personalClients}/>
      </div>
    </div>
  )
}

SetcClientSubmissionsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - SETC Client Submission</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default SetcClientSubmissionsPage
