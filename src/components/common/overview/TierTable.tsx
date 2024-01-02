import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  '&.MuiTableCell-head': {
    fontWeight: 'bold',
    fontSize: '1em',
    backgroundColor: '#F0F4F8',
    textAlign: 'center'
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

export default function BasicTable () {
  const columns = [
    { field: 'title', headerName: 'Team', flex: 2 },
    { field: 'manager', headerName: 'Manager', flex: 2 },
    { field: 'supervisor', headerName: 'Supervisor', flex: 2 },
    { field: 'director', headerName: 'Director', flex: 2 },
    { field: 'executive', headerName: 'Executive', flex: 2 }
  ]

  return (
    <>
      <div className='bg-white rounded-3xl shadow-lg p-6'>
        <h1 className='font-bold mb-4 text-xl'>
      Team Override Compensation
        </h1>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="basic table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <StyledTableCell key={column.field}>{column.headerName}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <StyledTableCell key={column.field} align="center">
                      {row[column.field]}
                    </StyledTableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div></>
  )
}
