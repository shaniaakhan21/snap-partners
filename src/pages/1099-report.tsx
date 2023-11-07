/* eslint-disable array-callback-return */
/* eslint-disable new-cap */
import Head from 'next/head'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import DashboardLayout from 'layouts/private/Dashboard'
import { Button, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import axios from 'axios'

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

const Report: Page = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [ssnCheckboxes, setSsnCheckboxes] = useState([])
  const [imageOpen, setImageOpen] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [report1099, setReport1099] = useState(null)
  const [reportDataFlag, setReportDataFlag] = useState(false)

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
    await axios.get('/api/admin/1099-report')
      .then(async (response) => {
        console.log('response from 1099 is', response.data.result)
        const newArr: any[] = []
        await response.data.result.map((res) => newArr.push({
          ...res,
          name: `${res.name} ${res.lastname}`,
          email: res.email,
          oldSSN: res.socialSecurityNumber,
          newSSN: res.newSSN,
          document: res.SSNDocURL
        }))
        setReport1099(newArr)
      })
  }

  useEffect(() => {
    get1099ReportData()
  }, [reportDataFlag])

  const handleRadioChange = (rowId, column, value) => {
    setSsnCheckboxes((prevCheckboxes) => ([
      ...prevCheckboxes,
      {
        id: rowId,
        oldSSN: column === 'oldSSN' ? value : '',
        newSSN: column === 'newSSN' ? value : ''
      }
    ]))
  }
  const handleViewDocument = (imageUrl) => {
    console.log('1099 doc url is', imageUrl)
    // setImageSrc(imageUrl)
    // setImageOpen(true)
  }
  const handleCloseImageDialog = () => {
    setImageOpen(false)
  }

  const handleSSNChangeSubmit = async () => {
    const SSNArray = []
    await ssnCheckboxes.map((box) => {
      if (box.oldSSN) {
        SSNArray.push({ id: box.id, newSSN: box.oldSSN })
      } else if (box.newSSN) {
        SSNArray.push({ id: box.id, socialSecurityNumber: box.newSSN })
      }
    })

    if (SSNArray.length > 0) {
      axios.post('/api/user/ssnBulkUpdate', {
        updateArray: SSNArray
      })
        .then((result) => {
          setReportDataFlag(!reportDataFlag)
          alert('SSN Updated')
        })
        .catch((e) => {
          console.log('error while updating SSN')
          alert('Error while updating SSN')
        })
    }

    closeConfirmationDialog()
  }
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
      flex: windowWidth <= 400 ? 0.5 : 1
    },
    {
      field: 'oldSSN',
      headerName: 'Old SSN',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        <div>
          <input
            type="radio"
            checked={ssnCheckboxes[params.row.id]?.oldSSN}
            onChange={() => handleRadioChange(params.row.id, 'oldSSN', params.value)}
            className='mr-1'
          />
          {params.value}
        </div>)
    },
    {
      field: 'newSSN',
      headerName: 'New SSN',
      type: 'string',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        <div>
          <input
            type="radio"
            checked={ssnCheckboxes[params.row.id]?.newSSN}
            onChange={() => handleRadioChange(params.row.id, 'newSSN', params.value)}
            className='mr-1'
          />
          {params.value}
        </div>)
    },
    {
      field: 'document',
      headerName: 'Documents',
      flex: windowWidth <= 400 ? 0.5 : 1,
      renderCell: (params) => (
        <a href = {params.value ? `${params.value}` : '#'} target='_blank'><Button
          variant="contained"
          className='bg-[#FA4616] hoverit'
          // onClick={() => handleViewDocument(params.value)}
        >
          View Document
        </Button></a>)
    }
  ]

  const rows = [
    {
      name: 'Edwin Zam',
      email: 'edwinzam@gamil.com',
      oldSSN: '235689784',
      newSSN: '232323568',
      document: {
        type: 'png',
        imageUrl: '/static/document.png'
      },
      id: 1
    },
    {
      name: 'John Smith',
      email: 'John22@gamil.com',
      oldSSN: '235634584',
      newSSN: '232325358',
      document: {
        type: 'png',
        imageUrl: '/static/document.png'
      },
      id: 2
    },
    {
      name: 'Richard Williams',
      email: 'richard@gamil.com',
      oldSSN: '235217841',
      newSSN: '232323533',
      document: {
        type: 'png',
        imageUrl: '/static/document.png'
      },
      id: 3
    },
    {
      name: 'Edwin Zam',
      email: 'edwinzam@gamil.com',
      oldSSN: '235689784',
      newSSN: '232323568',
      document: {
        type: 'png'
      },
      id: 4
    },
    {
      name: 'John Smith',
      email: 'John22@gamil.com',
      oldSSN: '235634584',
      newSSN: '232325358',
      document: {
        type: 'png',
        imageUrl: '/static/document.png'
      },
      id: 5
    },
    {
      name: 'Richard Williams',
      email: 'richard@gamil.com',
      oldSSN: '235217841',
      newSSN: '232323533',
      document: {
        type: 'png',
        imageUrl: '/static/document.png'
      },
      id: 6
    }
  ]

  const [confirmationOpen, setConfirmationOpen] = useState(false)

  const openConfirmationDialog = () => {
    setConfirmationOpen(true)
  }

  const closeConfirmationDialog = () => {
    setConfirmationOpen(false)
  }

  const ConfirmationDialog = (
    <Dialog open={confirmationOpen} onClose={closeConfirmationDialog} className='flex justify-center'>
      <DialogContent>
        <p>Are you sure you want to proceed?</p>
        <br></br>
        <div className='flex justify-center'>
          <Button
            variant="contained"
            className='bg-[#FA4616] hoverit p-0 m-0'
            onClick={() => {
              handleSSNChangeSubmit()
            }}
          >
          yes
          </Button>
          <span className='px-2'>or</span>
          <Button
            variant="contained"
            className='bg-[#FA4616] hoverit p-0 m-0'
            onClick={closeConfirmationDialog}
          >
          No
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )

  return (
    <>
      <span className='text-lg sm:text-3xl font-bold'>1099 Exception Report</span><br /><br />
      <div className="w-full bg-white rounded-lg px-5 py-5 sm:px-10 sm:py-10 flex flex-col" id='html-content'>
        <h1 className='text-base sm:text-xl font-semibold'>The Following users need additional verification:</h1>
        <br></br>
        <div>
          {
            report1099 ? <StyledDataGrid columns={columns} rows={report1099}/> : <></>
          }
        </div>
        <br></br>
        <div className='w-full flex justify-end'>
          <Button
            variant="contained"
            onClick={openConfirmationDialog}
            className='w-[10%] bg-[#FA4616] hoverit'
          >
        Submit
          </Button>
        </div>
      </div>
      {ConfirmationDialog}
      <ImageViewer open={imageOpen} onClose={() => setImageOpen(false)} imageUrl={imageSrc} />
    </>
  )
}

Report.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Achievers Report</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default Report
