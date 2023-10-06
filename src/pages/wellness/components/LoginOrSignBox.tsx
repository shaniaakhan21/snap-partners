import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Button } from 'components/common/Button'
import Router from 'next/router'

const LoginOrSignBox = ({ isLoggedIn, userData, referralCode, h1Color, customColor, BgbtnColor }) => {
  const handleLogin = () => {
    const referralCodeFromLocalStorage = localStorage.getItem('referralCode')
    const queryParams = new URLSearchParams(window.location.search)
    const referralCodeFromQuery = queryParams.get('referralCode')
    const referralCode = referralCodeFromLocalStorage || referralCodeFromQuery || 'NoSponsor'

    let loginRoute = '/auth/login-wellness?referralCode=' + referralCode

    if (window.location.pathname.includes('integrousWellness')) {
      loginRoute += '&redirectToIntegrousWellness=true'
    } else if (window.location.pathname.includes('WeightCare')) {
      loginRoute += '&redirectToWeightCare=true'
    }

    Router.push(loginRoute)
  }

  const handleGuestLogin = () => {}
  return (
    <Card
      sx={{
        background: 'transparent',
        border: '#ffffff29 0.5px solid',
        boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.16)',
        filter: 'drop-shadow(0px 17px 34px rgba(0, 0, 0, 0.15))',
        backdropFilter: 'blur(17px)'
      }}
      className="px-0 py-0 lg:px-8 lg:py-2 3xl:py-5 rounded-2xl mt-1 3xl:mt-32 w-8/12 xl:w-6/12 3xl:w-8/12"
    >
      { !isLoggedIn
        ? <CardContent className='p-2 sm:p-4'>
          <h1 className={`text text-${customColor} text-xl md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center mb-4 2xl:mb-5 3xl:mb-8`}>
              Purchase <span className={`text-${h1Color}`}>Now</span>
          </h1>
          <p className={`text text-${customColor} font-light text-center`}>
            <Button onClick={() => { handleLogin() }} classes={`text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl bg-${BgbtnColor} rounded-lg px-8 2xl:py-2 3xl:py-5`}>
              LOG IN / SIGN UP
              <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
            </Button>
          </p>
          <p className={`text-center text-xl md:text-2xl 2xl:text-3xl 3xl:text-4xl font-semibold-it font-normal my-3 text-${customColor}`}>
            OR
          </p>
          <p className={`text text-${customColor} font-light text-center`}>
            <Button onClick={() => { handleGuestLogin() }} classes={`text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-2xl bg-${BgbtnColor} rounded-lg px-8 2xl:py-2 3xl:py-5`}>
              <i className="fa fa-user mr-2" aria-hidden="true"></i>
              Continue as a Guest
            </Button>
          </p>
        </CardContent>
        : <CardContent className='p-2 sm:p-4'>
          <h1 className={`text text-${customColor} text-lg md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center 3xl:leading-tight`}>
            <span className={`text-${h1Color} capitalize`}>{ userData ? `${userData?.name} ${userData?.lastname}` : ''} </span>, Welcome to Snap Wellness
          </h1>
        </CardContent>
      }

    </Card>
  )
}

export default LoginOrSignBox
