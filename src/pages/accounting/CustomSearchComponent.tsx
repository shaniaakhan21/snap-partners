import SearchResults from './SearchResults'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Checkbox, IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import InputSection from './InputSection'
import CustomSearchHeader from './CustomSearchHeader'
import DataTable from './DataTable.json'

const CustomSearchComponent = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const texts = ['Personal Bonus: $0', 'Team Bonus: $0', 'Team Residual: $0', 'CAB: $0']
  const another_texts = ['166 Orders', '7 Reps']

  useEffect(() => {
    try {
      const processedData = DataTable.map(row => ({
        ...row,
        total: row.amount.reduce((sum, amt) => sum + amt, 0)
      }))

      setData(processedData)
    } catch (err) {
      setError(err)
    }
  }, [])
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading data: {error.message}</div>
  return (
    <>
      <CustomSearchHeader title="Custom Search" />
      <InputSection
        title="ENTER PRODUCT ID"
        hint="Click arrow to see the list of products"
        placeholderText="ex. 4567800"
        buttonText="Search"
      />
      <GrandTotal data={data} />
      <ResultsSection title="Found" results={texts} />
      <ResultsSection title="Also Found" results={another_texts} />
      <CustomDataGrid data={data}/>
      <div className='flex justify-end mt-5'>
        <button className="bg-green-600 hover:bg-green-600 text-white font-semibold py-2 px-4 ">
        MAKE PAYMENT NOW
        </button>
      </div>
    </>
  )
}

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

const CustomDataGrid = ({ data }) => {
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
              {field === 'amount' && `$${detail.toFixed(2)}`}
              {field !== 'date' && field !== 'amount' && detail}
            </div>
          ))}
        </div>
      )
    } else {
      const detail = cellData.row[field][0]
      return (
        <div className="mb-2">
          {field === 'date' && new Date(detail).toLocaleDateString()}
          {field === 'amount' && `$${detail.toFixed(2)}`}
          {field !== 'date' && field !== 'amount' && detail}
        </div>
      )
    }
  }

  const columns = [
    {
      field: 'id',
      headerName: 'IBO ID',
      width: 110,
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
      width: 100
    },
    {
      field: 'expand',
      headerName: '',
      width: 60,
      padding: 2,
      margin: 2,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (cellData) => (
        <IconButton
          onClick={() => handleExpandClick(cellData.row.id)}
          style={{
            color: '#E35C49',
            borderRadius: 0,
            borderBottom: 'none'
          }}
        >
          {expandedRows.includes(cellData.row.id) ? <AddBoxIcon /> : <IndeterminateCheckBoxIcon />}
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
      renderCell: (cellData) => (
        <div className="flex flex-col">
          {renderExpandableCell(cellData, 'amount').props.children}
        </div>
      )
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
      width: 150,
      renderHeader: () => (
        <span style={{ backgroundColor: '#FFB7AD', fontWeight: 'bold', padding: '2px 15px' }}>Total Payment</span>
      ),
      renderCell: (cellData) => (
        <div className="flex justify-center items-center w-full h-full text-lg font-semibold">
        ${cellData.row.total.toFixed(2)}
        </div>)
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

const GrandTotal = ({ data }) => {
  const grandTotal = data.reduce((sum, row) => sum + row.total, 0).toFixed(2)

  return (
    <div className="mt-4 flex justify-start pr-10">
      <div className="text-2xl font-semibold">
          Grand Total &nbsp;&nbsp;&nbsp;&nbsp; <span>${grandTotal}</span>
      </div>
    </div>
  )
}

export default CustomSearchComponent
