/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
import Head from 'next/head'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { Button, Dialog, DialogContent, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'
import VisibilityIcon from '@material-ui/icons/Visibility'
import EditIcon from '@material-ui/icons/Edit'
import BStructureDocUpload from './commonPopup/common/individualDocs/BStructureDocUpload'
import { useAuthStore } from 'lib/stores'
import IRSDocUpload from './commonPopup/common/individualDocs/IRSDocUpload'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'
import DocumentDetailView from './commonPopup/common/DocumentDetailView'

const { SEO } = APP_INFO

const ImageViewer = ({ open, onClose, imageUrl }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >
      <IconButton aria-label="close" onClick={onClose} className='justify-end hovercustom'>
        <CloseIcon className='w-[10%] text-black' />
      </IconButton>
      <DialogContent>
        <img src={imageUrl} alt="Document" style={{ width: '80%' }} />
      </DialogContent>
    </Dialog>
  )
}
const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1em'
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgba(224, 224, 224, 0.5)!important',
    fontSize: '1em',
    justifyContent: 'space-around'

  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#fa461630',
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  }

}))

const BusinessReport: Page = () => {
  const { auth, setAuth } = useAuthStore()
  const [windowWidth, setWindowWidth] = useState(0)
  const [imageOpen, setImageOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [report1099, setReport1099] = useState(null)
  const [bStructureModalOpen, setBStructureModalOpen] = useState(false)
  const [IRSdocModalOpen, setIRSdocModalOpen] = useState(false)
  const [selectedDocumentInfo, setSelectedDocumentInfo] = useState(null)
  const [documentDetailModalOpen, setDocumentDetailModalOpen] = useState(false)

  const handleRowClick = (params) => {
    const documentInfo = report1099.find((item) => item.id === params.id)

    setSelectedDocumentInfo(documentInfo)
    setDocumentDetailModalOpen(true)
  }

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
    await axios.get('/api/admin/1099-business-report')
      .then(async (response) => {
        const newArr: any[] = []
        await response.data.result.map((res) => newArr.push({
          ...res,
          id: res.id,
          firstname: res.name,
          lastname: res.lastname,
          email: res.email,
          businessName: res.businessName,
          business_type: res.business_type,
          ein: res.ein,
          b_start_date: res.b_start_date,
          business_verified: res.business_verified,
          business_approved: res.business_approved,
          doc_irs: res.doc_irs,
          doc_b_structure: res.doc_b_structure
        }))
        setReport1099(newArr)
      })
  }

  useEffect(() => {
    get1099ReportData()
  }, [])

  const columns = [
    {
      field: 'id',
      headerName: 'IBO #',
      type: 'string',
      flex: windowWidth <= 400 ? 0.4 : 1,
      renderCell: (params) => (
        <span
          style={{ color: 'blue', cursor: 'pointer' }}
          onClick={() => handleRowClick(params)}
        >
          {params.value}
        </span>
      )
    },
    {
      field: 'businessName',
      headerName: 'Business Name',
      type: 'string',
      flex: windowWidth <= 400 ? 1 : 1
    },
    {
      field: 'business_type',
      headerName: 'Business Type',
      type: 'string',
      flex: windowWidth <= 400 ? 1 : 1
    },
    {
      field: 'ein',
      headerName: 'EIN',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'b_start_date',
      headerName: 'Start Date',
      type: 'string',
      flex: windowWidth <= 400 ? 0.7 : 1,
      renderCell: (params) => (
        <span>
          {params.value ? new Date(params.value).toLocaleDateString('en-US') : ''}
        </span>
      )
    },
    {
      field: 'firstname',
      headerName: 'Owner First Name',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'lastname',
      headerName: 'Owner Last Name',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'business_verified',
      headerName: 'Verified',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        <span>{params.value === 1 ? <CheckCircleIcon style={{ color: '#02c91e', cursor: 'pointer' }}/> : <CancelIcon style={{ color: '#f10606', cursor: 'pointer' }}/>}</span>
      )
    },
    {
      field: 'doc_irs',
      headerName: 'IRS EIN',
      flex: windowWidth <= 400 ? 0.6 : 1,
      renderCell: (params) => (
        params.value
          ? (
            <>
              <VisibilityIcon
                style={{ color: '#FA4616', cursor: 'pointer' }}
                onClick={() => {
                  setImageSrc(params.value)
                  setImageOpen(true)
                }}
              />
              <EditIcon style={{ color: '#FA4616', cursor: 'pointer' }}
                onClick={() => {
                  setIRSdocModalOpen(true)
                }}
              />
              <ImageViewer
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                imageUrl={imageSrc}
              />
            </>
          )
          : (
            <><EditIcon style={{ color: '#FA4616', cursor: 'pointer' }}
              onClick={() => {
                setIRSdocModalOpen(true)
              }}
            /><span>No Data</span></>
          )
      )
    },
    {
      field: 'doc_b_structure',
      headerName: 'Business Structure',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        params.value
          ? (
            <>
              <VisibilityIcon
                style={{ color: '#FA4616', cursor: 'pointer' }}
                onClick={() => {
                  setImageSrc(params.value)
                  setImageOpen(true)
                }}
              />
              <EditIcon style={{ color: '#FA4616', cursor: 'pointer' }}
                onClick={() => {
                  setBStructureModalOpen(true)
                }}
              />
              <ImageViewer
                open={imageOpen}
                onClose={() => setImageOpen(false)}
                imageUrl={imageSrc}
              />
            </>
          )
          : (
            <>
              <div className='flex flex-row justify-between'>
                <EditIcon style={{ color: '#FA4616', cursor: 'pointer' }}
                  onClick={() => {
                    setBStructureModalOpen(true)
                  }}
                /><span>No Data</span>
              </div></>
          )
      )
    },
    {
      field: 'business_approved',
      headerName: 'Approved',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        <span>{params.value === 1 ? <CheckCircleIcon style={{ color: '#02c91e', cursor: 'pointer' }}/> : <CancelIcon style={{ color: '#f10606', cursor: 'pointer' }}/>}</span>
      )
    },
    {
      field: 'email',
      headerName: 'Email',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1
    }
  ]

  return (
    <>
      <span className='text-lg sm:text-3xl font-bold'>Admin Report</span><br /><br />
      <div className="w-full bg-white rounded-lg px-5 py-5 sm:px-10 sm:py-10 flex flex-col" id='html-content'>
        <h1 className='text-base sm:text-xl font-semibold'>The Following needs additional verification:</h1>
        <br></br>
        <div>
          {report1099 && report1099.length > 0
            ? (
              <StyledDataGrid columns={columns} rows={report1099} />
            )
            : (
              <p>No data available</p>
            )}
        </div>
        <br></br>
        {report1099 && report1099.length > 0 && (
          <div className='w-full flex justify-end'>
            <Button
              variant="contained"
              className='w-[10%] bg-[#FA4616] hoverit'
            >
              Submit
            </Button>
          </div>
        )}
      </div>
      <ImageViewer open={imageOpen} onClose={() => setImageOpen(false)} imageUrl={imageSrc} />
      {bStructureModalOpen && (
        <BStructureDocUpload
          onClose={() => setBStructureModalOpen(false)}
          open={bStructureModalOpen}
          auth={auth}
          setAuth={setAuth}
        />
      )}
      {IRSdocModalOpen && (
        <IRSDocUpload
          onClose={() => setIRSdocModalOpen(false)}
          open={IRSdocModalOpen}
          auth={auth}
          setAuth={setAuth}
        />
      )}
      <DocumentDetailView
        open={documentDetailModalOpen}
        onClose={() => setDocumentDetailModalOpen(false)}
        documentInfo={selectedDocumentInfo}
      />
    </>
  )
}

BusinessReport.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Business Report</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default BusinessReport
