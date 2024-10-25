/* eslint-disable no-use-before-define */
import * as React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CardActionArea, Button, Modal } from '@mui/material'
import { styled } from '@mui/system'
import Router from 'next/router'
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

export default function SingleItem ({ image, name, price, btnLabel, index, referralCode, onGuestLogin }) {
  const [open, setOpen] = useState(false)
  const handleLogin = (isGuest: boolean = false) => {
    const referralCodeFromLocalStorage = localStorage.getItem('referralCode')
    const queryParams = new URLSearchParams(window.location.search)
    const referralCodeFromQuery = queryParams.get('referralCode')
    const referralCode = referralCodeFromLocalStorage || referralCodeFromQuery || 'NoSponsor'

    let loginRoute = '/auth/login-wellness?referralCode=' + referralCode

    if (window.location.pathname.includes('wellness')) {
      loginRoute += '&redirectToIntegrousWellness=true'
    } else if (window.location.pathname.includes('WeightCare')) {
      loginRoute += '&redirectToWeightCare=true'
    }

    Router.push(loginRoute)

    if (isGuest) {
      localStorage.setItem('isGuest', 'true')
    }
  }

  const handleSignUp = () => {
    const referralCodeFromLocalStorage = localStorage.getItem('referralCode')
    const queryParams = new URLSearchParams(window.location.search)
    const referralCodeFromQuery = queryParams.get('referralCode')
    const referralCode = referralCodeFromLocalStorage || referralCodeFromQuery || 'NoSponsor'

    let signupRoute = '/auth/signup-wellness?role=CUSTOMER&referralCode=' + referralCode

    if (window.location.pathname.includes('wellness')) {
      signupRoute += '&redirectToIntegrousWellness=true'
    } else if (window.location.pathname.includes('WeightCare')) {
      signupRoute += '&redirectToWeightCare=true'
    }

    Router.push(signupRoute)
  }

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
    <ResponsiveCard className='m-4' sx={{ background: 'none', boxShadow: 'none', border: 'none' }}>
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
            className='text-center text-black-h text-sm font-bold xl:text-base 2xl:text-xl'
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
              backgroundColor: '#0000006b!important',
              color: 'white',
              '&:hover': {
                backgroundColor: '#4D655B!important',
                color: 'white!important'
              },
              '&:active': {
                backgroundColor: '#4D655B!important',
                color: 'white!important'
              },
              '&:focus': {
                backgroundColor: '#4D655B!important',
                color: 'white!important'
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
        <Card
          sx={{
            background: '#000000e0',
            border: '#0000004f 1px solid',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            position: 'absolute'
          }}
          className="md:px-20 md:py-10 rounded-2xl mt-1 3xl:mt-32 w-full lg:w-10/12 xl:w-8/12 2xl:w-6/12 3xl:w-7/12 backdrop-blur-4xl left-[0%] top-[20%] sm:left-[0%] sm:top-[20%] lg:left-[9%] xl:left-[17%] 2xl:left-[22%] 3xl:left-[23%]"
        >
          <CardContent>
            <h1 className="text text-white text-2xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center mb-4 2xl:mb-8 3xl:mb-8">
              Purchase <span className='text-red-h'>Now</span>
            </h1>
            <div className='flex justify-around flex-col sm:flex-row'>
              <p className="text text-white font-light text-center">
                <Button onClick={() => { handleLogin() }} className='text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl bg-btn-color rounded-lg px-8 2xl:py-2 3xl:py-5 mb-2'>
              LOG IN
                  <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
                </Button>
              </p>
              <p className="text text-white font-light text-center">
                <Button onClick={() => { handleSignUp() }} className='text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl bg-btn-color rounded-lg px-8 2xl:py-2 3xl:py-5 mb-2'>
              SIGN UP
                  <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
                </Button>
              </p>
              <p className="text text-white font-light text-center">
                <Button onClick={() => {
                  if (onGuestLogin) {
                    onGuestLogin()
                    window.location.reload()
                  }
                }} className='text-white text-xs md:text-base lg:text-md xl:text-lg 2xl:text-lg 3xl:text-xl bg-btn-color rounded-lg px-8 2xl:py-2 3xl:py-5 mb-2'>
                  <i className="fa fa-user mr-2" aria-hidden="true"></i>
              Continue as a Guest
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
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
