import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Button } from 'components/common/Button'
import { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import axios from 'axios'

function Footer ({ userData, ownerName, ownerEmail, ownerProfileImage, customFooterBorder, submitBtnBg, customfooterInputbg, customFooterBoxbg, customFooterbg }) {
  const [formData, setFormData] = useState({
    name: '',
    customerEmail: '',
    ownerEmail: '',
    subject: '',
    emailBody: ''
  })
  const [loading, setLoading] = useState(false)

  const [successDialogOpen, setSuccessDialogOpen] = useState(false)
  const [errorDialogOpen, setErrorDialogOpen] = useState(false)

  const openSuccessDialog = () => {
    setSuccessDialogOpen(true)
  }

  const closeSuccessDialog = () => {
    setSuccessDialogOpen(false)
  }

  const openErrorDialog = () => {
    setErrorDialogOpen(true)
  }

  const closeErrorDialog = () => {
    setErrorDialogOpen(false)
  }

  const handleStoreQuery = async () => {
    if (!formData.name || !formData.customerEmail || !formData.subject || !formData.emailBody) {
      alert('please fill the form completely')
      return
    }
    setLoading(true)
    try {
      const token = localStorage.getItem('access_token')
      const response = await axios.post('/api/admin/email-to-store-owner', formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      if (response.data === 'OK') {
        openSuccessDialog()
        setFormData({
          ...formData,
          name: '',
          customerEmail: '',
          subject: '',
          emailBody: ''
        })
      } else {
        openErrorDialog()
      }
    } catch (error) {
      console.error('Error while sending email to store owner', error)
      openErrorDialog()
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className={'bg-none sm:bg-[#F0F0F0] px-2 pt-1 pb-1 sm:px-10 sm:pt-5 sm:pb-5 '}>
      <Grid container>
        <Grid item xs={12} md={12} className='flex justify-center'>
          <div className='flex flex-col justify-around m-1 sm:m-0 w-full sm:w-9/12 relative -top-[0%] sm:-top-[12%]'>
            <div className={'flex flex-row-reverse items-center'}>
              <div className={'w-full py-0'}>
                <h3 className="text-[#404040] font-semibold text-base sm:text-2xl 3xl:text-4xl capitalize">
                  {ownerName}' store
                </h3>
              </div>
              <div className="block relative mr-6">
                <img
                  className='h-20 w-34 sm:h-36 sm:w-40 rounded-full object-cover'
                  src={ownerProfileImage || '/static/wellness/snap_wellness.svg'}
                  alt="{userData.name}"
                />
              </div>
            </div>
            <form className={'$ {classes.form} pt-5'}>
              <div className="flex flex-col sm:flex-row w-full m-1">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={(formData.name)}
                  onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                  className={'w-full sm:w-1/2 px-6 py-6 placeholder-[#404040] border border-none text-black font-normal  mr-2 mb-3 bg-[#F0F0F0] sm:bg-white'}
                  required />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={(formData.customerEmail)}
                  onChange={(e) => { setFormData({ ...formData, customerEmail: e.target.value }) }}
                  className={'w-full sm:w-1/2 px-6 py-6 placeholder-[#404040] border border-none text-black font-normal mb-3 bg-[#F0F0F0] sm:bg-white'}
                />
              </div>
              <input
                type="text"
                placeholder="Let&rsquo;s Talk about it"
                value={(formData.subject)}
                onChange={(e) => { setFormData({ ...formData, subject: e.target.value }) }}
                className={'w-full px-6 py-6 border border-none text-black placeholder-[#404040] font-normal m-1 mb-3 bg-[#F0F0F0] sm:bg-white'}
              />
              <textarea
                placeholder="Type your message here"
                value={(formData.emailBody)}
                onChange={(e) => { setFormData({ ...formData, emailBody: e.target.value }) }}
                className={'w-full h-40 px-6 py-6 placeholder-[#404040] border border-none text-black font-normal m-1 bg-[#F0F0F0] sm:bg-white'}
              />
              <div className='w-full flex flex-col-reverse sm:flex-row justify-between mt-1 sm:mt-8'>
                <img
                  className='px-10 sm:px-0'
                  src={
                    '/static/footer_logo.png'
                  }
                />
                <Button disabled={!!loading} onClick={() => { handleStoreQuery() }} classes={'text-base bgc-black rounded-none w-full sm:w-36 uppercase mt-2 mb-4 sm:mb-0'}>
              SUBMIT
                </Button>
              </div>
            </form>
          </div>
        </Grid>
      </Grid>
      <Dialog open={successDialogOpen} onClose={closeSuccessDialog}>
        <div className='bg-green-400 p-10 flex flex-row justify-center items-center'>
          <div className="px-4 py-3 border-2 border-white rounded-full">
            <i className="fa fa-check text-black text-center text-4xl" aria-hidden="true"></i>
          </div>
        </div>
        <DialogTitle className='text-3xl font-bold text-center'>Thank You!</DialogTitle>
        <DialogContent>
        Email has been succesfully sent to store owner.
        </DialogContent>
        <DialogActions>
          <Button classes='bg-btn-color' onClick={closeSuccessDialog}>
          Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={errorDialogOpen} onClose={closeErrorDialog}>
        <div className='bg-red-600 p-10 flex flex-row justify-center items-center'>
          <div className="px-6 py-4 border-2 border-white rounded-full">
            <i className="fa fa-xmark text-black text-center text-4xl" aria-hidden="true"></i>
          </div>
        </div>
        <DialogTitle className='text-3xl font-bold text-center'>Try again, Later! </DialogTitle>
        <DialogContent>
        Error, while sending email to store owner
        </DialogContent>
        <DialogActions>
          <Button classes='bg-btn-color' onClick={closeErrorDialog}>
          Close
          </Button>
        </DialogActions>
      </Dialog>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  userData: PropTypes.any
}
