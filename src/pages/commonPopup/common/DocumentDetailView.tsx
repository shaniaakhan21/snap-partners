import { Button, Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

const DocumentViewer = ({ documentUrl }) => {
  const isPdf = documentUrl && documentUrl.endsWith('.pdf')

  const openPdfInNewTab = () => {
    window.open(documentUrl, '_blank')
  }

  return (
    <div className='p-4 mb-6'>
      {isPdf
        ? (
          <>
            <h1 className='text-xl font-bold mb-4'>A PDF was Uploaded </h1>
            <Button variant="contained" color="primary" onClick={openPdfInNewTab} className='text-white border-2 border-black outline bg-[#E74426]'>
            Open PDF in Browser
            </Button>
          </>
        )
        : (
          <img src={documentUrl} alt="Document" style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
        )}
    </div>
  )
}

const DocumentDetailView = ({ open, onClose, documentInfo }) => {
  if (!documentInfo) {
    // If documentInfo is null, you can return a message or handle it accordingly
    return (
      <DialogContent>
        <p>No document information available</p>
      </DialogContent>
    )
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <div className='flex flex-row justify-between'>
        <h2 className='font-bold text-2xl text-center uppercase  pl-5 mt-6'>Business Information</h2>
        <IconButton aria-label="close" onClick={onClose} className='justify-end hovercustom pr-5'>
          <CloseIcon className='text-black' />
        </IconButton>
      </div>
      <DialogContent>
        <div className='border-2 border-[#DDDDDD] rounded-xl p-4 bg-[#F6F6F6] mb-6'>
          <div className='flex flex-wrap justify-between mb-4 w-full'>
            <p className='font-bold text-xl'>IBO ID: <br/><span className='font-normal text-xl'>{documentInfo.id}</span> </p>
            <p className='font-bold text-xl'>Business Name: <br/><span className='font-normal text-xl'>{documentInfo.businessName}</span></p>
            <p className='font-bold text-xl'>Business Type: <br/><span className='font-normal text-xl'>{documentInfo.business_type}</span> </p>
            <p className='font-bold text-xl'>EIN: <br/><span className='font-normal text-xl'>{documentInfo.ein}</span></p>
            <p className='font-bold text-xl'>Owner Name: <br/><span className='font-normal text-xl capitalize'>{documentInfo.name} {documentInfo.lastname}</span> </p>
            <p className='font-bold text-xl'>Owner Email: <br/><span className='font-normal text-xl'>{documentInfo.email}</span> </p>
          </div>
        </div>
        <p className='font-bold text-xl'>IRS Doc: </p>
        <div className='border-2 border-[#DDDDDD] rounded-xl p-4 bg-[#F6F6F6]  mb-6'>
          <DocumentViewer documentUrl={documentInfo.doc_irs} />
        </div>
        <p className='font-bold text-xl'>Business Intity Form: </p>
        <div className='border-2 border-[#DDDDDD] rounded-xl p-4 bg-[#F6F6F6]'>
          {documentInfo.doc_b_structure
            ? (
              <img src={documentInfo.doc_b_structure} alt="Business Entity Form" style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
            )
            : (
              <p>No Business Entity Form available</p>
            )}

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default DocumentDetailView
