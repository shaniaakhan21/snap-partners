import LoginOrSignBox from './LoginOrSignBox'
import { Grid } from '@mui/material'

const MainSection = ({ scrollToProductTabs, isLoggedIn, userData, referralCode, h1Color, pColor, imgSrc, BgbuttonColor, textColor, Loginh1Color, customColor, btnText }) => {
  return (
    <div className='bg-cover md:bg-contain pb-8 md:pb-20' style={{ backgroundImage: 'url(\'/static/bg-vitality.png\')' }}>
      <div>
        <div className="content flex pt-10 md:pt-10 xl:pt-24 mb-4 md:mb-10 xl:mb-20  2xl:mb-40 mx-[14%] md:mx-[18%] xl:mx-[25%]">
          <div >
            <div>
              <h1 className={'text-[#BB4947] text-sm lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-normal text-center'}>Welcome to a healthier you with <br></br> <span className='font-semibold text-3xl md:text-4xl 2xl:text-6xl'>Snap Vitality</span></h1>
              <p className={'text-[#BB4947] text-sm lg:text-xl xl:text-2xl 2xl:text-3xl 3xl:text-4xl font-normal text-center mt-[1%]'}>Take charge of your overall wellness with organic, high-quality wellness products backed by science that will be sure to make an impact in your everyday life.</p>
            </div>
          </div>

        </div>
        <div>
          <Grid container item xs={12} lg={7} justifyContent="center" mx="auto">
            <LoginOrSignBox isLoggedIn={isLoggedIn} userData={userData} referralCode={referralCode} h1Color={Loginh1Color} customColor={customColor} BgbtnColor={BgbuttonColor}/>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default MainSection
