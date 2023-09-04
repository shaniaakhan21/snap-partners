import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Button } from 'components/common/Button'
import Router from 'next/router'

const LoginOrSignBox = () => {
  const handleLogin = () => {
    const referralCode = localStorage.getItem('referralCode') || 'NoSponsor'
    Router.push(`/auth/login-wellness?redirectToWellness=true&referralCode=${referralCode}`)
  }
  return (
    <Card
      sx={{ background: '#0000004f', border: '#0000004f 1px solid', boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
      className="px-0 py-0 lg:px-8 lg:py-2 rounded-2xl mt-1 w-8/12 xl:w-6/12"
    >
      <CardContent className="w-50">
        <h1 className="text text-white text-base md:text-4xl font-semibold-it font-normal text-center mb-2 lg:mb-6">
              Purchase <span className='text-red-h'>Now</span>
        </h1>
        <p className="text text-white font-light text-center">
          <Button onClick={() => { handleLogin() }} classes=' text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-2xl bg-btn-color rounded-lg px-7'>
              LOG IN / SIGN UP
            <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
          </Button>
        </p>
      </CardContent>

    </Card>
  )
}

export default LoginOrSignBox
