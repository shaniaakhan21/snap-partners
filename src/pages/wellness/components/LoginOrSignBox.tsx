import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import { Button } from 'components/common/Button'
import Router from 'next/router'

const LoginOrSignBox = ({ isLoggedIn, userData, referralCode, h1Color, customColor, BgbtnColor }) => {
  const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
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
  return (
    <div className='w-full flex items-center justify-center '>
      {isLoggedIn
        ? (
          <Card
            sx={{
              background: '#bb4947cf',
              border: '#ffffff29 0.5px solid'
            }}

            className="px-0 py-0 lg:px-8 lg:py-2 3xl:py-5 rounded-none mt-1 3xl:mt-32 w-8/12 xl:w-6/12 3xl:w-8/12"
          >
            <CardContent className='p-2 sm:p-4'>
              <h1 className={`text text-${customColor} text-lg md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center 3xl:leading-tight`}>
                <span className={'text-white capitalize'}>{userData ? `${userData?.name} ${userData?.lastname}` : ''} </span>, Welcome to Snap Vitality
              </h1>
            </CardContent>
          </Card>
        )
        : (
          isGuest
            ? (
              <Card
                sx={{
                  border: '#ffffff29 0.5px solid'
                }}
                className="bg-[#bb4947cf] px-0 py-0 lg:px-8 lg:py-2 3xl:py-5 rounded-none mt-1 3xl:mt-32 w-8/12 xl:w-6/12 3xl:w-8/12"
              >
                <CardContent className='p-2 sm:p-4'>
                  <h1 className={'text text-white text-lg md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center 3xl:leading-tight'}>
                Welcome to Snap Vitality
                  </h1>
                </CardContent>
              </Card>
            )
            : (
              <>
                <Card
                  className="w-full mx-10 xs:mx-20 sm:mx-0 sm:w-fit shadow-none rounded-none bg-[#bb4947cf] border-none md:border-t md:border-b md:border-solid md:border-transparent md:border-opacity-29 md:border-0.5"
                >
                  <CardContent className='flex flex-col sm:flex-row w-full justify-around items-center p-3 sm:p-4 md:p-6 2xl:p-8 force-padding'>
                    <div className='mr-0 sm:mr-10'>
                      <h1 className={'text text-white text-lg md:text-2xl 2xl:text-3xl 3xl:text-5xl font-normal font-normal text-center 3xl:leading-tight mb-2 md:mb-0'}>
                    Purchase Now
                      </h1>
                    </div>
                    <div className='w-[80%] block sm:hidden'><Button onClick={() => { handleLogin() }}
                      classes={' w-full text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-xl rounded-none 3xl:text-2xl px-12 py-2 bg-white text-not-white'}
                    >
                      Log in
                    </Button></div>
                    <div className='hidden sm:block'><Button onClick={() => { handleLogin() }}
                      classes={'text-xs md:text-base lg:text-lg xl:text-lg 2xl:text-xl rounded-none 3xl:text-2xl px-12 py-2 bg-white text-not-white'}
                    >
                      Log in
                    </Button></div>
                  </CardContent>
                </Card>
              </>
            )
        )}
    </div>
  )
}

export default LoginOrSignBox
