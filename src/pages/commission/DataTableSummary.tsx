import { useState } from 'react'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
import { makeStyles } from '@mui/styles'

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
    field: 'Title',
    headerName: 'Title',
    flex: 2,
    id: 'title'
  },
  {
    field: 'Description',
    headerName: 'Description',
    flex: 2
  },
  {
    field: 'Pending',
    headerName: 'Pending',
    flex: 1
  },
  {
    field: 'Verified',
    headerName: 'Verified',
    flex: 0.5
  }
]

const rows = [
  {
    Title: 'Personal Income',
    Description: 'Personal sales',
    Pending: '$0.00',
    Verified: '$ 214.00',
    id: '1'
  },
  {
    Title: 'Team Bonus',
    Description: 'Downline one-time product sales',
    Pending: '$0.00',
    Verified: '$ 214.00',
    id: '2'
  },
  {
    Title: 'Team Residual',
    Description: 'Downline residual services sales',
    Pending: '$0.00',
    Verified: '$ 214.00',
    id: '3'
  },
  {
    Title: 'CAB',
    Description: 'Customer acquisition Bonus',
    Pending: '$0.00',
    Verified: '$ 214.00',
    id: '4'
  }
]

const DataTableSummary = () => {
  const [data, setData] = useState(rows)
  return (
    <div>
      <div className="font-semibold text-2xl text-slate-700 mb-4 mt-4">
        <h1>Commission Summary</h1>
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

export default DataTableSummary
