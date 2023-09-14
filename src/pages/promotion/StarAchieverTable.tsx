import { DataGrid as MUIDataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
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

interface StarAchieverTableProps {
    title: string;
    rows: GridRowsProp;
    columns: GridColDef[];
  }

const StarAchieversTable = ({ title, rows, columns }: StarAchieverTableProps) => {
  return (
    <div className='w-full'>
      <h1 className='text-xl font-semibold'>{title}</h1>
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
