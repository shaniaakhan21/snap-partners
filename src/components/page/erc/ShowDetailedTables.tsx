// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { LevelledClient } from 'lib/types/transaction'

type ShowDetailedTablesProps = {
  levelledClient: LevelledClient
  onSelectIBO: (ibo) => void;
};

const ShowDetailedTables: React.FC<ShowDetailedTablesProps> = ({
  levelledClient,
  onSelectIBO
}) => {
  const mappedClients = levelledClient.ibos.map(ibo => ({
    ...ibo,
    IBO: ibo.name,
    totalClients: ibo.clients.length,
    depositsPaid: ibo.clients.filter(client => client.depositPaid).length,
    phase1: ibo.clients.filter(client => client.phase === 1).length,
    phase2: ibo.clients.filter(client => client.phase === 2).length,
    phase3: ibo.clients.filter(client => client.phase === 3).length
  }))

  const gridStyle = {
    minHeight: 350
  }

  const filterValue = [
    { name: 'description', operator: 'startsWith', type: 'string', value: '' },
    { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
  ]
  const teamLevelReport = [
    { name: 'IBO', header: 'IBO Name', defaultFlex: 1, minWidth: 150 },
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
      render: (args) => {
        return (
          <span>
            <button
              className="text-textAcent-500"
              onClick={() => {
                console.log({ args })
                onSelectIBO(args.data)
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
        key='detailed-table'
        columns={teamLevelReport}
        dataSource={mappedClients}
        sortable={true}
        defaultFilterValue={filterValue}
        style={gridStyle}
        defaultLimit={6}
        pagination
      />
    </div>
  )
}

export default ShowDetailedTables
