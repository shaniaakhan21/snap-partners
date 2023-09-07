/* eslint-disable no-use-before-define */
import * as React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Button, Modal, Box } from '@mui/material'
import { styled } from '@mui/system'
import { useState } from 'react'

const ResponsiveCard = styled(Card)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    maxwidth: '87%',
    padding: theme.spacing(1),
    '@media (max-width: 575.95px)': {
      maxwidth: '100%',
      padding: '8px'
    }
  }
}))

export default function SingleItem ({ image, name, price, btnLabel, index }) {
  const [open, setOpen] = React.useState(false)
  const [referralCode, setReferralCode] = useState('')

  React.useEffect(() => {
    setReferralCode(localStorage.getItem('referralCode') || 'NoSponsor')
  }, [])

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleAddToCart = () => {
    handleOpen()
  }

  return (
    <ResponsiveCard sx={{ background: 'none', boxShadow: 'none' }}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={name}
          image={image}
          className="object-cover"
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ textAlign: 'center', color: 'black', fontSize: '19px!important' }}
          >
            {name}
          </Typography>
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'black' }}>
            {price}
          </Typography>
          <Button
            variant="contained"
            sx={{
              width: '95%',
              ml: 1,
              alignItems: 'center',
              backgroundColor: '#999999',
              color: 'black',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#999999!important'
              },
              '&:active': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)!important',
                color: '#999999!important'
              },
              '&:focus': {
                backgroundColor: 'rgba(255, 255, 255, 0.2)!important',
                color: '#999999!important'
              },
              mt: 1
            }}
            fullWidth
            onClick={handleAddToCart}
          >
            {btnLabel}
          </Button>
        </CardContent>
      </CardActionArea>
      <Modal open={open} onClose={handleClose}>
        <Box
          className="px-8 py-4 md:px-20 md:py-10 rounded-2xl backdrop-blur-3xl"
          sx={{
            position: 'absolute',
            top: '28%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: '',
            boxShadow: 10,
            border: '#ffffff52 1px solid',
            borderRadius: '0.75rem',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <CardContent>
            <p className="text text-white text-2xl md:text-4xl font-normal text-center">
              Purchase Now
            </p>
          </CardContent>
          <span
            className="text text-white text-sm md:text-xl font-light text-center mt-4"
          >
            <a
              href={`https://snapdeliveredteam.com/auth/login-integrous?redirectToIntegrous=true&referralCode=${referralCode}`}
            >
              <span className="underline"> Log In</span>
            </a>

            {/* {" "}
            /{" "}
            <a
              href={`https://snapdeliveredteam.com/auth/signup-integrous?redirectToIntegrous=true&referralCode=${referralCode}`}
              className="underline"
            >
              <span className="underline">Sign Up</span>
            </a>{" "} */}{' '}
            to Continue
          </span>
        </Box>
      </Modal>
    </ResponsiveCard>
  )
}

SingleItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  btnLabel: PropTypes.string.isRequired
}
