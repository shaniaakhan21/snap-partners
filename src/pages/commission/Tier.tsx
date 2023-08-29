import { useState } from 'react'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'

const StyledDataGrid = styled(MUIDataGrid)({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: '600',
    textAlign: 'start!important'
  },
  '& .MuiDataGrid-columnHeaderTitleContainerContent': {
    width: '80%',
    textAlign: 'start!important'
  },
  '& .MuiDataGrid-cell': {
    borderRight: 'none'
  },
  '& .MuiDataGrid-cellContent': {
    textAlign: 'start!important',
    width: '50%'
  },
  border: 'none',
  boxShadow: 'none',
  '& .MuiDataGrid-footerContainer': {
    justifyContent: 'center'
  },
  '& .MuiTablePagination-root': {
    display: 'none'
  },
  '& .specialRowStyle': {
    fontWeight: 'bold'
  }
})

const columns = [
  {
    field: 'Team',
    headerName: 'Team',
    flex: 1,
    id: 'id'
  },
  {
    field: 'AsManager',
    headerName: 'As Manager',
    flex: 1
  },
  {
    field: 'AsSupervisor',
    headerName: 'As Supervisor',
    flex: 1
  },
  {
    field: 'AsDirector',
    headerName: 'As Director',
    flex: 1
  },
  {
    field: 'AsExcecutive',
    headerName: 'As Excecutive',
    flex: 1
  }
]

const rows = [
  {
    Team: 'Tier1',
    AsManager: '10%',
    AsSupervisor: '10%',
    AsDirector: '10%',
    AsExcecutive: '10%',
    id: 1
  },
  {
    Team: 'Tier2',
    AsManager: '1%',
    AsSupervisor: '5%',
    AsDirector: '5%',
    AsExcecutive: '5%',
    id: 2
  },
  {
    Team: 'Tier3',
    AsManager: '1%',
    AsSupervisor: '2%',
    AsDirector: '5%',
    AsExcecutive: '5%',
    id: 3
  },
  {
    Team: 'Tier4',
    AsManager: '1%',
    AsSupervisor: '2%',
    AsDirector: '3%',
    AsExcecutive: '5%',
    id: 4
  },
  {
    Team: 'Tier5',
    AsManager: '1%',
    AsSupervisor: '2%',
    AsDirector: '3%',
    AsExcecutive: '5%',
    id: 5
  },
  {
    Team: 'Tier6',
    AsManager: '1%',
    AsSupervisor: '2%',
    AsDirector: '3%',
    AsExcecutive: '5%',
    id: 6
  },
  {
    Team: 'Infinite',
    AsManager: '',
    AsSupervisor: '1%',
    AsDirector: '1%',
    AsExcecutive: '2%',
    id: 7
  },
  {
    Team: '1er Gen',
    AsManager: '',
    AsSupervisor: '',
    AsDirector: '1%',
    AsExcecutive: '2%',
    id: 8
  },
  {
    Team: '2er Gen',
    AsManager: '',
    AsSupervisor: '',
    AsDirector: '',
    AsExcecutive: '1%',
    id: 9
  }
]

const Tier = () => {
  const [data, setData] = useState(rows)
  return (
    <div style={{ height: 405, width: '100%', overflowX: 'auto' }}>
      <StyledDataGrid
        rows={data}
        className="myDataGridSum"
        columns={columns}
        onRowClick={(event, row) => {
          console.log(row)
        }}
        rowHeight={33}
        getRowClassName={(params) => {
          if (params.row.Team === '1er Gen' || params.row.Team === '2er Gen') {
            return 'specialRowStyle'
          }
          return ''
        }}
      />
    </div>
  )
}

export default Tier
