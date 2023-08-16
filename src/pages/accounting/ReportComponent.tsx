import { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid'
import reportData from './ReportData.json'

interface ReportComponentProps {
    title: string;
}

const ReportComponent = ({ title }: ReportComponentProps) => {
  const [data, setData] = useState<{columns: GridColDef[], rows: GridRowsProp} | null>(null)

  useEffect(() => {
    const updatedRows = reportData.rows.map(row => {
      const total = row.personal_income + row.team_bonus + row.team_residual + row.cab_bonus
      return {
        ...row,
        total: total
      }
    })

    setData({
      ...reportData,
      rows: updatedRows
    })
  }, [])

  if (!data) return <p>Loading...</p>

  return (
    <div style={{ height: 400, width: '100%' }}>
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <DataGrid
        {...({
          rows: data.rows,
          columns: data.columns,
          pageSize: 5,
          rowsPerPageOptions: [5],
          checkboxSelection: true
        } as any)}
      />
    </div>
  )
}

export default ReportComponent
