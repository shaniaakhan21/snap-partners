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
          {documentInfo.doc_irs
            ? (
              <img src={documentInfo.doc_irs} alt="IRS Document" style={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
            )
            : (
              <p>No IRS Document available</p>
            )}
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
