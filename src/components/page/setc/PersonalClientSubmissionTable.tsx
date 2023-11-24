// eslint-disable-next-line no-use-before-define
import React, { useMemo } from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { SetcClientSubmission } from 'lib/types/setc'
import { TypeColumn } from '@inovua/reactdatagrid-community/types'
import dayjs from 'dayjs'

interface PersonalClientSubmissionTableProps{
  clients: SetcClientSubmission[]
}

const PersonalClientSubmissionTable: React.FC<PersonalClientSubmissionTableProps> = ({
  clients
}) => {
  const mappedClients = useMemo(() => clients.map(c => ({ ...c, createdAt: dayjs(c.createdAt).format('MM/DD/YYYY') })), [clients])
  const columns:TypeColumn[] = [
    { name: 'id', header: 'Order #', defaultFlex: 1, minWidth: 60 },
    { name: 'createdAt', header: 'Order Date', defaultFlex: 1, minWidth: 110 },
    { name: 'name', header: 'Name', defaultFlex: 1, minWidth: 85 },
    { name: 'email', header: 'Email', defaultFlex: 2, minWidth: 85 },
    { name: 'phone', header: 'Phone', defaultFlex: 1, minWidth: 90 },
    {
      name: 'none',
      header: 'Paid Status (Coming Soon)',
      defaultFlex: 2,
      minWidth: 90
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

export default PersonalClientSubmissionTable
