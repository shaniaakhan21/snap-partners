// eslint-disable-next-line no-use-before-define
import React, { useMemo } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { SetcClient } from 'lib/types/setc'
import { TypeColumn } from '@inovua/reactdatagrid-community/types'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
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

dayjs.extend(customParseFormat) // Extend dayjs with the plugin. Required for Safari

interface PersonalSetcClientsTableProps{
  clients: SetcClient[]
  onClickDetails: (client: SetcClient) => unknown
}

const PersonalSetcClientsTable: React.FC<PersonalSetcClientsTableProps> = ({
  clients,
  onClickDetails
}) => {
  const mappedClients = useMemo(() => clients.map(c => ({ ...c, createdAt: dayjs(c.orderDate, 'MM-DD-YYYY').format('MM/DD/YYYY'), paidStatus: c.paidDate ? 'Paid' : 'Not Paid', irsFiledDate: c.irsFiledDate ? dayjs(c.irsFiledDate, 'MM-DD-YYYY').format('MM/DD/YYYY') : 'N/A' })), [clients])
  const columns:TypeColumn[] = [
    {
      name: 'phase',
      header: 'Phase',
      defaultFlex: 1,
      minWidth: 100,
      maxWidth: 120,
      render: (e) => {
        const phase = e.data.phase
        return (
          <div
            className={`${
              phase === 1
                ? 'bg-[#E12D2D] text-white text-center p-2 text-sm mr-3 my-1 rounded-full'
                : phase === 2
                  ? 'bg-[#FFC700] text-white text-center p-2 text-sm mr-3 my-1 rounded-full'
                  : 'bg-[#55D65B] text-white text-center p-2 text-sm mr-3 my-1 rounded-full'
            }`}
          >
            {phase}
          </div>
        )
      }
    },
    {
      name: 'id',
      header: 'Order #',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'createdAt',
      header: 'Order Date',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'name',
      header: 'Name',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'phone',
      header: 'Phone',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'details',
      header: 'See More',
      defaultFlex: 1,
      minWidth: 150,
      render: ({ data }) => {
        return (
          <span>
            <button
              className="text-textAcent-500"
              onClick={() => onClickDetails(data)}
            >
              Details
            </button>
          </span>
        )
      }
    }
  ]

  const gridStyle = {
    minHeight: 450
  }

  return (
    <StyledDataGrid>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={mappedClients}
        sortable={true}
        rowHeight={null}
        style={gridStyle}
        defaultLimit={10}
        pagination
        showEmptyRows={false}
      />
    </StyledDataGrid>
  )
}

export default PersonalSetcClientsTable
