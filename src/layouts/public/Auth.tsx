import { useAuthStore } from 'lib/stores'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FooterPublic } from 'components/layout/public/Footer'
import { useHandlerReferralLink } from '../../lib/hooks/useHandlerReferralLink'
import { getLocalStorage } from 'lib/utils/localStorage'
import { ROLES } from '../../config/roles'

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
  let t1 = 'Snap Delivered'
  let t2 = 'Order-Eat-Repeat'

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
    <div className='mt-24 max-w-2xl'>
      <h1 className='text-5xl font-bold 2xl:text-7xl'>{t1}</h1>
      <p className='text-3xl font-bold mt-1'>{t2}</p>
      <br />
    </div>
  )

  const displayIntegrousContent = (
    <>
      <div className='flex w-full justify-center items-end'>
        <div className='mt-24 w-full'>
          <h1 className='text-5xl font-bold 2xl:text-7xl'>{t1}</h1>
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
          <h1 className='text-5xl font-bold 2xl:text-7xl'>{t1}</h1>
          <p className='text-3xl font-bold mt-3'>{t2}</p>
          <br />
        </div>
      </div>
    </>
  )

  const snapPartnersDesign = (
    <>
      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
            <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

            <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
              {(isLoginIntegrous || (isSignupIntegrous && (ROLES.integrousCustomer || ROLES.integrousAssociate)))
                ? displayIntegrousContent
                : displayContent}
              <ul className={`list-none pl-6 ${role !== ROLES.IBO ? 'mt-20' : 'mt-5'} text-xl 2xl:text-2xl space-y-4`}>
                <li>Get notified about company updates</li>
                <li>Access to company training</li>
                <li>Get synced</li>
                <li>Track your team</li>
              </ul>

              <div className='absolute bottom-10 left-12 flex items-center gap-x-4'>
                {role !== ROLES.IBO && <img src='/images/logo-dark.png' />}
              </div>
            </div>
          </section>

          <section className='w-full md:w-1/2 h-full md:min-h-screen bg-white px-4 py-10 flex justify-center items-center'>
            <div className='max-w-md mx-auto w-full'>
              {children}
            </div>
          </section>
        </div>
      </div>

      {role !== ROLES.IBO && <FooterPublic />}
    </>
  )

  const snapWellnessDesign = (
    <>
      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className={`sticky top-0 left-0  md:flex flex-col justify-start w-full md:min-h-screen bg-white md:bg-textAcent-500 text-white ${heightClass}`}>
            <img src='/static/snap-bg.png' className={`w-full h-screen object-cover hidden sm:block absolute bottom-0 right-0 z-0 ${heightClass}`} />

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
