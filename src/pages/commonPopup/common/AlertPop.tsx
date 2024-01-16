import { Alert } from '@mui/material'
import Modal from '@mui/material/Modal'
import { useAuthStore } from 'lib/stores'

const CustomHelpModal = ({ isOpen, onClose }) => {
  const { removeAuth } = useAuthStore()
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="custom-modal-title"
      aria-describedby="custom-modal-description"
    >
      <Alert className='bg-[#FDEDED] p-2 w-9/12 md:w-6/12 my-8 md:my-20 md:mx-[26%] text-lg' sx={{
        '& .MuiAlert-icon': {
          fontSize: '37px!important'
        }
      }}severity="error">
        <h1 className='font-bold text-xl uppercase mb-2'>Back Office Access Frozen</h1>
        <p className='underline w-fit font-semibold'>
      You are now required to fill out this form before proceeding to your back office.
        </p>
        <p className='mt-2'>
    Please open a help ticket by emailing{' '}
          <a className='font-bold' href="mailto:support@snappartners.com">support@snappartners.com</a> for any reason
        that prohibits your ability to complete this form.
        </p>
        <button className='w-full text-end font-bold pr-4 text-black-h' onClick={() => { onClose() }}>Close</button>
        <button className='w-full text-end font-bold pr-4 text-black-h' onClick={() => { removeAuth() }}>Log Out</button>
      </Alert>
    </Modal>
  )
}

export default CustomHelpModal
