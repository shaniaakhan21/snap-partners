import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import InputAdornment from '@mui/material/InputAdornment'
import TextField from '@mui/material/TextField'
import { Button } from 'components/common/Button'
import SearchResults from './SearchResults'
import { useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Checkbox, IconButton } from '@mui/material'
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

const CustomSearchComponent = () => {
  const texts = ['Personal Bonus: $0', 'Team Bonus: $0', 'Team Residual: $0', 'CAB: $0']
  const another_texts = ['166 Orders', '7 Reps']

  return (
    <>
      <HeaderComponent />
      <InputSection />
      <ResultsSection title="Found" results={texts} />
      <ResultsSection title="Also Found" results={another_texts} />
      <CustomDataGrid/>
    </>
  )
}

const HeaderComponent = () => (
  <div className="flex flex-row space-x-5">
    <div>
      <img src='images/payroll/custom-icon.svg' alt="Custom Icon" />
    </div>
    <div className="text-lg font-semibold not-italic flex flex-row justify-between w-full">
      <div>
        <span>Custom Search</span>
      </div>
      <div>
        <ExpandLessIcon />
      </div>
    </div>
  </div>
)

const InputSection = () => (
  <>
    <div className='flex flex-row justify-between w-9/10 text-sm font-medium text-gray-600 mt-2'>
      <div className='font-bold text-sm'>
        <p>ENTER PRODUCT ID</p>
      </div>
      <div>
        <p>Click arrow to see the list of products</p>
      </div>
    </div>
    <div className="flex flex-row w-full justify-between items-center">
      <div className="flex justify-between mt-2 w-9/10">
        <TextField
          placeholder="ex. 4567800"
          variant="outlined"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ExpandMoreIcon />
              </InputAdornment>
            )
          }}
          className="text-xs font-bold uppercase"
        />
      </div>
      <div className='w-1/10'>
        <Button classes='text-md uppercase bg-primary-500'>
                    Search
        </Button>
      </div>
    </div>
  </>
)

const ResultsSection = ({ title, results }) => (
  <>
    <div className='font-medium text-sm mt-4'>
      <p>{title}</p>
    </div>
    <div className='flex flex-row space-x-1 mt-1'>
      {results.map((text, index) => (
        <SearchResults key={index} text={text} />
      ))}
    </div>
  </>
)

const CustomDataGrid = () => {
  const [expandedRows, setExpandedRows] = useState([])

  const handleExpandClick = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows((prev) => prev.filter((id) => id !== rowId))
    } else {
      setExpandedRows((prev) => [...prev, rowId])
    }
  }

  const renderExpandableCell = (cellData, field) => {
    if (!cellData.row[field]) return null

    if (expandedRows.includes(cellData.row.id)) {
      return (
        <div className='flex flex-col'>
          {cellData.row[field].map((detail, index) => (
            <div key={index}>
              {field === 'date' && new Date(detail).toLocaleDateString()}
              {field !== 'date' && detail}
            </div>
          ))}
        </div>
      )
    } else {
      const detail = cellData.row[field][0]
      return (
        <div className="mb-2">
          {field === 'date' && new Date(detail).toLocaleDateString()}
          {field !== 'date' && detail}
        </div>
      )
    }
  }

  const data = [
    {
      id: 1,
      name: 'John Doe',
      date: [new Date('05/21/2023'), new Date('05/21/2023')],
      type: ['CAB', 'CAB'],
      amount: [300.00, 300.00],
      item_id: ['1990235A', '1990235A'],
      product_id: ['WKIT.US', 'WKIT.US'],
      total: 200
    },
    {
      id: 2,
      name: 'John Doe',
      date: [new Date('05/21/2023'), new Date('05/21/2023')],
      type: ['CAB', 'CAB'],
      amount: [300.00, 300.00],
      item_id: ['1990235A', '1990235A'],
      product_id: ['WKIT.US', 'WKIT.US'],
      total: 200
    },
    {
      id: 3,
      name: 'John Doe',
      date: [new Date('05/21/2023'), new Date('05/21/2023')],
      type: ['CAB', 'CAB'],
      amount: [300.00, 300.00],
      item_id: ['1990235A', '1990235A'],
      product_id: ['WKIT.US', 'WKIT.US'],
      total: 200
    },
    {
      id: 4,
      name: 'John Doe',
      date: [new Date('05/21/2023'), new Date('05/21/2023')],
      type: ['CAB', 'CAB'],
      amount: [300.00, 300.00],
      item_id: ['1990235A', '1990235A'],
      product_id: ['WKIT.US', 'WKIT.US'],
      total: 200
    }

  ]

  const columns = [
    {
      field: 'id',
      headerName: 'IBO ID',
      width: 150,
      renderCell: (cellData) => (
        <span>
          <Checkbox checked={cellData.row.checked} />
          {cellData.row.id}
        </span>
      )
    },
    {
      field: 'name',
      headerName: 'IBO Name',
      width: 150
    },
    {
      field: 'expand',
      headerName: '',
      width: 5,
      padding: 2,
      margin: 2,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellData) => (
        <IconButton
          onClick={() => handleExpandClick(cellData.row.id)}
          style={{
            backgroundColor: '#E35C49',
            color: 'white',
            borderRadius: 0,
            width: '2%',
            borderBottom: 'none'
          }}
        >
          {expandedRows.includes(cellData.row.id) ? <AddIcon /> : <RemoveIcon />}
        </IconButton>
      )
    },
    {
      field: 'date',
      headerName: 'Order Date',
      width: 150,
      renderCell: (cellData) => renderExpandableCell(cellData, 'date')
    },
    {
      field: 'type',
      headerName: 'Type',
      width: 150,
      renderCell: (cellData) => (
        <div className="flex items-center">
          {renderExpandableCell(cellData, 'type')}
        </div>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 150,
      renderCell: (cellData) => renderExpandableCell(cellData, 'amount')
    },
    {
      field: 'item_id',
      headerName: 'Item ID',
      width: 150,
      renderCell: (cellData) => renderExpandableCell(cellData, 'item_id')
    },
    {
      field: 'product_id',
      headerName: 'Product ID',
      width: 150,
      renderCell: (cellData) => renderExpandableCell(cellData, 'product_id')
    },
    {
      field: 'total',
      headerName: 'Total Payment',
      width: 130
    }
  ]
  return (
    <>
      <div className="mt-10" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          style={{ width: '100%', margin: 0, padding: 0 }}
          rowHeight={60}
        />
      </div>
    </>
  )
}

export default CustomSearchComponent
