import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { ITransaction } from 'lib/types/transaction'

const columns = [
  { name: 'id', header: 'Transaction ID', defaultFlex: 1 },
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
