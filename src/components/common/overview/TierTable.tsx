import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'

const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#F0F4F8',
    borderTopLeftRadius: '1.5rem!important',
    borderTopRightRadius: '1.5rem!important'
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none'
  },
  '& .MuiDataGrid-virtualScroller': {
    overflow: 'hidden'
  }

}))
interface TierTableRow {
  title: string;
  manager: string;
  supervisor: string;
  director: string;
  executive: string;
  id: number;
}

const rows: TierTableRow[] = [
  {
    title: 'Tier1',
    manager: '10%',
    supervisor: '10%',
    director: '10%',
    executive: '10%',
    id: 1
  },
  {
    title: 'Tier2',
    manager: '1%',
    supervisor: '5%',
    director: '5%',
    executive: '5%',
    id: 2
  },
  {
    title: 'Tier3',
    manager: '1%',
    supervisor: '2%',
    director: '5%',
    executive: '5%',
    id: 3
  },
  {
    title: 'Tier4',
    manager: '1%',
    supervisor: '2%',
    director: '3%',
    executive: '5%',
    id: 4
  },
  {
    title: 'Tier5',
    manager: '1%',
    supervisor: '2%',
    director: '3%',
    executive: '5%',
    id: 5
  },
  {
    title: 'Infinite',
    manager: '',
    supervisor: '1%',
    director: '1%',
    executive: '2%',
    id: 6
  },
  {
    title: '1er Gen',
    manager: '',
    supervisor: '',
    director: '1%',
    executive: '2%',
    id: 7
  },
  {
    title: '2er Gen',
    manager: '',
    supervisor: '',
    director: '',
    executive: '1%',
    id: 8
  }
]

export default function TierTable () {
  const columns = [
    { field: 'title', headerName: 'Team', flex: 2 },
    { field: 'manager', headerName: 'Manager', flex: 2 },
    { field: 'supervisor', headerName: 'Supervisor', flex: 2 },
    { field: 'director', headerName: 'Director', flex: 2 },
    { field: 'executive', headerName: 'Executive', flex: 2 }
  ]

  return (
    <div style={{ height: '100%', width: '100%' }} className='bg-white rounded-3xl shadow-lg m-2'>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        sx={{
          borderColor: 'rgba(224, 224, 224, 0)!important',
          borderRadius: '1.5rem!important'
        }}
      />
    </div>
  )
}
