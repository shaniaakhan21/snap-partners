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
    display: 'none'
  }
})

interface DataRow {
  id: number;
  itemId: string;
  orderDate: string;
  customer: string;
  product: string;
  pcv: string;
  cv: string;
  total: string;
}

interface PersonalIncomeTableProps {
  rowData: DataRow[];
}

const columns = [
  {
    field: 'itemId',
    headerName: 'Item ID',
    width: 100,
    headerClassName: 'datagrid-header text-slate-800',
    flex: 2,
    renderCell: (params) => {
      let color = 'black'

      if (['1234B'].includes(params.value)) {
        color = '#E35C49'
      }

      return <span style={{ color }}>{params.value}</span>
    }
  },
  { field: 'orderDate', headerName: 'Order Date', width: 130, headerClassName: 'datagrid-header text-slate-800', flex: 2 },
  { field: 'customer', headerName: 'Customer', width: 130, headerClassName: 'datagrid-header text-slate-800', flex: 2 },
  { field: 'product', headerName: 'Product', width: 150, headerClassName: 'datagrid-header text-slate-800', flex: 2 },
  { field: 'pcv', headerName: 'PCV', width: 100, headerClassName: 'datagrid-header text-slate-800', flex: 1.5 },
  { field: 'cv', headerName: 'CV', width: 100, headerClassName: 'datagrid-header text-slate-800', flex: 1 },
  { field: 'total', headerName: 'Total', width: 110, headerClassName: 'datagrid-header text-slate-800', flex: 0.5 }
]

export default function PersonalIncomeTable ({ rowData }: PersonalIncomeTableProps) {
  return (
    <div style={{ height: 150, width: '100%' }}>
      <StyledDataGrid
        rows={rowData}
        columns={columns}
      />
    </div>
  )
};
