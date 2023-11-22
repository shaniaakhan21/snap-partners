// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { LevelledSetcClient, SetcClient } from 'lib/types/setc'

type SetcLevelClientsTableProps = {
  levelledClient: LevelledSetcClient
  onSelectIbo: (client: SetcClient & {clients: SetcClient[]}) => void;
};

const SetcLevelClientsTable: React.FC<SetcLevelClientsTableProps> = ({
  levelledClient,
  onSelectIbo
}) => {
  const mappedClients = levelledClient.ibos.map(client => ({
    ...client,
    client: `${client.name}`,
    totalClients: client.clients.length,
    depositsPaid: client.clients.filter(client => client.paid_status).length,
    filingCompleted: client.clients.filter(client => client.filingCompleted).length
  }))

  const gridStyle = {
    minHeight: 350
  }

  const teamLevelReport = [
    { name: 'client', header: 'Client', defaultFlex: 1, minWidth: 150 },
    {
      name: 'totalClients',
      header: 'Total Clients',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'depositsPaid',
      header: 'Deposits Paid',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'filingCompleted',
      header: 'Filing Completed',
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
