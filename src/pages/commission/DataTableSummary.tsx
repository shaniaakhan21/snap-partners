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

interface DataRow {
  Title: string;
  Description: string;
  Pending: string;
  Verified: string;
  id: string;
}

interface DataTableSummaryProps {
  data: DataRow[];
}

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

export default function DataTableSummary ({ data = [] }: DataTableSummaryProps) {
  return (
    <div>
      <div className="font-semibold text-base text-center lg:text-left lg:text-2xl text-slate-700 mb-4 mt-4">
        <h1>Commission Summary</h1>
      </div>
      <div style={{ width: '100%', overflowX: 'auto' }}>
        <StyledDataGrid
          rows={data}
          className="myDataGridSum"
          columns={columns}
          onRowClick={(event, row) => {
            console.log(row)
          }}
        />
      </div>
    </div>
  )
}
