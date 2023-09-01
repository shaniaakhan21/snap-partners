import { Button } from 'components/common/Button'
import LoginOrSignBox from './LoginOrSignBox'
import { Grid } from '@mui/material'

const MainSection = () => {
  return (
    <div>
      <div className="video-container">
        <video autoPlay loop muted className="background-video">
          <source src="/static/wellness/snap-wellness-bg-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <div className="content flex flex-row mt-32 px-48">
          <div className='flex flex-col w-10/12 pr-right'>
            <div>
              <h1 className='text-white text-4xl font-bold-it uppercase'>Welcome to a healthier you with <span className='text-red-h'>Snap Wellness</span></h1>
              <p className='text-white text-lg pt-4 font-light'>Take charge of your overall wellness with organic, high-quality wellness products backed by science that will be sure to make an impact in your everyday life.</p>
            </div>
            <div className='pt-10'>
              <Button classes='text-lg bg-btn-color rounded-lg px-7'>
              OUR PRODUCTS
              </Button>
            </div>
          </div>
          <div className='w-3/12'>
            <img src="/static/wellness/snap_wellness.svg" width="65%"></img>
          </div>
        </div>
        <div>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <LoginOrSignBox/>
          </Grid>
        </div>
      </div>

    </div>
  )
}

export default MainSection
