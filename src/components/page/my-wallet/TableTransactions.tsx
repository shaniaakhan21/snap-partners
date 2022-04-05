import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { ITransaction } from 'lib/types/transaction'

const columns = [
  { name: 'id', header: 'Transaction ID', defaultFlex: 1 },
  { name: 'description', header: 'Description', defaultFlex: 1 },
  {
    name: 'user',
    header: 'Name',
    render: ({ value }) => {
      return `${value.name} ${value.lastname}`
    },
    defaultFlex: 1
  },
  { name: 'amount', header: 'Amount', defaultFlex: 1, type: 'number' },
  {
    name: 'state',
    header: 'State',
    render: ({ value }) => {
      return value ? '✔ APPROVED' : '❌ DENIED'
    },
    defaultFlex: 1
  },
  { name: 'date', header: 'Date', defaultFlex: 1 },
  { name: 'time', header: 'Time', defaultFlex: 1 }
]

const gridStyle = { minHeight: 550 }

const filterValue = [
  { name: 'description', operator: 'startsWith', type: 'string', value: '' },
  { name: 'amount', operator: 'startsWith', type: 'string', value: '' }
]

interface ITableTransactionsProps {
  transactions: ITransaction[]
}

export const TableTransactions = ({ transactions }: ITableTransactionsProps) => {
  return (
    <ReactDataGrid
      idProperty="id"
      columns={columns}
      dataSource={transactions}
      sortable={true}
      defaultFilterValue={filterValue}
      style={gridStyle}
      defaultLimit={10}
      pagination
    />
  )
}
