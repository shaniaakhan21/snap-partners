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

  if (isLoginIntegrous || isLoginWellness) {
    t1 = 'Snap Partners'
    t2 = 'FREE Business Log In'
  }

  if ((isSignupIntegrous && (ROLES.integrousCustomer || ROLES.integrousAssociate)) || (isSignupWellness && role === ROLES.CUSTOMER)) {
    t1 = 'Snap Partners'
    t2 = 'FREE Business Sign Up'
  }

  if (role === ROLES.IBO) {
    t1 = 'Snap Partners'
    t2 = ''
  }

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
      </div>
    </>
  )

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
            <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

            <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
              {(isLoginIntegrous || (isSignupIntegrous && (ROLES.integrousCustomer || ROLES.integrousAssociate)))
                ? displayIntegrousContent
                : (isLoginWellness || (isSignupWellness || role === ROLES.CUSTOMER))
                  ? displayWellnessContent
                  : displayContent}

              {role === ROLES.IBO && <div className='flex justify-end'><img width={200} height={200} src='/images/profile/referralPartner.png'/></div>}

              <ul className={`list-disc pl-6 ${role !== ROLES.IBO ? 'mt-20' : 'mt-5'} text-xl 2xl:text-2xl space-y-4`}>
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
            {children}
          </section>
        </div>
      </div>

      {role !== ROLES.IBO && <FooterPublic/>}
    </>
  )
}
