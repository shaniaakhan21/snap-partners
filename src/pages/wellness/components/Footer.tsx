import { Grid } from '@mui/material'
import { makeStyles } from '@mui/styles'
import PropTypes from 'prop-types'
import { Button } from 'components/common/Button'
import { useState } from 'react'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
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

  const [formData, setFormData] = useState({
    name: '',
    customerEmail: '',
    ownerEmail: 'next100x98@gmail.com',
    subject: '',
    emailBody: ''
  })
  const [loading, setLoading] = useState(false)

  const handleStoreQuery = async () => {
    if (!formData.name || !formData.customerEmail || !formData.subject || !formData.emailBody) {
      console.log('please fill the form completely')
      return
    }
    setLoading(true)
    await axios.post('/api/admin/email-to-store-owner', formData)
      .then((response) => {
        setLoading(false)
        if (response.data === 'OK') {
          alert('email sent to store owner')
          setFormData({
            ...formData,
            name: '',
            customerEmail: '',
            subject: '',
            emailBody: ''
          })
        } else {
          alert('error while sending email to store owner')
        }
      })
      .catch((e) => {
        setLoading(false)
        console.log('error while sendiing email to owner', e)
      })
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

              <h3 className="text-white text-2xl 3xl:text-4xl">
                Ronan Thompson
              </h3>
            </div>

            <img
              className={classes.profileImage}
              src={
                'https://snap-delivered.nyc3.digitaloceanspaces.com/integrous/Snap_Partners_Large.png'
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
              />
              <input
                style={{ background: '#4B4B4B' }}
                type="text"
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
              SEND
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </footer>
  )
}

export default Footer

Footer.propTypes = {
  userData: PropTypes.any
}
