import { useState } from 'react'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'

const StyledDataGrid = styled(MUIDataGrid)(({ theme }) => ({
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
  },
  [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {
    '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
      fontSize: '14px'
    },
    '& .MuiDataGrid-cell': {
      fontSize: '0.9em'
    }
  },
  [`@media (max-width: ${theme.breakpoints.values.xs}px)`]: {
    '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
      fontSize: '0.8em'
    },
    '& .MuiDataGrid-cell': {
      fontSize: '0.8em'
    }
  }
}))

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

const DataTableHistory = ({ onRowIdClick }) => {
  const data = useState(rows)[0]

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      id: 'id',
      flex: 2,
      renderCell: (params) => {
        let color = 'black'

        if (['1234', '1235', '1236'].includes(params.value)) {
          color = '#E35C49'
        } else if (params.value === '1237') {
          color = '#2C7D0E'
        }

        return <span style={{ color, cursor: 'pointer' }}>{params.value}</span>
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

  return (
    <div>
      <div className="font-semibold text-base text-center lg:text-left lg:text-2xl text-slate-700 mb-4 mt-4">
        <h1>Commission History</h1>
      </div>
      <div style={{ height: 317, width: '100%', overflowX: 'auto' }}>
        <StyledDataGrid
          rows={data}
          className="myDataGrid fixed-width"
          columns={columns}
          onRowClick={(event, row) => {
            onRowIdClick()
          }}
        />
      </div>
    </div>
  )
}

export default DataTableHistory
