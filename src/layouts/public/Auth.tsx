import { useAuthStore } from 'lib/stores'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FooterPublic } from 'components/layout/public/Footer'
import { useHandlerReferralLink } from '../../lib/hooks/useHandlerReferralLink'
import { ROLES } from '../../config/roles'
import { useTranslation } from "next-i18next";

export const AuthPagesLayout = ({ children }) => { // Should be use in SignIn Page
  const { t } = useTranslation()
  const { referralCode: code, role } = useHandlerReferralLink()
  const router = useRouter()
  const { auth } = useAuthStore()

  useEffect(() => {
    auth && router.push('/overview')
  }, [auth])

  const isSignupIntegrous = router.pathname === '/auth/signup-integrous'
  const isLoginIntegrous = router.pathname === '/auth/login-integrous'
  let t1 = t('auth:title-default.t1')
  let t2 = t('auth:title-default.t2')

  if (role === ROLES.AGENT) {
    t1 = t('auth:title-agent.t1')
    t2 = t('auth:title-agent.t2')
  }

  if (isLoginIntegrous) {
    t1 = t('auth:title-login-integrous.t1')
    t2 = t('auth:title-login-integrous.t2')
  }

  if (isSignupIntegrous && (ROLES.integrousCustomer || ROLES.integrousAssociate)) {
    t1 = t('auth:title-register-integrous.t1')
    t2 = t('auth:title-register-integrous.t2')
  }

  return (
    <>
      <div className='w-full'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
            <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

            <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
              <div className='mt-24 max-w-2xl'>
                <h1 className='text-5xl font-bold 2xl:text-7xl'>{t1}</h1>
                <p className='text-3xl font-bold mt-1'>{t2}</p>
                <br />
              </div>
              {(isLoginIntegrous || isSignupIntegrous) && (ROLES.integrousCustomer || ROLES.integrousAssociate) && (
                <div className='z-1 relative w-[60%]'>
                  <div className='flex w-full justify-start'>
                    <img className='w-[21%]' src='/static/Snap Wellness Large.png'/>
                    <img className='py-[3%] px-[5%]' src='/static/logo-integrous.png'/>
                  </div>
                  <div>
                    <h3 className='text-md font-bold mt-1 uppercase'>{t('auth:integrous-subtitle')}</h3>
                  </div>
                </div>
              )}

              <ul className='list-disc pl-6 mt-20 text-xl 2xl:text-2xl space-y-4'>
                <li>{t('auth:list-1')}</li>
                <li>{t('auth:list-2')}</li>
                <li>{t('auth:list-3')}</li>
                <li>{t('auth:list-4')}</li>
              </ul>

              <div className='absolute bottom-10 left-12 flex items-center gap-x-4'>
                <img src='/images/logo-dark.png' />
              </div>
            </div>
          </section>

          <section className='w-full md:w-1/2 h-full md:min-h-screen bg-white px-4 py-10 flex justify-center items-center'>
            {children}
          </section>
        </div>
      </div>

      <FooterPublic />
    </>
  )
}
