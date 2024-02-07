import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { ITransaction } from 'lib/types/transaction'
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
      background-color: #F9FBFE;
      border-radius: 18px 18px 0px 0px;
    }

    .InovuaReactDataGrid__cell {
      background-color: white;
      padding-left: 8px!important;
    }

    .InovuaReactDataGrid__header {
      border-color:#DCE5ED !important;
    }

  .InovuaReactDataGrid__row-cell-wrap, .InovuaReactDataGrid__body {
      border: 1px solid #DCE5ED !important;
    }

    .InovuaReactDataGrid__body, .InovuaReactDataGrid {
      border-radius: 18px!important;
    }
  }
`
const columns = [
  { name: 'id', header: 'Transaction ID', defaultFlex: 1, type: 'number' },
  { name: 'description', header: 'Description', defaultFlex: 3 },
  {
    name: 'date',
    header: 'Date',
    defaultFlex: 1
  },
  {
    name: 'amount',
    header: 'Amount',
    defaultFlex: 1,
    render: ({ value }) => {
      return `$${value}`
    }
  }
]

const gridStyle = { minHeight: 550 }

const filterValue = [
  { name: 'description', operator: 'contains', type: 'string', value: '' }
]

interface ITableTransactionsProps {
  transactions: ITransaction[]
}

export const TableTransactions = ({ transactions }: ITableTransactionsProps) => {
  return (
    <StyledDataGrid>
      <ReactDataGrid
        idProperty="id"
        defaultSortInfo={{ name: 'id', dir: -1 }}
        columns={columns}
        dataSource={transactions}
        sortable={true}
        defaultFilterValue={filterValue}
        style={gridStyle}
        defaultLimit={10}
        pagination
      />
    </StyledDataGrid>
  )
}
