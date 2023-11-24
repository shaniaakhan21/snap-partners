// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import { Client } from 'lib/types/transaction'
import dayjs from 'dayjs'

const PersonListTable = (props: {ibo: {name: string, clients: Client[]}}) => {
  const { clients } = props.ibo
  const mappedClients = clients.map(client => ({
    ercID: client.client,
    dateAcquired: dayjs(client.signupDate, 'MM-DD-YYYY').format('MM/DD/YYYY'),
    depositsPaid: client.depositPaid ? 'Yes' : 'No',
    completedPhase1: client.phase >= 1 ? 'Yes' : 'No',
    completedPhase2: client.phase >= 2 ? 'Yes' : 'No',
    completedPhase3: client.phase >= 3 ? 'Yes' : 'No'
  }))

  const gridStyle = {
    minHeight: 350
  }

  const filterValue = [
    { name: 'description', operator: 'startsWith', type: 'string', value: '' },
    { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
  ]
  const personalReport = [
    { name: 'ercID', header: 'ERC ID', defaultFlex: 1, minWidth: 150 },
    {
      name: 'dateAcquired',
      header: 'Date Acquired',
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
      name: 'completedPhase1',
      header: 'Completed Ph.1',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'completedPhase2',
      header: 'Completed Ph.2',
      defaultFlex: 1,
      minWidth: 150
    },
    {
      name: 'completedPhase3',
      header: 'Completed Ph.3',
      defaultFlex: 1,
      minWidth: 150
    }
  ]
  return (
    <div>
      <ReactDataGrid
        idProperty="id"
        columns={personalReport}
        dataSource={mappedClients}
        sortable={true}
        defaultFilterValue={filterValue}
        style={gridStyle}
        defaultLimit={10}
        pagination
      />
    </div>
  )
}

export default PersonListTable
