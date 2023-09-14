// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { TeamClientsTableProps } from 'lib/types/transaction'

const TeamClientsTable: React.FC<TeamClientsTableProps> = ({
  clients,
  onSelectLevel
}) => {
  const mappedClients = clients.map(data => ({
    level: data.level,
    totalClients: data.ibos.reduce((sum, curr) => sum + curr.clients.length, 0),
    depositsPaid: data.ibos.reduce((total, group) => {
      return total + group.clients.filter(client => client.depositPaid).length
    }, 0),
    phase1: data.ibos.reduce((total, group) => {
      return total + group.clients.filter(client => client.phase === 1).length
    }, 0),
    phase2: data.ibos.reduce((total, group) => {
      return total + group.clients.filter(client => client.phase === 2).length
    }, 0),
    phase3: data.ibos.reduce((total, group) => {
      return total + group.clients.filter(client => client.phase === 3).length
    }, 0)
  }))

  const columnsClient = [
    { name: 'level', header: 'Level', defaultFlex: 1, minWidth: 150 },
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
                if (args.data.level) onSelectLevel(args.data.level)
              }}
            >
              Details
            </button>
          </span>
        )
      }
    }
  ]

  const gridStyle = {
    minHeight: 350,
    textAlign: 'center'
  }

  const filterValue = [
    { name: 'description', operator: 'startsWith', type: 'string', value: '' },
    { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
  ]
  return (
    <div>
      <ReactDataGrid
        key='team-clients-table'
        // idProperty="level"
        columns={columnsClient}
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

export default TeamClientsTable
