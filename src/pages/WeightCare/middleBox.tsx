import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'

const MiddleBox = ({ isLoggedIn, userData, referralCode, h1Color, customColor, BgbtnColor }) => {
  const isGuest = typeof localStorage !== 'undefined' && localStorage.getItem('isGuest') === 'true'
  return (
    <div className='w-full flex items-center justify-center'>
      {isLoggedIn
        ? (
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
            <CardContent className='p-2 sm:p-4'>
              <h1 className={`text text-${customColor} text-lg md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center 3xl:leading-tight`}>
                <span className={`text-${h1Color} capitalize`}>{userData ? `${userData?.name} ${userData?.lastname}` : ''} </span>, Welcome to Snap Wellness
              </h1>
            </CardContent>
          </Card>
        )
        : (
          isGuest && (
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
              <CardContent className='p-2 sm:p-4'>
                <h1 className={`text text-${customColor} text-lg md:text-3xl 2xl:text-4xl 3xl:text-5xl font-semibold-it font-normal text-center 3xl:leading-tight`}>
                Welcome to Snap Wellness
                </h1>
              </CardContent>
            </Card>
          )
        )}
    </div>
  )
}

export default MiddleBox
