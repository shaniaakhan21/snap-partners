import { useAuthStore } from 'lib/stores'
import { useRouter } from 'next/router'
import { useEffect, useRef } from 'react'
import { FooterPublic } from 'components/layout/public/Footer'
import { useHandlerReferralLink } from '../../lib/hooks/useHandlerReferralLink'
import { getLocalStorage } from 'lib/utils/localStorage'
import { ROLES } from '../../config/roles'
import { GTMTrack } from 'lib/utils/gtm'

export const AuthPagesLayout = ({ children }) => { // Should be use in SignIn Page
  const { referralCode: code, role } = useHandlerReferralLink()
  const router = useRouter()
  const { auth } = useAuthStore()

  /*
  useEffect(() => {
    getLocalStorage("accessToken") && router.push('/overview')
  }, [])
  */

  useEffect(() => {
    auth && router.push('/overview')
  }, [auth])

  const isSignupIntegrous = router.pathname === '/auth/signup-integrous'
  const isLoginIntegrous = router.pathname === '/auth/login-integrous'
  const isSignupWellness = router.pathname === '/auth/signup-wellness'
  const isLoginWellness = router.pathname === '/auth/login-wellness'
  let t1 = 'Snap Partners'
  let t2 = 'Delivering what matters most in a SNAP!'

  if (role === ROLES.AGENT) {
    t1 = 'Snap Financial'
    t2 = 'Employee Retention Credit Program'
  }

  if (isLoginIntegrous) {
    t1 = 'Snap Partners'
    t2 = 'FREE Business Log In'
  }

  if (isLoginWellness) {
    t1 = 'Snap Wellness'
    t2 = 'Welcome to a healthier you'
  }
  if ((isSignupIntegrous && (ROLES.integrousCustomer || ROLES.integrousAssociate)) || (isSignupWellness && (ROLES.CUSTOMER || ROLES.IBO))) {
    t1 = 'Snap Partners'
    t2 = 'FREE Business Sign Up'
  }

  if ((isSignupWellness && (ROLES.CUSTOMER || ROLES.IBO))) {
    t1 = 'Snap Wellness'
    t2 = 'Welcome to a healthier you'
  }

  if (role === ROLES.IBO) {
    t1 = 'Snap Partners'
    t2 = ''
  }

  const heightClass =
  router.pathname === '/auth/signup-wellness' && router.query.role === 'CUSTOMER'
    ? 'h-[100vw]'
    : 'h-screen'

  const displayContent = (
    <div className='mt-12 max-w-2xl'>
      <h1 className='text-5xl font-extrabold 2xl:text-5xl mb-5'>{t1}</h1>
      <p className='text-3xl font-bold mt-1'>{t2}</p>
      <br />
    </div>
  )

  const displayIntegrousContent = (
    <>
      <div className='flex w-full justify-center items-end'>
        <div className='mt-24 w-full'>
          <h1 className='text-5xl font-extrabold 2xl:text-5xl mb-5'>{t1}</h1>
          <p className='text-3xl font-bold mt-1'>{t2}</p>
          <br />
        </div>
        <div className='w-1/3'>
          <img className='w-full' src='/static/snap_partners_logo.png' />
        </div>
      </div>
      <div className='z-1 relative w-[60%]'>
        <div className='flex w-full justify-start'>
          <img className='w-[21%]' src='/static/Snap Wellness Large.png' />
        </div>
        <div>
          <h3 className='text-md font-bold mt-1 uppercase'>Partnered with Integrous Wellness</h3>
        </div>
      </div>
    </>
  )

  const displayWellnessContent = (
    <>
      <div className='flex w-full flex-col justify-center items-end mt-24'>
        <div className='w-full'>
          <img className='w-1/6' src='/static/wellness/SnapWellnessLarge.svg' />
        </div>
        <div className='w-full'>
          <h1 className='text-5xl font-extrabold 2xl:text-5xl mb-5'>{t1}</h1>
          <p className='text-3xl font-bold mt-3'>{t2}</p>
          <br />
        </div>
      </div>
    </>
  )

  const snapPartnersDesign = (
    <>
      <div className='m-0 w-full p-4 sm:p-6 lg:p-8 max-w-full md:mx-auto md:w-11/12'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden xl:flex flex-col justify-start w-1/2 md:min-h-screen text-white'>
            {/* <img src='/static/authBg.svg' className='w-full h-screen object-fit absolute bottom-0 right-0 z-0' /> */}
            <img src='/static/authBg.svg' className='w-full h-screen absolute bottom-0 top-0 mb-6 right-0 z-0' />

            <div className='absolute w-full top-0 right-0 z-10 pl-4 pb-8 md:pl-24 pr-12 mt-32 md:mt-24'>
              <div><img src='/static/snap_partners_logo.png' className='lg:w-28 w-36' /></div>
              {(isLoginIntegrous || (isSignupIntegrous && (ROLES.integrousCustomer || ROLES.integrousAssociate)))
                ? displayIntegrousContent
                : displayContent}
              <ul className={`list-none pl-2 ${role !== ROLES.IBO ? 'mt-5' : 'mt-5'} font-base text-xl 2xl:text-lg space-y-8`}>
                <li className='relative pl-8 before:absolute before:left-1 before:top-2.5 before:bg-white before:content before:w-0.5 before:h-16 after:absolute after:left-0 after:top-2.5 after:bg-white after:rounded-full after:content after:w-2.5 after:h-2.5'>Get notified about company updates</li>
                <li className='relative pl-8 before:absolute before:left-1 before:top-2.5 before:bg-white before:content before:w-0.5 before:h-16 after:absolute after:left-0 after:top-2.5 after:bg-white after:rounded-full after:content after:w-2.5 after:h-2.5'>Access to company training</li>
                <li className='relative pl-8 before:absolute before:left-1 before:top-2.5 before:bg-white before:content before:w-0.5 before:h-16 after:absolute after:left-0 after:top-2.5 after:bg-white after:rounded-full after:content after:w-2.5 after:h-2.5'>Get synced</li>
                <li className='relative pl-8 after:absolute after:left-0 after:top-2.5 after:bg-white after:rounded-full after:content after:w-2.5 after:h-2.5'>Track your team</li>
              </ul>
 
            </div>
            <div className='absolute w-full text-center bottom-5 text-sm text-gray-500'>© 2023 Snap Delivered. All rights reserved.</div>
          </section>

          <section className='w-full mx-auto xl:mx-0 md:w-full lg:w-1/2 h-full md:min-h-screen flex justify-center items-center'>
            <div className='max-w-xl pt-16 mx-auto w-full bg-white rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12 shadow-xl relative my-16'>
              
              <div className='absolute -top-10 -mt-10 left-0 w-full'>
                {role !== ROLES.IBO && <img src='/images/logo-orange.png' className='mx-auto' />}
              </div>


              {children}
            </div>
          </section>
        </div>
      </div>

      {/* {role !== ROLES.IBO && <FooterPublic />} */}
    </>
  )

  const snapWellnessDesign = (
    <>
      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className={`sticky top-0 left-0  md:flex flex-col justify-start w-full md:min-h-screen bg-white md:bg-textAcent-500 text-white ${heightClass}`}>
            <img src='/static/snap-bg.png' className={`w-full object-cover hidden sm:block absolute bottom-0 right-0 z-0 t ${heightClass}`} />

            <div className='hidden md:block absolute w-1/2 h-full top-0 z-10 px-4 pb-8 md:px-12 ml-10'>
              {displayWellnessContent}
              <br></br>
              <p className='text-3xl font-bold mt-1'>Your Buying Options</p>
              <div className='flex flex-row items-center'>
                <div className='flex flex-col h-[19vh] mt-6 justify-between'>
                  <img className='' src='/static/wellness/circle.svg' />
                  <div className='disc-lines'></div>
                  <img src='/static/wellness/circle.svg' />
                  <div className='disc-lines'></div>
                  <img src='/static/wellness/circle.svg' />
                </div>
                <div>
                  <ul className='list-none pl-6  mt-5 text-xl 2xl:text-2xl space-y-4'>
                    <li><b>Create Account: </b><span className='text-xl'>Buy it & get updates</span></li>
                    <br></br>
                    <li><b>Log In: </b><span className='text-xl'>Just add & Checkout</span></li>
                    <br></br>
                    <li><b>Continue as guest: </b><span className='text-xl'>Just buy it</span></li>
                  </ul>
                </div>
              </div>
              <p className='mt-40 text-gray-500 font-light'>© 2023 Snap Partners. All rights reserved.</p>
            </div>
            <div className='w-full sm:w-11/12 md:w-1/3 bg-white m-1 p-2 md:p-8 md:m-0 md:px-8 md:py-10 flex justify-center items-center absolute md:right-20 md:top-20 rounded-2xl'>
              <div className='flex flex-col w-full'>
                <div className='w-1/5 mb-1'>
                  <img src='/static/wellness/logo.svg' />
                </div>
                <div className='m-0 w-full'>
                  <div className='max-w-xl md:max-w-2xl w-full'>
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )

  return (
    <>
      {(isLoginWellness || (isSignupWellness && (ROLES.CUSTOMER || ROLES.IBO))) ? snapWellnessDesign : snapPartnersDesign}
    </>
  )
}
