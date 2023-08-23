import { useState } from 'react'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'

const StyledDataGrid = styled(MUIDataGrid)({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  '& .MuiDataGrid-cell': {
    borderRight: 'none'
  },
  border: 'none',
  boxShadow: 'none',
  '& .MuiDataGrid-footerContainer': {
    justifyContent: 'center'
  }
})

const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 5,
    id: 'id',
    renderCell: (params) => {
      let color = 'black' // Default color

      if (['1234', '1235', '1236'].includes(params.value)) {
        color = '#E35C49'
      } else if (params.value === '1237') {
        color = '#2C7D0E'
      }

      return <span style={{ color }}>{params.value}</span>
    }
  },
  {
    field: 'PayDate',
    headerName: 'Pay Date',
    flex: 2
  },
  {
    field: 'Amount',
    headerName: 'Amount',
    flex: 0.5
  }
]

const rows = [
  {
    id: '1234',
    PayDate: '$0.00',
    Amount: '$0.00'
  },
  {
    id: '1235',
    PayDate: '$0.00',
    Amount: '$0.00'
  },
  {
    id: '1236',
    PayDate: '$0.00',
    Amount: '$0.00'
  },
  {
    id: '1237',
    PayDate: '$0.00',
    Amount: '$0.00'
  }
]

const DataTableHistory = () => {
  const [data, setData] = useState(rows)
  return (
    <div>
      <div className="font-semibold text-2xl text-slate-700 mb-4 mt-4">
        <h1>Commission History</h1>
      </div>
      <StyledDataGrid
        rows={data}
        className="myDataGrid"
        columns={columns}
        onRowClick={(event, row) => {
          console.log(row)
        }}
      />
    </div>
  )
}

export default DataTableHistory
