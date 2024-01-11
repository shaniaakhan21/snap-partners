/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
import Head from 'next/head'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
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
import { getLocalStorage } from 'lib/utils/localStorage'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'

const { SEO } = APP_INFO

const ApprovalDialog = ({ open, onClose, onConfirm }) => {
  const handleConfirm = () => {
    onConfirm()

    onClose()
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Approval</DialogTitle>
      <DialogContent>
        Are you sure you want to approve this user?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export const ImageViewer = ({ open, onClose, imageUrl }) => {
  const isPdf = imageUrl.endsWith('.pdf')
  const openPdfInNewTab = () => {
    window.open(imageUrl, '_blank')
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md" >
      <IconButton aria-label="close" onClick={onClose} className='justify-end hovercustom'>
        <CloseIcon className='w-[10%] text-black' />
      </IconButton>
      <DialogContent>
        {isPdf
          ? (
            <><h1 className='text-xl font-bold mb-4'>A Pdf was Uploaded </h1><Button variant="contained" color="primary" onClick={openPdfInNewTab} className='text-white border-2 border-black outline bg-[#E74426]'>
              Open PDF in Browser
            </Button></>

          )
          : (
            <img src={imageUrl} alt="Document" style={{ width: '80%' }} />
          )}
      </DialogContent>
    </Dialog>
  )
}

const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold',
    fontSize: '1em',
    textAlign: 'center'
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
  const [approvalDialogOpen, setApprovalDialogOpen] = useState(false)
  const [activeEditRowId, setActiveEditRowId] = useState(null)
  const [editableRowId, setEditableRowId] = useState(null)
  const [editedData, setEditedData] = useState({
    ein: '',
    businessName: '',
    business_type: '',
    firstname: '',
    lastname: '',
    b_start_date: null

  })

  const makeRowEditable = (rowId) => {
    setEditableRowId(rowId)
    setEditedData({
      ein: '',
      businessName: '',
      business_type: '',
      firstname: '',
      lastname: '',
      b_start_date: null
    })
  }
  const validateUser = async () => {
    try {
      const response = await axios.post(
        '/api/user/isValidated',
        { isValidated: true },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        }
      )

      if (response.data.result[0] === 1) {
        setAuth({ ...auth, isValidated: true })
      } else {
        alert('Error while confirming validation')
      }
    } catch (error) {
      alert('Error while confirming validation')
    }
  }

  const handleSaveClick = async (rowId) => {
    await axios.post('/api/user/update-business-fields', {
      businessName: editedData.businessName,
      ein: editedData.ein,
      b_start_date: editedData.b_start_date,
      business_type: editedData.business_type,
      name: editedData.firstname,
      lastname: editedData.lastname,
      userId: editableRowId
    },
    {
      headers: {
        Authorization: `Bearer ${auth.accessToken}`
      }
    })
    setEditableRowId(null)
    window.location.reload()
  }

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

  const handleExpandClick = (rowId) => {
    if (activeEditRowId === rowId) {
      setActiveEditRowId(null)
    } else {
      setActiveEditRowId(rowId)
    }
  }

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

  const handleApproveClick = (userId) => {
    setSelectedDocumentInfo(userId)
    setApprovalDialogOpen(true)
  }

  const handleApproveAndReload = async () => {
    const token = getLocalStorage('accessToken')
    const body = { userId: selectedDocumentInfo, business_approved: 1 } // Assuming 1 is for approval

    try {
      await axios.post('/api/user/verifyBusiness', {
        businessValidationStatus: true,
        businessApproveStatus: true,
        userId: selectedDocumentInfo
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`
        }
      })

      // Close the approval dialog and reload the page
      await validateUser()
      setApprovalDialogOpen(false)
      // window.location.reload()
    } catch (error) {
      console.error('Error while approving user:', error)
    }
  }

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({ ...prevData, [field]: value }))
  }

  const renderCellContent = (params, fieldName) => {
    if (editableRowId === params.row.id) {
      if (fieldName === 'b_start_date') {
        return (
          <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={editedData[fieldName] || null}
                onChange={(date) => handleInputChange(fieldName, date)}
                sx={{
                  '.MuiInputBase-input, .MuiOutlinedInput-input ': {
                    padding: '4px!important',
                    fontSize: '12px!important'
                  },
                  '.MuiOutlinedInput-root ': {
                    borderRadius: '0px!important',
                    border: '1px solid #E35C49'
                  }
                }}
                className='text-sm p-0'
              />
            </LocalizationProvider>
          </div>
        )
      }

      return (
        <input
          type="text"
          style={{ textAlign: 'center', width: '100%', border: '1px solid #E35C49' }}
          value={editedData[fieldName] || ''}
          onChange={(e) => handleInputChange(fieldName, e.target.value)}
          onKeyDown={(e) => {
            if (e.key === ' ') {
              e.stopPropagation()
            }
          }}
          placeholder='Type here...'
        />
      )
    }

    if (fieldName === 'b_start_date') {
      return (
        <span>
          {params.value ? new Date(params.value).toLocaleDateString('en-US') : ''}
        </span>
      )
    }

    return (
      <span
      >
        {params.value}
      </span>
    )
  }

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
      field: 'edit',
      headerName: '',
      padding: 2,
      margin: 2,
      sortable: false,
      width: 10,
      disableClickEventBubbling: true,
      renderCell: (cellData) => (
        <>
          {editableRowId === cellData.row.id
            ? (
              <IconButton
                onClick={() => handleSaveClick(cellData.row.id)}
                style={{
                  color: 'white',
                  borderRadius: 0,
                  borderBottom: 'none',
                  fontSize: '12px',
                  backgroundColor: '#E35C49'
                }}
              >
            Save
              </IconButton>
            )
            : (
              <IconButton
                onClick={() => makeRowEditable(cellData.row.id)}
                style={{
                  display: activeEditRowId === cellData.row.id ? 'none' : 'block',
                  color: '#E35C49',
                  borderRadius: 0,
                  borderBottom: 'none'
                }}
              >
                <EditIcon />
              </IconButton>
            )}
        </>
      )
    },
    {
      field: 'businessName',
      headerName: 'Business Name',
      type: 'string',
      flex: windowWidth <= 400 ? 1 : 1.5,
      renderCell: (params) => renderCellContent(params, 'businessName')
    },
    {
      field: 'business_type',
      headerName: 'Business Type',
      type: 'string',
      flex: windowWidth <= 400 ? 1 : 2,
      renderCell: (params) => renderCellContent(params, 'business_type')
    },
    {
      field: 'ein',
      headerName: 'EIN',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => renderCellContent(params, 'ein')
    },
    {
      field: 'b_start_date',
      headerName: 'Start Date',
      type: 'string',
      flex: windowWidth <= 400 ? 0.7 : 1,
      renderCell: (params) => renderCellContent(params, 'b_start_date')
    },
    {
      field: 'firstname',
      headerName: 'Owner First Name',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1.2,
      renderCell: (params) => renderCellContent(params, 'firstname')
    },
    {
      field: 'lastname',
      headerName: 'Owner Last Name',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1.2,
      renderCell: (params) => renderCellContent(params, 'lastname')
    },
    {
      field: 'business_verified',
      headerName: 'Verified',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        <span>{params.value === 1 ? <CheckCircleIcon style={{ color: '#37D034', cursor: 'pointer' }}/> : <CancelIcon style={{ color: '#D03434', cursor: 'pointer' }}/>}</span>
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
                style={{ color: '#5E828D', cursor: 'pointer' }}
                onClick={() => {
                  setImageSrc(params.value)
                  setImageOpen(true)
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
            <><span>No Data</span></>
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
                style={{ color: '#5E828D', cursor: 'pointer' }}
                onClick={() => {
                  setImageSrc(params.value)
                  setImageOpen(true)
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
                <span>No Data</span>
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
        <span>{params.value === 1
          ? <><CheckCircleIcon style={{ color: '#37D034', cursor: 'pointer' }} /></>
          : <><CancelIcon style={{ color: '#D03434', cursor: 'pointer' }} /><EditIcon
            style={{ cursor: 'pointer' }}
            onClick={() => handleApproveClick(params.row.id)}
          /></>}</span>
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
      <span className='text-lg sm:text-3xl font-bold'>1099 Business Verification Report</span><br /><br />
      <div className="w-full bg-white rounded-lg px-5 py-5 sm:px-10 sm:py-10 flex flex-col" id='html-content'>
        <h1 className='text-base sm:text-xl font-semibold'>The Following IBOs need additional verification:</h1>
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
      <ApprovalDialog
        open={approvalDialogOpen}
        onClose={() => setApprovalDialogOpen(false)} onConfirm={handleApproveAndReload} />
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
