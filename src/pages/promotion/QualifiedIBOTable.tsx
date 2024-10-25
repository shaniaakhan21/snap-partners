import { GridSortDirection, DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
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

const QualifiedIBOTable = ({ sprintData }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [sortModel, setSortModel] = useState([{ field: 'userFriends', sort: "desc" as GridSortDirection }])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const columns = [
    {
      field: 'name',
      headerName: 'Directly Sponsored IBO',
      flex: windowWidth <= 400 ? 0.9 : 2.5
    },
    {
      field: 'date',
      headerName: 'Start Date',
      type: 'string',
      flex: windowWidth <= 400 ? 0.9 : 0.5
    },
    {
      field: 'userFriends',
      headerName: "Their Direct IBO's",
      type: 'number',
      flex: windowWidth <= 400 ? 0.9 : 0.5
    }
  ]

  return (
    <div className='w-10/12 sm:w-4/12 bg-white rounded-xl p-6  top-[-8%] relative'>
      <h1 className='text-lg sm:text-2xl font-bold'>Qualified IBO's</h1>
      <p>(Both the <strong>Directly Sponsored IBO</strong> and their <strong>Direct IBO's</strong> columns reflect those who have a started date from <strong>9/1/23</strong> on)</p>
      <br></br>
      <div className="datagrid-container" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '300px' }}>
          { sprintData?.userFriendMap.length > 0
            ? <StyledDataGrid
              rows={sprintData && sprintData?.userFriendMap}
              columns={columns}
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
              sx={{
                height: '370px',
                borderColor: 'rgba(224, 224, 224, 0.5)!important'
              }}
            />
            : <></>
          }
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default QualifiedIBOTable
