import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Button } from 'components/common/Button'
import Router from 'next/router'

const LoginOrSignBox = ({ isLoggedIn, userData }) => {
  const handleLogin = () => {
    const referralCodeFromLocalStorage = localStorage.getItem('referralCode')
    const queryParams = new URLSearchParams(window.location.search)
    const referralCodeFromQuery = queryParams.get('referralCode')
    const referralCode = referralCodeFromLocalStorage || referralCodeFromQuery || 'NoSponsor'
    Router.push(`/auth/login-wellness?redirectToWellness=true&referralCode=${referralCode}`)
  }
  return (
    <Card
      sx={{ background: '#0000004f', border: '#0000004f 1px solid', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      className="px-0 py-0 lg:px-8 lg:py-2 3xl:py-5 rounded-2xl mt-1 3xl:mt-32 w-8/12 xl:w-6/12 3xl:w-8/12"
    >
      { !isLoggedIn
        ? <CardContent>
          <h1 className="text text-white text-2xl md:text-3xl 2xl:text-4xl 3xl:text-6xl font-semibold-it font-normal text-center mb-4 2xl:mb-5 3xl:mb-8">
              Purchase <span className='text-red-h'>Now</span>
          </h1>
          <p className="text text-white font-light text-center">
            <Button onClick={() => { handleLogin() }} classes=' text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-4xl bg-btn-color rounded-lg px-8 2xl:py-2 3xl:py-5'>
              LOG IN / SIGN UP
              <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
            </Button>
          </p>
        </CardContent>
        : <CardContent>
          <h1 className="text text-white text-2xl md:text-3xl 2xl:text-4xl 3xl:text-7xl font-semibold-it font-normal text-center 3xl:leading-tight">
            <span className='text-red-h capitalize'>{ userData ? `${userData?.name} ${userData?.lastname}` : ''} </span>, Welcome to Snap Wellness
          </h1>
        </CardContent>
      }

    </Card>
  )
}

export default LoginOrSignBox
