import SearchResults from './SearchResults'
import { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Checkbox, IconButton } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox'
import InputSection from './InputSection'
import CustomSearchHeader from './CustomSearchHeader'
import DataTable from './DataTable.json'

const CustomSearchComponent = () => {
  const [data, setData] = useState([])
  const [isLoading] = useState(false)
  const [error, setError] = useState(null)
  const texts = ['Personal Bonus: $0', 'Team Bonus: $0', 'Team Residual: $0', 'CAB: $0']
  const another_texts = ['166 Orders', '7 Reps']

  useEffect(() => {
    try {
      const processedData = DataTable.map(row => ({
        ...row,
        dateChecked: Array(row.date.length).fill(false),
        allSelected: false,
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
      <CustomDataGrid data={data} setData={setData}/>
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

const CustomDataGrid = ({ data, setData }) => {
  const [activeEditRowId, setActiveEditRowId] = useState(null)
  const [newRowData, setNewRowData] = useState({
    date: '',
    type: '',
    amount: '',
    item_id: '',
    product_id: ''
  })

  const handleInputChange = (e, type) => {
    setNewRowData(prevState => ({ ...prevState, [type]: e.target.value }))
  }

  const saveNewRowData = (rowId) => {
    const newData = data.map(d => {
      if (d.id === rowId) {
        return {
          ...d,
          date: [...d.date, newRowData.date],
          type: [...d.type, newRowData.type],
          amount: [...d.amount, parseFloat(newRowData.amount)],
          item_id: [...d.item_id, newRowData.item_id],
          product_id: [...d.product_id, newRowData.product_id]
        }
      }
      return d
    })
    setData(newData)
    setNewRowData({
      date: '',
      type: '',
      amount: '',
      item_id: '',
      product_id: ''
    })
  }

  const handleExpandClick = (rowId) => {
    if (activeEditRowId === rowId) {
      setActiveEditRowId(null)
    } else {
      setActiveEditRowId(rowId)
    }
  }

  const handleDeleteSelected = (rowId) => {
    const updatedData = data.map(row => {
      if (row.id === rowId) {
        const newDate = row.date.filter((_, index) => !row.dateChecked[index])
        const newType = row.type.filter((_, index) => !row.dateChecked[index])
        const newAmount = row.amount.filter((_, index) => !row.dateChecked[index])
        const newItemId = row.item_id.filter((_, index) => !row.dateChecked[index])
        const newProductId = row.product_id.filter((_, index) => !row.dateChecked[index])

        return {
          ...row,
          date: newDate,
          type: newType,
          amount: newAmount,
          item_id: newItemId,
          product_id: newProductId,
          dateChecked: Array(newDate.length).fill(false)
        }
      }
      return row
    })
    setData(updatedData)
  }

  const renderExpandableCell = (cellData, field) => {
    if (cellData.row.id === activeEditRowId) {
      return (
        <div className='flex flex-col'>
          <input
            type={field === 'date' ? 'date' : 'text'}
            placeholder={field.toUpperCase()}
            value={newRowData[field]}
            onChange={e => handleInputChange(e, field)}
          />
        </div>
      )
    } else {
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
    }
  }

  const baseColumns = [
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
          <AddBoxIcon />
        </IconButton>
      )
    },
    {
      field: 'date',
      headerName: 'Order Date',
      width: 150,
      renderCell: (cellData) => {
        if (cellData.row.id === activeEditRowId) {
          return renderExpandableCell(cellData, 'date')
        } else {
          return (
            <div className='flex flex-col'>
              {cellData.row.date.map((detail, index) => (
                <div key={index} className='flex items-center'>
                  <Checkbox
                    className='p-0'
                    checked={cellData.row.dateChecked[index]}
                    onChange={(e) => {
                      e.stopPropagation()
                      const newChecks = [...cellData.row.dateChecked]
                      newChecks[index] = !newChecks[index]
                      const newData = data.map(row => {
                        if (row.id === cellData.row.id) {
                          return {
                            ...row,
                            dateChecked: newChecks
                          }
                        }
                        return row
                      })
                      setData(newData)
                    }}
                  />

                  {new Date(detail).toLocaleDateString()}
                </div>
              ))}
            </div>
          )
        }
      }
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
      renderCell: (cellData) => {
        const selectedAmounts = cellData.row.dateChecked.map((checked, i) => checked ? cellData.row.amount[i] : 0)
        const totalAmountForSelectedItems = selectedAmounts.reduce((a, b) => a + b, 0)
        return (
          <div className="flex justify-center items-center w-full h-full text-lg font-semibold">
                  ${totalAmountForSelectedItems.toFixed(2)}
          </div>
        )
      }
    }

  ]

  const saveColumn = {
    field: 'save',
    headerName: '',
    width: 100,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (cellData) => {
      if (cellData.row.id === activeEditRowId) {
        return (
          <button className="bg-green-600 hover:bg-green-600 text-white font-medium py-1 px-2 " onClick={() => {
            saveNewRowData(cellData.row.id)
            setActiveEditRowId(null)
          }}>
                    Save
          </button>
        )
      }
      return <></>
    }
  }

  const deleteColumn = {
    field: 'delete',
    headerName: 'Delete',
    width: 100,
    sortable: false,
    disableClickEventBubbling: true,
    renderCell: (cellData) => {
      return (
        <button
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2"
          onClick={() => handleDeleteSelected(cellData.row.id)}
        >
          Delete
        </button>
      )
    }
  }

  const anyRowChecked = data.some(row => row.dateChecked.some(checked => checked));
  const columns = activeEditRowId
    ? [...baseColumns.slice(0, -1), saveColumn, baseColumns[baseColumns.length - 1]]
    : anyRowChecked
      ? [...baseColumns.slice(0, -1), deleteColumn, baseColumns[baseColumns.length - 1]]
      : baseColumns

  return (
    <>
      <div className="mt-10" style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={data}
          columns={columns}
          style={{ width: '100%', margin: 0, padding: 0 }}
          rowHeight={100}
        />
      </div>
    </>
  )
}

const GrandTotal = ({ data }) => {
  const grandTotal = data.reduce((sum, row) => {
    const selectedAmounts = row.dateChecked.map((checked, i) => checked ? row.amount[i] : 0)
    return sum + selectedAmounts.reduce((a, b) => a + b, 0)
  }, 0).toFixed(2)

  return (
    <div className="mt-4 flex justify-start pr-10">
      <div className="text-2xl font-semibold">
          Grand Total &nbsp;&nbsp;&nbsp;&nbsp; <span>${grandTotal}</span>
      </div>
    </div>
  )
}

export default CustomSearchComponent
