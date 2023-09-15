import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#FBFDFF',
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none'
  }

}))

const rows = [
  {
    name: 'Edwin Zam',
    date: new Date('2023-05-21'),
    id: 1
  },
  {
    name: 'John Smith',
    date: new Date('2023-05-21'),
    id: 2
  },
  {
    name: 'Richard Williams',
    date: new Date('2023-05-21'),
    id: 3
  }
]

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'date',
    flex: 1
  }
]

const StarAchieversTable = () => {
  return (
    <div className='w-full'>
      <h1 className='text-xl font-semibold'>1 Star Achievers</h1>
      <br></br>
      <div className="datagrid-container">
        <StyledDataGrid
          rows={rows}
          columns={columns}
          sx={{
            height: '214px',
            borderColor: 'rgba(224, 224, 224, 0.5)!important'
          }}
        />
      </div>
      <br></br>
    </div>
  )
}

export default StarAchieversTable
