import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  '& .MuiDataGrid-cellContent': {
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
    company_name: 'Wendys',
    date: new Date('2023-05-21'),
    status: 'Yellow',
    id: 1
  },
  {
    company_name: 'Arbys',
    date: new Date('2023-05-21'),
    status: 'Green',
    id: 2
  },
  {
    company_name: 'Whataburger',
    date: new Date('2023-05-21'),
    status: 'Green',
    id: 3
  },
  {
    company_name: 'KFC',
    date: new Date('2023-05-21'),
    status: 'Yellow',
    id: 4
  },
  {
    company_name: 'Hardees',
    date: new Date('2023-05-21'),
    status: 'Green',
    id: 5
  },
  {
    company_name: 'Panda Express',
    date: new Date('2023-05-21'),
    status: 'Green',
    id: 6
  }
]

<<<<<<< HEAD
const columns = [
  {
    field: 'company_name',
    headerName: 'Company',
    flex: 2
  },
  {
    field: 'date',
    headerName: 'Date',
    type: 'string',
    flex: 1.5
  },
  {
    field: 'status',
    headerName: 'Status',
    flex: 0.5,
    valueGetter: (params) => {
      if (params.row && typeof params.row.status === 'string') {
        return params.row.status
      } else {
        return ''
      }
    },
    renderCell: (params) => {
      const value = params.value
      const cellStyle = {
        padding: '5% 20%',
        borderRadius: '20px',
        color: 'white',
        backgroundColor: value === 'Yellow' ? '#FFA800' : value === 'Green' ? '#6AB63C' : 'black'
      }
      return <div style={cellStyle}>{value}</div>
    }
  }
]

const ERCClientsTable = ({ sprintData }) => {
  const rowdata = []
  const [data, setData] = useState(rowdata)
  useEffect(() => {
    sprintData.personalQualifiedErcCompanies.map((data) => (
      rowdata.push({
        comapany_name: data?.comapnyName,
        date: data['client-acquired-date'],
        status: 'Green',
        id: data?.client
      })
    ))
    setData(rowdata)
  }, [sprintData])
=======
const ERCClientsTable = () => {
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
      field: 'company_name',
      headerName: 'Company',
      flex: windowWidth <= 400 ? 1 : 1
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'date',
      flex: windowWidth <= 400 ? 1 : 1
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: windowWidth <= 400 ? 0.4 : 1,
      valueGetter: (params) => {
        if (params.row && typeof params.row.status === 'string') {
          return params.row.status
        } else {
          return ''
        }
      },
      renderCell: (params) => {
        const value = params.value
        const cellStyle = {
          padding: '3% 10%',
          borderRadius: '20px',
          color: 'white',
          fontSize: '1.2em',
          backgroundColor: value === 'Yellow' ? '#FFA800' : value === 'Green' ? '#6AB63C' : 'black'
        }

        return <div style={cellStyle}>{value}</div>
      }
    }
  ]
>>>>>>> 76431477e4925e382f4fb5251c178021115b9d91
  return (
    <div className='w-10/12 sm:w-5/12 bg-white rounded-lg p-6  top-[-8%] relative'>
      <h1 className='text-lg sm:text-2xl font-bold'>ERC Clients</h1>
      <br></br>
<<<<<<< HEAD
      <div className="datagrid-container">
        <StyledDataGrid
          rows={data}
          columns={columns}
          sx={{
            height: '370px',
            borderColor: 'rgba(224, 224, 224, 0.5)!important'
          }}
        />
=======
      <div className="datagrid-container" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: '500px' }}>
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

export default ERCClientsTable
