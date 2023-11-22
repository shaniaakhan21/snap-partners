// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import dayjs from 'dayjs'
import { SetcClient } from 'lib/types/setc'

const SingleIboSetcsTable = (props: {ibo: SetcClient & {clients: SetcClient[]}}) => {
  const { clients } = props.ibo
  console.log({ props: props.ibo })
  const mappedClients = clients.map(client => ({
    setcId: client.id,
    dateAcquired: dayjs(client.createdAt).format('MM/DD/YYYY'),
    depositsPaid: client.paid_status ? 'Yes' : 'No',
    filingCompleted: client.filingCompleted ? 'Yes' : 'No'
  }))

  const gridStyle = {
    minHeight: 350
  }

  const filterValue = [
    { name: 'description', operator: 'startsWith', type: 'string', value: '' },
    { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
  ]
  const personalReport = [
    { name: 'setcId', header: 'SETC ID', defaultFlex: 1, minWidth: 150 },
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
      name: 'filingCompleted',
      header: 'Filing Completed',
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

export default SingleIboSetcsTable
