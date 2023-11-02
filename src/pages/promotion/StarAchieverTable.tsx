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
  },
  '& .MuiDataGrid-virtualScroller': {
    overflow: 'hidden'
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

const StarAchieversTable = ({ userSprintData }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [sprintDataRow, setSprintDataRow] = useState(userSprintData)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    setSprintDataRow(userSprintData)
  }, [userSprintData])

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'date',
      headerName: 'Date',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    }
  ]

  return (
    <div className='w-full'>
      <br></br>
      <div className="datagrid-container"style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
        <div style={{ minWidth: '300px' }}>
          {sprintDataRow
            ? <StyledDataGrid
              rows={sprintDataRow && sprintDataRow}
              columns={columns}
              sx={{
                minHeight: '214px',
                borderColor: 'rgba(224, 224, 224, 0.5)!important'
              }}
            />
            : <></>}
        </div>
      </div>
      <br></br>
    </div>
  )
}

export default StarAchieversTable
