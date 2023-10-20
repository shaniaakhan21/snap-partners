/* eslint-disable no-use-before-define */
import Head from 'next/head'
import { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { getLocalStorage } from 'lib/utils/localStorage'
import DashboardLayout from 'layouts/private/Dashboard'
import '@inovua/reactdatagrid-community/index.css'
import { useEffect, useState } from 'react'
import ErcModal from 'lib/modals/ErcModal'
import PersonalClientsTable from 'components/page/erc/PersonalClientsTable'
import TeamClientsTable from 'components/page/erc/TeamClientsTable'
import TableHeader from 'components/page/erc/TableHeader'
import PersonListTable from 'components/page/erc/PersonListTable'
import ShowDetailedTables from 'components/page/erc/ShowDetailedTables'
import { Spinner } from 'components/common/loaders'
import { Client, LevelledClient } from 'lib/types/transaction'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

const { SEO } = APP_INFO
const CLIENT_PAGE_LIMIT = 10

const ErcReport = ({ userId }) => {
    const [personalClients, setPersonalClients] = useState<Client[]>([])
  const [totalClientCount, setTotalClientCount] = useState(0)
  const [personalClientsLoading, setPersonalClientsLoading] = useState(false)
  const [teamClients, setTeamClients] = useState<LevelledClient[]>([])
  const [teamClientsLoading, setTeamClientsLoading] = useState(false)
  const [selectedLevel, setSelectedLevel] = useState(-1)
  const [monthSelected, setMonthSelected] = useState(new Date().getMonth())
  const [yearSelected, setYearSelected] = useState(new Date().getFullYear())
  const [selectedIBO, setSelectedIBO] = useState<{
    id: number;
    name: string;
    lastname: string;
    clients: Client[];
  }>(null)
  const [selectedClient, setSelectedClient] = useState(null)

  useEffect(() => {
    setSelectedIBO(null)
  }, [selectedLevel, monthSelected, yearSelected])

  const years = []
  for (let i = new Date().getFullYear(); i >= 2022; i--) {
    years.push(i)
  }

  const getPersonalClients = async (page = 1) => {
    try {
      setPersonalClientsLoading(true)
      const token = getLocalStorage('accessToken')
      // TODO
      const res = await fetch(`/api/erc/getTable?userId=${userId}`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` }
      })
      const data = await res.json()
      setPersonalClients(data)
      console.log({ clientsPersonal: data })
      if (page === 1) setTotalClientCount(data.length)
    } catch (error) {
      // ignore
      console.log('error on personal clients ', { error })
    } finally {
      setPersonalClientsLoading(false)
    }
  }

  const getTeamClients = async () => {
    try {
      setSelectedIBO(null)
      setSelectedLevel(-1)
      setTeamClientsLoading(true)
      const token = getLocalStorage('accessToken')
      const res = await fetch(
        `/api/erc/getTableClients?month=${
          monthSelected + 1
        }&year=${yearSelected}&userId=${userId}`,
        {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const data = await res.json()
      console.log({ clientsTeam: data })
      setTeamClients(data)
    } catch (e) {
      // ignore
      console.log('error on team clients ', { error: e })
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
    <>
      <div id="cro-erc-process" style={{ marginLeft: 0, marginRight: 0 }}>
        <div className="">
          <h1>The ERC Process has 3 Phases that trigger payout</h1>
          <div>
            <ul>
              <li>Phase 1</li>
              <li>New Client</li>
            </ul>
            <ul>
              <li>Phase 2</li>
              <li> Jorns Filling Work</li>
            </ul>
            <ul>
              <li>Phase 3</li>
              <li>IRS Payment</li>
            </ul>
          </div>
        </div>
      </div>
      <ErcModal client={selectedClient} isOpen={Boolean(selectedClient)} onClose={() => setSelectedClient(null)} />
      <div id="table1erc" className="" style={{ marginLeft: 0, marginRight: 0 }}>
        <div className="flex flex-row justify-between pb-2 text-lg font-sans font-semibold text-gray-800">
          Your Personal Clients
          {
            personalClientsLoading && <Spinner />
          }
        </div>
        <PersonalClientsTable
          clients={personalClients}
          totalClientCount={totalClientCount}
          toggleModal={setSelectedClient}
        />
        <TableHeader
          loading={teamClientsLoading}
          tableName="Your Team Clients"
          setMonthSelected={setMonthSelected}
          setYearSelected={setYearSelected}
        />
        <div className="text-center">
          <TeamClientsTable
            clients={teamClients}
            onSelectLevel={setSelectedLevel}
            // toggleTable={toggleTables}
          />
        </div>
      </div>
      {selectedLevel > -1 && (
        <div id="table1erc" style={{ marginLeft: 0, marginRight: 0 }}>
          <TableHeader
            tableName={'Team Level Report' + (selectedLevel > 0 ? ` (level-${selectedLevel === 6 ? '6+' : selectedLevel})` : '')}
          />
          <ShowDetailedTables onSelectIBO={setSelectedIBO} levelledClient={teamClients[selectedLevel - 1]} />
        </div>
      )}
      {selectedIBO && (
        <div id="table1erc" style={{ marginLeft: 0, marginRight: 0 }}>
          <TableHeader
            tableName={`${selectedIBO?.name} ${selectedIBO?.lastname}`}
          />
          <PersonListTable ibo={selectedIBO} />
        </div>
      )}
    </>
  )
}

export default ErcReport