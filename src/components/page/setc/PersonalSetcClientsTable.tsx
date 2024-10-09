// eslint-disable-next-line no-use-before-define
import React, { useMemo } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { SetcClient } from 'lib/types/setc'
import { TypeColumn } from '@inovua/reactdatagrid-community/types'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
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
    { name: 'id', header: 'Order #', defaultFlex: 0.75, minWidth: 60 },
    { name: 'createdAt', header: 'Order Date', defaultFlex: 1, minWidth: 110 },
    { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 85 },
    { name: 'email', header: 'Email', defaultFlex: 1.5, minWidth: 85 },
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
  )
}

export default PersonalSetcClientsTable
