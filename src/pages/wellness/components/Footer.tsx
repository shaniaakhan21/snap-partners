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

const useStyles = makeStyles((theme) => ({
  footer1: {
    backgroundColor: '#2D2D2D!important'
  },
  profileImage: {
    width: '70%',
    marginLeft: '3%',
    borderRadius: '50%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  placeholderWhite: {
    '&::placeholder': {
      color: 'white',
      border: '2px solid #7D7D7D'
    },
    input: {
      color: 'white'
    },
    border: '2px solid #7D7D7D'
  },
  button: {
    alignSelf: 'flex-start'
  }
}))

function Footer ({ userData }) {
  const classes = useStyles()
  let ownerName:string
  let ownerEmail:string

  useEffect(() => {
    ownerName = localStorage.getItem('ownerName')
    setOwner(ownerName)
    ownerEmail = localStorage.getItem('ownerEmail')
    setFormData({ ...formData, ownerEmail: ownerEmail })
  }, [])

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
  const [owner, setOwner] = useState('')

  // Functions to open/close success and error dialogs
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
      console.log('please fill the form completely')
      return
    }
    setLoading(true)
    try {
      const response = await axios.post('/api/admin/email-to-store-owner', formData)

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
    <footer style={{ backgroundColor: '#2D2D2D!important' }} className={`${classes.footer1} px-10 pt-5 pb-5`}>
      <Grid container>
        <Grid
          item
          xs={12}
          md={3}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'left',
            flexDirection: 'column',
            padding: '1% 0 1% 0'
          }}

        >
          <div className='flex flex-col items-center w-8/12 rounded-lg border-2 customDarkGray text-center'>
            <div className='customback w-full py-6'>
              <h3 className="text-white text-base font-light text-center uppercase 3xl:text-2xl">Store Owner</h3>

              <h3 className="text-white text-2xl 3xl:text-4xl capitalize">
                {owner}
              </h3>
            </div>

            <img
              className={`${classes.profileImage} p-2`}
              src={
                '/static/wellness/snap_wellness.svg'
              }
              alt="{userData.name}"
            />
          </div>

        </Grid>
        <Grid item xs={12} md={9}>
          <form className={'$ {classes.form} pr-0 md:pr-24 pt-5'}>
            <div className="flex flex-row w-full m-1">
              <input
                style={{ background: '#4B4B4B' }}
                type="text"
                placeholder="Your Name"
                value={(formData.name)}
                onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }}
                className="w-1/2 px-6 py-4 placeholder-white placeholder-opacity-60 border border-none rounded-3xl text-white font-light  mr-2 mb-3"
                required />
              <input
                style={{ background: '#4B4B4B' }}
                type="email"
                placeholder="Your Email"
                value={(formData.customerEmail)}
                onChange={(e) => { setFormData({ ...formData, customerEmail: e.target.value }) }}
                className="w-1/2 px-6 py-4 placeholder-white placeholder-opacity-60 border border-none rounded-3xl text-white font-light mb-3"
              />
            </div>
            <input
              style={{ background: '#4B4B4B' }}
              type="text"
              placeholder="Let&rsquo;s Talk about it"
              value={(formData.subject)}
              onChange={(e) => { setFormData({ ...formData, subject: e.target.value }) }}
              className="w-full px-6 py-4 border border-none rounded-3xl text-white font-light m-1 mb-3"
            />
            <textarea
              style={{ background: '#4B4B4B' }}
              placeholder="Type your message here"
              value={(formData.emailBody)}
              onChange={(e) => { setFormData({ ...formData, emailBody: e.target.value }) }}
              className="w-full h-40 px-6 py-4 placeholder-white placeholder-opacity-60 border border-none rounded-3xl text-white font-light m-1"
            />
            <div className='w-full flex justify-end'>
              <Button disabled={!!loading} onClick={() => { handleStoreQuery() }} classes='text-base bg-btn-color rounded-lg w-36 uppercase mt-2'>
              SUBMIT
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
      <Dialog open={successDialogOpen} onClose={closeSuccessDialog}>
        <div className='bg-green-400 p-10 flex flex-row justify-center items-center'>
          <div className="px-4 py-3 border-2 border-white rounded-full">
            <i className="fa fa-check text-white text-center text-4xl" aria-hidden="true"></i>
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
            <i className="fa fa-xmark text-white text-center text-4xl" aria-hidden="true"></i>
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
