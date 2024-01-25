// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { ClientTableProps } from 'lib/types/transaction'
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

const PersonalClientsTable: React.FC<ClientTableProps> = ({
  clients,
  totalClientCount,
  toggleModal
}) => {
  const columns = [
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
                ? 'bg-[#E12D2D] text-white text-center p-2 text-sm mx-3 my-1 rounded-full'
                : phase === 2
                  ? 'bg-[#FFC700] text-white text-center p-2 text-sm mx-3 my-1 rounded-full'
                  : 'bg-[#55D65B] text-white text-center p-2 text-sm mx-3 my-1 rounded-full'
            }`}
          >
            {phase}
          </div>
        )
      }
    },
    {
      name: 'client',
      header: 'ID',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'companyName',
      header: 'Company',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'email',
      header: 'Email',
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
              onClick={() => toggleModal(data)}
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

  const filterValue = [
    { name: 'description', operator: 'startsWith', type: 'string', value: '' },
    { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
  ]

  return (
    <StyledDataGrid>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={clients}
        sortable={true}
        defaultFilterValue={filterValue}
        rowHeight={null}
        style={gridStyle}
        defaultLimit={10}
        pagination
        showEmptyRows={false}
      />
    </StyledDataGrid>
  )
}

export default PersonalClientsTable
