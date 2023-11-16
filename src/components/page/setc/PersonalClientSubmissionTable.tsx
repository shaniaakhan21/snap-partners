// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { SetcClientSubmission } from 'lib/types/setc'

interface PersonalClientSubmissionTableProps{
  clients: SetcClientSubmission[]
}

const PersonalClientSubmissionTable: React.FC<PersonalClientSubmissionTableProps> = ({
  clients
}) => {
  const columns = [
    { name: 'id', header: 'Order #', defaultFlex: 1, minWidth: 60 },
    { name: 'createdAt', header: 'Order Date', defaultFlex: 1, minWidth: 110 },
    { name: 'name', header: 'Name', defaultFlex: 2, minWidth: 85 },
    { name: 'email', header: 'Email', defaultFlex: 1, minWidth: 85 },
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
      dataSource={clients}
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
