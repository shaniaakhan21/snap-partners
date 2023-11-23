// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { LevelledSetcClient } from 'lib/types/setc'

interface TeamSetcClientsTableProps{
  clients: LevelledSetcClient[],
  onSelectLevel: (level: number) => unknown
}

const TeamSetcClientsTable: React.FC<TeamSetcClientsTableProps> = ({
  clients,
  onSelectLevel
}) => {
  const mappedClients = clients.map(data => ({
    level: data.level === 6 ? data.level + ' +' : data.level,
    totalClients: data.ibos?.reduce((sum, curr) => sum + curr.clients.length, 0),
    paidClients: data.ibos?.reduce((total, group) => {
      return total + group.clients.filter(client => client.paidStatus).length
    }, 0),
    filingCompleted: data.ibos?.reduce((total, group) => {
      return total + group.clients.filter(client => !!client.irsFiledDate).length
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
      name: 'paidClients',
      header: 'Paid Clients',
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
              onClick={() => {
                if (data.level) onSelectLevel(Number(data.level.toString().substring(0, 1)))
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

  return (
    <div>
      <ReactDataGrid
        idProperty="level"
        columns={columnsClient}
        dataSource={mappedClients}
        sortable={true}
        style={gridStyle}
        defaultLimit={10}
        pagination
      />
    </div>
  )
}

export default TeamSetcClientsTable
