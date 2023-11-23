// eslint-disable-next-line no-use-before-define
import React, { useMemo } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { SetcClient } from 'lib/types/setc'
import { TypeColumn } from '@inovua/reactdatagrid-community/types'
import dayjs from 'dayjs'

interface PersonalSetcClientsTableProps{
  clients: SetcClient[]
}

const PersonalSetcClientsTable: React.FC<PersonalSetcClientsTableProps> = ({
  clients
}) => {
  const mappedClients = useMemo(() => clients.map(c => ({ ...c, createdAt: dayjs(c.orderDate).format('MM/DD/YYYY'), paidStatus: c.paidStatus ? 'Paid' : 'Not Paid', irsFiledDate: c.irsFiledDate ? dayjs(c.irsFiledDate).format('MM/DD/YYYY') : 'N/A' })), [clients])
  const columns:TypeColumn[] = [
    { name: 'id', header: 'Order #', defaultFlex: 0.75, minWidth: 60 },
    { name: 'createdAt', header: 'Order Date', defaultFlex: 1, minWidth: 110 },
    { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 85 },
    { name: 'email', header: 'Email', defaultFlex: 2, minWidth: 85 },
    { name: 'phone', header: 'Phone', defaultFlex: 1, minWidth: 90 },
    { name: 'paidStatus', header: 'Paid Status', defaultFlex: 1, minWidth: 90 },
    { name: 'paidAmount', header: 'Paid Amount', defaultFlex: 1, minWidth: 90 },
    { name: 'irsFiledDate', header: 'Filing with IRS', defaultFlex: 1, minWidth: 90 }
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
