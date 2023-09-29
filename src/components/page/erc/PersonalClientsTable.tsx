// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { ClientTableProps } from 'lib/types/transaction'

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
      minWidth: 30,
      maxWidth: 100,
      render: (e) => {
        const phase = e.data.phase
        return (
          <div
            className={`${
              phase === 1
                ? 'bg-primary-500 text-white text-center p-2 text-sm'
                : phase === 2
                  ? 'bg-primary-100 text-white text-center p-2 text-sm'
                  : 'bg-primary-200 text-white text-center p-2 text-sm'
            }`}
          >
            {phase}
          </div>
        )
      }
    },
    { name: 'client', header: 'ID', defaultFlex: 1, minWidth: 60 },
    { name: 'companyName', header: 'Company', defaultFlex: 1, minWidth: 110 },
    { name: 'email', header: 'Email', defaultFlex: 1, minWidth: 85 },
    { name: 'phone', header: 'Phone', defaultFlex: 1, minWidth: 90 },
    {
      name: 'details',
      header: 'See More',
      defaultFlex: 1,
      minWidth: 90,
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
  )
}

export default PersonalClientsTable
