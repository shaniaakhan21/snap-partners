import { Dialog, DialogContent, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

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
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <IconButton aria-label="close" onClick={onClose} className='justify-end hovercustom'>
        <CloseIcon className='w-[10%] text-black' />
      </IconButton>
      <DialogContent>
        <div>
          <h2 className='font-bold text-2xl text-center uppercase'>Business Information</h2>
          <p className='font-bold text-xl'>IBO ID: <span className='font-normal text-xl'>{documentInfo.id}</span> </p>
          <p className='font-bold text-xl'>Business Name: <span className='font-normal text-xl'>{documentInfo.businessName}</span></p>
          <p className='font-bold text-xl'>Business Type: <span className='font-normal text-xl'>{documentInfo.business_type}</span> </p>
          <p className='font-bold text-xl'>EIN: <span className='font-normal text-xl'>{documentInfo.ein}</span></p>
          <p className='font-bold text-xl'>Owner Name: <span className='font-normal text-xl capitalize'>{documentInfo.name} {documentInfo.lastname}</span> </p>
          <p className='font-bold text-xl'>Owner Email: <span className='font-normal text-xl'>{documentInfo.email}</span> </p>
          <p className='font-bold text-xl'>IRS Doc: </p>
          {documentInfo.doc_irs
            ? (
              <img src={documentInfo.doc_irs} alt="IRS Document" style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', border: '1px solid black' }} />
            )
            : (
              <p>No IRS Document available</p>
            )}
          <br/>
          <p className='font-bold text-xl'>Business Intity Form: </p>

          {documentInfo.doc_b_structure
            ? (
              <img src={documentInfo.doc_b_structure} alt="Business Entity Form" style={{ width: '100%', maxHeight: '500px', objectFit: 'contain', border: '1px solid black' }} />
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
