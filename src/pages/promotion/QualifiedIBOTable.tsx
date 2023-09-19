import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
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

<<<<<<< HEAD
const columns = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 0.25
  },
  {
    field: 'date',
    headerName: 'Start Date',
    type: 'string',
    flex: 0.25
  },
  {
    field: 'userFriends',
    headerName: 'User Friends',
    type: 'number',
    flex: 0.25
  }
]

const QualifiedIBOTable = ({ sprintData }) => {
=======
const QualifiedIBOTable = () => {
  const [windowWidth, setWindowWidth] = useState(0)

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
      headerName: 'Name',
      flex: windowWidth <= 400 ? 0.9 : 2.5
    },
    {
      field: 'date',
      headerName: 'Start Date',
      type: 'date',
      flex: windowWidth <= 400 ? 0.9 : 0.5
    }
  ]

>>>>>>> 76431477e4925e382f4fb5251c178021115b9d91
  return (
    <div className='w-10/12 sm:w-4/12 bg-white rounded-xl p-6  top-[-8%] relative'>
      <h1 className='text-lg sm:text-2xl font-bold'>Qualified IBO's</h1>
      <br></br>
<<<<<<< HEAD
      <div className="datagrid-container">
        <StyledDataGrid
          rows={sprintData?.userFriendMap}
          columns={columns}
          sx={{
            height: '370px',
            borderColor: 'rgba(224, 224, 224, 0.5)!important'
          }}
        />
=======
      <div className="datagrid-container" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '300px' }}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            sx={{
              height: '370px',
              borderColor: 'rgba(224, 224, 224, 0.5)!important'
            }}
          />
        </div>
>>>>>>> 76431477e4925e382f4fb5251c178021115b9d91
      </div>
      <br></br>
    </div>
  )
}

export default QualifiedIBOTable
