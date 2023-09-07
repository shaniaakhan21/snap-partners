import { Button } from 'components/common/Button'
import LoginOrSignBox from './LoginOrSignBox'
import { Grid } from '@mui/material'

const MainSection = ({ handleButtonClick, isLoggedIn, userData }) => {
  return (
    <div>
      <div className="video-container w-full md:h-50vh xl:h-75vh">
        <video autoPlay loop muted className="background-video">
          <source src="/static/wellness/snap-wellness-bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="content flex flex-col md:flex-row mt-4 md:mt-20 xl:mt-12 2xl:mt-28 3xl:mt-32 px-4 pt-4 lg:pt-0 lg:px-20 2xl:px-24 3xl:px-56 mb-2 lg:mb-0">
          <div className='flex flex-col md:w-5/6 lg:8/12 xl:9/12 2xl:w-10/12 pr-right'>
            <div>
              <h1 className='text-white text-lg md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl 3xl:text-8xl font-light text-center md:text-left'>Welcome to a healthier you with <br></br> <span className='font-bold-it'>SNAP<span className='text-red-h'> Wellness</span></span></h1>
              <p className='text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-4xl pt-4 font-light text-center md:text-left'>Take charge of your overall wellness with organic, high-quality wellness products backed by science that will be sure to make an impact in your everyday life.</p>
            </div>
            <div className='pt-4 lg:pt-4 text-center md:text-left'>
              <Button
                classes='text-xs md:text-base lg:text-lg xl:text-lg 2xl:tex-lg 3xl:text-4xl bg-btn-color rounded-lg px-2 lg:px-7 2xl:px-5 3xl:px-10 2xl:py-3 3xl:py-5'
                onClick={handleButtonClick}
              >
              OUR PRODUCTS
              </Button>
            </div>
          </div>
          <div className='hidden sm:flex md:w-3/6 lg:5/12 xl:4/12 2xl:w-3/12 justify-center'>
            <img src="/static/wellness/snap_wellness.svg" className='w-0 md:w-3/6 2xl:w-4/6 xl:mt-0 mt-20'></img>
          </div>
        </div>
        <div>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <LoginOrSignBox isLoggedIn={isLoggedIn} userData={userData}/>
          </Grid>
        </div>
      </div>

    </div>
  )
}

export default MainSection
