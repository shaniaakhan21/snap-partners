// eslint-disable-next-line no-use-before-define
import React from 'react'
import ReactDataGrid from '@inovua/reactdatagrid-community'
import dayjs from 'dayjs'
import { SetcClient } from 'lib/types/setc'
import { IUserData } from 'lib/types'
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

const SingleIboSetcsTable = (props: {ibo: IUserData & {clients: SetcClient[]}}) => {
  const { clients } = props.ibo
  const mappedClients = clients.map(client => ({
    setcId: client.id,
    dateAcquired: dayjs(client.orderDate, 'MM-DD-YYYY').format('MM/DD/YYYY'),
    paidStatus: client.paidDate ? 'Paid' : 'Not Paid',
    filingCompleted: client.irsFiledDate ? 'Yes' : 'No'
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
      name: 'paidStatus',
      header: 'Paid Status',
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
    <StyledDataGrid>
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
    </StyledDataGrid>
  )
}

export default SingleIboSetcsTable
