/* eslint-disable no-use-before-define */
import Head from 'next/head'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { styled } from '@mui/system'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import * as XLSX from 'sheetjs-style'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload'

const { SEO } = APP_INFO

const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1em',
    textAlign: 'center'
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgba(224, 224, 224, 0.5)!important',
    fontSize: '1em'
  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#fa461630',
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  }
}))

const BusinessReportExport: Page = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [report1099, setReport1099] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const get1099ReportData = async () => {
    try {
      const response = await axios.get('/api/reports/get1099BusinessReport')

      const newArr = response.data.users.map((res, index) => ({
        serialNumber: index + 1,
        id: res.id,
        businessName: res.businessName,
        address: `${res.street}, ${res.city}, ${res.state}, ${res.zip}`,
        totalCompensation: res.total_compensation_2023,
        taxClassification: res.tax_classification,
        ein: res.ein
      }))

      setReport1099(newArr)
    } catch (error) {
      console.error('Error fetching 1099 report data:', error)
    }
  }

  useEffect(() => {
    get1099ReportData()
  }, [])

  const columns = [

    {
      field: 'serialNumber',
      headerName: 'S.No. #',
      type: 'number',
      flex: windowWidth <= 400 ? 0.3 : 0.5,
      renderCell: (params) => <strong>{params.row.serialNumber}</strong>
    },
    {
      field: 'id',
      headerName: 'IBO #',
      type: 'string',
      flex: windowWidth <= 400 ? 0.4 : 1
    },
    {
      field: 'businessName',
      headerName: 'Business Name',
      type: 'string',
      flex: windowWidth <= 400 ? 1 : 1.5
    },
    {
      field: 'address',
      headerName: 'Full Address',
      type: 'string',
      flex: windowWidth <= 400 ? 1 : 2
    },
    {
      field: 'totalCompensation',
      headerName: 'Total $ Compensation Paid out 2023',
      type: 'number',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'taxClassification',
      headerName: 'Tax Classification',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'ein',
      headerName: 'EIN',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    }
  ]

  const handleExportExcel = () => {
    if (report1099 && report1099.length > 0) {
      const headers = columns.map((col) => col.headerName)
      const data = report1099.map((row) => columns.map((col) => row[col.field]))

      const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data])
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
      XLSX.writeFile(workbook, '1099_business_report_2023.xlsx')
    } else {
      console.error('No data available to export')
    }
  }

  return (
    <>
      <div className='w-full bg-white rounded-lg px-5 py-5 sm:px-10 sm:py-10 flex flex-col' id='html-content'>
        <div className='w-full flex justify-between'>
          <span className='text-lg sm:text-3xl font-bold'>1099 Business Report</span>
          <button className='flex border w-[18%] xl:w-[14%] p-2 border-[#E05E4B] bg-white lg:text-sm rounded-full text-primary-500 items-center shadow-md justify-around font-bold' onClick={handleExportExcel}>
            <CloudDownloadIcon classes='text-black'/>Export Report</button>
        </div>
        <br />
        <div>
          {report1099 && report1099.length > 0
            ? (
              <StyledDataGrid columns={columns} rows={report1099} />
            )
            : (
              <p>No data available</p>
            )}
        </div>
        <br />
      </div>
    </>
  )
}

BusinessReportExport.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Business Report</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default BusinessReportExport
