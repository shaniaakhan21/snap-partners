import { useEffect, useState } from 'react'
import '@inovua/reactdatagrid-community/index.css'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Head from 'next/head'
import { IUserData, Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { getLocalStorage } from 'lib/utils/localStorage'
import DashboardLayout from 'layouts/private/Dashboard'
import { LevelledSetcClient, SetcClient } from 'lib/types/setc'
import PersonalSetcClientsTable from 'components/page/setc/PersonalSetcClientsTable'
import { Spinner } from 'components/common/loaders'
import TableHeader from 'components/page/erc/TableHeader'
import TeamSetcClientsTable from 'components/page/setc/TeamSetcClientsTable'
import SetcLevelClientsTable from 'components/page/setc/SetcLevelClientsTable'
import SingleIboSetcs from 'components/page/setc/SingleIboSetcs'
import SetcModal from 'lib/modals/SetcModal'
dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

const { SEO } = APP_INFO

const SetcClientsPage: Page = () => {
  const [personalClients, setPersonalClients] = useState<SetcClient[]>([])
  const [personalClientsLoading, setPersonalClientsLoading] = useState(false)
  const [teamClients, setTeamClients] = useState<LevelledSetcClient[]>([])
  const [teamClientsLoading, setTeamClientsLoading] = useState(false)
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth())
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
  const [selectedLevel, setSelectedLevel] = useState(-1)
  const [selectedIBO, setSelectedIbo] = useState<IUserData &{clients: SetcClient[]}>(null)
  const [selectedClient, setSelectedClient] = useState<SetcClient>()

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

  const getTeamClients = async () => {
    try {
      setSelectedIbo(null)
      setSelectedLevel(-1)
      setTeamClientsLoading(true)
      const token = getLocalStorage('accessToken')
      const res = await fetch(`/api/ffcra/team-clients?month=${monthSelected}&year=${yearSelected}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const data = await res.json()
      setTeamClients(data)
    } catch (e) {
      // ignore
    } finally {
      setTeamClientsLoading(false)
    }
  }

  useEffect(() => {
    getPersonalClients()
  }, [])

  useEffect(() => {
    getTeamClients()
  }, [monthSelected, yearSelected])

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
      <SetcModal client={selectedClient} isOpen={Boolean(selectedClient)} onClose={() => setSelectedClient(null)} />
      <div className='mt-4'>
        <PersonalSetcClientsTable clients={personalClients} onClickDetails={setSelectedClient}/>
      </div>
      <div className='mt-8'>
        <TableHeader
          loading={teamClientsLoading}
          tableName="Your Team Clients"
          setMonthSelected={setMonthSelected}
          setYearSelected={setYearSelected}
        />
        <TeamSetcClientsTable
          clients={teamClients}
          onSelectLevel={setSelectedLevel}
        />
      </div>
      {selectedLevel > -1 && (
        <div className='mt-8'>
          <TableHeader
            tableName={'Team Level Report' + (selectedLevel > 0 ? ` (level-${selectedLevel === 6 ? '6+' : selectedLevel})` : '')}
          />
          <SetcLevelClientsTable
            onSelectIbo={setSelectedIbo}
            levelledClient={teamClients[selectedLevel - 1]}
          />
        </div>
      )}
      {selectedIBO && (
        <div className='mt-8'>
          <TableHeader
            tableName={`${selectedIBO?.name} ${selectedIBO.lastname}`}
          />
          <div className='mt-4'>
            <SingleIboSetcs ibo={selectedIBO} />
          </div>
        </div>
      )}
      <div className='mt-4'>
        <p>Key: <br />
        Paid Clients: Reflects those clients that have paid the invoice amount with a value of "1" if paid a ”0” if not paid yet
        </p>
      </div>
      <div className='mt-4'>
        <p>Note: <br />
        Commissions are only earned on clients that have paid their invoice which is determined in Phase 2 of the filing process.
        </p>
      </div>
    </div>
  )
}

SetcClientsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - SETC Client Submission</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default SetcClientsPage
