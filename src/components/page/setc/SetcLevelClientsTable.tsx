// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { LevelledSetcClient, SetcClient } from 'lib/types/setc'
import { IUserData } from 'lib/types'

type SetcLevelClientsTableProps = {
  levelledClient: LevelledSetcClient
  onSelectIbo: (client: IUserData & {clients: SetcClient[]}) => void;
};

const SetcLevelClientsTable: React.FC<SetcLevelClientsTableProps> = ({
  levelledClient,
  onSelectIbo
}) => {
  const mappedClients = levelledClient.ibos.map(client => ({
    ...client,
    ibo: `${client.name} ${client.lastname}`,
    totalClients: client.clients.length,
    paidClients: client.clients.filter(client => client.paidDate).length,
    filingCompleted: client.clients.filter(client => !!client.irsFiledDate).length,
    phase1: client.clients.filter(client => client.phase === 1).length,
    phase2: client.clients.filter(client => client.phase === 2).length,
    phase3: client.clients.filter(client => client.phase === 3).length
  }))

  const gridStyle = {
    minHeight: 350
  }

  const teamLevelReport = [
    { name: 'ibo', header: 'IBO', defaultFlex: 1, minWidth: 150 },
    {
      name: 'totalClients',
      header: 'Total Clients',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'phase1',
      header: 'Phase 1',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'phase2',
      header: 'Phase 2',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'phase3',
      header: 'Phase 3',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'details',
      header: 'See more',
      defaultFlex: 1,
      minWidth: 150,
      render: ({ data }) => {
        return (
          <span>
            <button
              className="text-textAcent-500"
              onClick={(e) => {
                onSelectIbo(data)
              }}
            >
              Details
            </button>
          </span>
        )
      }
    }
  ]
  return (
    <div>
      <ReactDataGrid
        idProperty="id"
        columns={teamLevelReport}
        dataSource={mappedClients}
        sortable={true}
        style={gridStyle}
        defaultLimit={10}
        pagination
      />
    </div>
  )
}

export default SetcLevelClientsTable
