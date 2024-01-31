// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { TeamClientsTableProps } from 'lib/types/transaction'
import styled from '@emotion/styled'

const StyledDataGrid = styled.div`
  && {
    .InovuaReactDataGrid__column-header__resize-wrapper{
      font-weight: 700;
      font-size: 1.2em;
      color: #000000;
      padding-left: 8px;
    }

    .InovuaReactDataGrid__header{
      background-color: #F0F4F8;
      border-radius: 18px 18px 0px 0px;
    }

    .InovuaReactDataGrid__cell {
      background-color: white;
      padding-left: 8px!important;
    }

    .InovuaReactDataGrid__header {
      border-color:rgba(224, 224, 224, 0.5) !important;
    }

  .InovuaReactDataGrid__row-cell-wrap, .InovuaReactDataGrid__body {
      border: 1px solid  rgba(224, 224, 224, 0.5) !important;
    }

    .InovuaReactDataGrid__body {
      border-radius: 18px!important;
    }
  }
`
const TeamClientsTable: React.FC<TeamClientsTableProps> = ({
  clients,
  onSelectLevel
}) => {
  const mappedClients = clients.map(data => ({
    level: data.level === 6 ? data.level + ' +' : data.level,
    totalClients: data.ibos?.reduce((sum, curr) => sum + curr.clients.length, 0),
    depositsPaid: data.ibos?.reduce((total, group) => {
      return total + group.clients.filter(client => client.depositPaid).length
    }, 0),
    phase1: data.ibos?.reduce((total, group) => {
      return total + group.clients.filter(client => client.phase === 1).length
    }, 0),
    phase2: data.ibos?.reduce((total, group) => {
      return total + group.clients.filter(client => client.phase === 2).length
    }, 0),
    phase3: data.ibos?.reduce((total, group) => {
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
    minHeight: 350
  }

  const filterValue = [
    { name: 'description', operator: 'startsWith', type: 'string', value: '' },
    { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
  ]
  return (
    <StyledDataGrid>
      <ReactDataGrid
        idProperty="level"
        columns={columnsClient}
        dataSource={mappedClients}
        sortable={true}
        defaultFilterValue={filterValue}
        style={gridStyle}
        defaultLimit={10}
        pagination
      />
    </StyledDataGrid>
  )
}

export default TeamClientsTable
