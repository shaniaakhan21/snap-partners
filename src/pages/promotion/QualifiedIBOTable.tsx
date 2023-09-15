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
  },
  {
    name: 'Andre Zam ',
    date: new Date('2023-05-21'),
    id: 4
  },
  {
    name: 'Ronan Thompson',
    date: new Date('2023-05-21'),
    id: 5
  },
  {
    name: 'Jason Bateman',
    date: new Date('2023-05-21'),
    id: 6
  }
]

const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 2.5
  },
  {
    field: 'date',
    headerName: 'Start Date',
    type: 'date',
    flex: 0.5
  }
]

const QualifiedIBOTable = () => {
  return (
    <div className='w-4/12 bg-white rounded-xl p-6  top-[-8%] relative'>
      <h1 className='text-2xl font-bold'>Qualified IBO's</h1>
      <br></br>
      <div className="datagrid-container">
        <StyledDataGrid
          rows={rows}
          columns={columns}
          sx={{
            height: '370px',
            borderColor: 'rgba(224, 224, 224, 0.5)!important'
          }}
        />
      </div>
      <br></br>
    </div>
  )
}

export default QualifiedIBOTable
