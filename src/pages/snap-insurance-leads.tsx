/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
import Head from 'next/head'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import axios from 'axios'

const { SEO } = APP_INFO

const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1.2em'
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#fa461630',
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  }

}))

const InsuranceLeads: Page = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [insuranceleads, setInsuranceLeads] = useState(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getLeadsData = async () => {
    await axios.get('/api/snap-insurance/getlead')
      .then(async (response) => {
        const newArr: any[] = []
        await response.data.result.map((res, index) => newArr.push({
          ...res,
          id: index + 1,
          name: `${res.firstName} ${res.lastName}`,
          email: res.email,
          phoneNumber: res.phoneNumber,
          postalCode: res.postalCode,
          annualHousehold: `$${res.annualHousehold}`,
          familySize: res.familySize,
          state: res.state
        }))
        setInsuranceLeads(newArr)
      })
  }

  useEffect(() => {
    getLeadsData()
  }, [])

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      flex: windowWidth <= 400 ? 0.8 : 1
    },
    {
      field: 'phoneNumber',
      headerName: 'Phone Number',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'postalCode',
      headerName: 'Postal Code',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'annualHousehold',
      headerName: 'Annual Household Income',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'familySize',
      headerName: 'Family Size',
      type: 'number',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'state',
      headerName: 'State',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    }
  ]

  return (
    <>
      <span className='text-lg sm:text-3xl font-bold'>Snap Insurance Leads</span><br /><br />
      <div className="w-full bg-white rounded-lg px-5 py-5 sm:px-10 sm:py-10 flex flex-col" id='html-content'>
        <br></br>
        <div>
          {insuranceleads && insuranceleads.length > 0
            ? (
              <StyledDataGrid columns={columns} rows={insuranceleads} />
            )
            : (
              <p>No data available</p>
            )}
        </div>
      </div>
    </>
  )
}

InsuranceLeads.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Snap Insurance Leads</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default InsuranceLeads
