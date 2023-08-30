import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'

const StyledDataGrid = styled(MUIDataGrid)({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  '& .MuiDataGrid-cell': {
    borderRight: 'none',
    padding: 0,
    paddingTop: '1%'
  },
  border: 'none',
  borderColor: 'black !important',
  boxShadow: 'none',
  '& .MuiDataGrid-footerContainer': {
    display: 'none'
  },
  '& .datagrid-header': {
    borderColor: 'black !important'
  }
})

interface DataRow {
  id: number;
  itemId: string;
  orderDate: string;
  customer: string;
  product: string;
  cv: string;
  total: string;
  lv1: string;
  lv2: string;
  lv3: string;
  lv4: string;
  lv5: string
  sup1: string;
  dir: string;
  dir1: string;
  exe: string;
  exe1: string;
}

interface TeamBonusTableProps {
  rowData: DataRow[];
}

const columns = [
  {
    field: 'itemId',
    headerName: 'Item ID',
    width: 100,
    headerClassName: 'datagrid-header text-slate-800',
    flex: 0.7,
    renderCell: (params) => {
      let color = 'black'

      if (['1234B'].includes(params.value)) {
        color = '#E35C49'
      }

      return <span style={{ color, paddingLeft: '10%' }}>{params.value}</span>
    }
  },
  { field: 'orderDate', headerName: 'Order Date', width: 130, headerClassName: 'datagrid-header text-slate-800', flex: 1, renderCell: (params) => <div className='pl-2'>{params.value}</div> },
  { field: 'customer', headerName: 'Customer', width: 120, headerClassName: 'datagrid-header text-slate-800', flex: 1, renderCell: (params) => <div className='pl-2'>{params.value}</div> },
  { field: 'product', headerName: 'Product', width: 120, headerClassName: 'datagrid-header text-slate-800', flex: 1, renderCell: (params) => <div className='pl-2'>{params.value}</div> },
  { field: 'cv', headerName: 'CV', width: 100, headerClassName: 'datagrid-header text-slate-800', flex: 0.6, renderCell: (params) => <div className='pl-2'>{params.value}</div> },
  { field: 'total', headerName: 'Total', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-lime-200 border-r-2 border-black', flex: 1, renderCell: (params) => <div className='w-full h-full bg-lime-200 p-0 m-0 mt-0 flex flex-col justify-center align-center border-r-2 border-black text-slate-800 font-bold'>{params.value}</div> },
  { field: 'lv1', headerName: 'LV 1', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-amber-200', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-amber-200 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'lv2', headerName: 'LV 2', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-amber-200', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-amber-200 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'lv3', headerName: 'LV 3', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-amber-200', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-amber-200 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'lv4', headerName: 'LV 4', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-amber-200', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-amber-200 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'lv5', headerName: 'LV 5', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-amber-200', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-amber-200 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'sup1', headerName: 'Sup', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-red-400', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-red-400 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'dir', headerName: 'Dir', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-red-400', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-red-400 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'dir1', headerName: 'Dir 1', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-red-400', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-red-400 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'exe', headerName: 'Exe', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-red-400', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-red-400 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> },
  { field: 'exe1', headerName: 'Exe 1', width: 110, headerClassName: 'datagrid-header text-slate-800 bg-red-400', flex: 0.7, renderCell: (params) => <div className='w-full h-full bg-red-400 p-0 m-0 mt-0 pl-4 flex flex-col justify-center text-slate-700'>{params.value}</div> }
]

export default function TeamBonusTable ({ rowData = [] }: TeamBonusTableProps) {
  return (
    <div style={{ height: 250, width: '100%', overflowX: 'scroll' }}>
      <StyledDataGrid
        rows={rowData}
        className="myDataGrid"
        columns={columns}
      />
    </div>
  )
}
