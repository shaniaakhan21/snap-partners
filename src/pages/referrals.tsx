import Head from 'next/head'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { useAuthStore } from 'lib/stores'
import { ROLES } from 'config/roles'

import DashboardLayout from 'layouts/private/Dashboard'
import { ReferralCards } from 'components/page/referrals/Cards'
import { MerchantIcon, IBOIcon } from 'components/common/icons'
import PartnerLogo from '../../public/images/profile/referralPartner.png'
import { ERCAgent } from 'components/common/icons/ERCAgent'
import { ERCClient } from 'components/common/icons/ERCClient'
import { Energy } from 'components/common/icons/Energy'
import { InactiveCards } from 'components/page/referrals/InactiveCards'
import { useEffect, useState } from 'react'
import ContractModal from './wellness/components/ContractModal'
import { CustomerRefIcon } from 'components/common/icons/CustomerRefIcon'
import { DriverRefIcon } from 'components/common/icons/DriverRefIcon'
import { getLocalStorage } from 'lib/utils/localStorage'
import axios from 'axios'
import { SnapPartnersIcon } from 'components/common/icons/SnapPartners'
import { SnapPartnersRefIcon } from 'components/common/icons/SnapPartnersRef'

const { SEO } = APP_INFO

const ReferralsPage: Page = () => {
  const { auth } = useAuthStore()

  const _auth: any = auth
  const isCustomer = _auth.roles.customer || _auth.roles.integrousCustomer

  const isIntegrous = (_auth.roles.integrousAssociate || _auth.roles.integrousCustomer)
  const [openModal, setOpenModal] = useState(false)
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      await axios.get('/api/snap/builderWebsiteLinks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
    })()
  }, [])

  return (
    <>
      <div className='mb-10'>
        <h1 className='text-base lg:text-2xl font-bold'>Sizzle Videos</h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-8 mt-14'>
          <ReferralCards
            title='IBO Sizzle Video'
            ilustration={(
              <div className='h-[120px] flex items-center rounded-full relative -top-12 right-1'><img src={'/images/sizzle.png'} />
              </div>
            )}
            link={`https://mysnappartners.com/referral-code/${auth.referralCode.trim()}/${auth.id}/sizzle/` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='ERC Sizzle Video'
            ilustration={(
              <div className='h-[120px] flex items-center rounded-full  relative -top-12 right-1'><img src={'/images/erc-sizzle.png'} />
              </div>
            )}
            link={`https://mysnappartners.com/referral-code/${auth.referralCode.trim()}/${auth.id}/erc-sizzle/` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='SETC Sizzle Video'
            ilustration={(
              <div className='h-[120px] flex items-center rounded-full relative -top-12 right-1'><img src={'/images/setc.png'} />
              </div>
            )}
            link={`https://mysnappartners.com/referral-code/${auth.referralCode.trim()}/${auth.id}/setc-sizzle/` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
        </div>
      </div>
      <h1 className='text-base lg:text-2xl font-bold'>Referal Pages</h1>
      <div className='w-full flex justify-center items-center mt-14'>
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-8'>
          <ReferralCards
            title='Sponsor a Snap IBO'
            ilustration={(<div className='relative -top-10 right-1 w-[70px] sm:w-[100px] lg:w-[114px]'><SnapPartnersRefIcon /></div>)}
            link={`https://mysnappartners.com/referral-code/${auth.referralCode.trim()}/${auth.id}/the-opportunity/` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />

          <ReferralCards
            title='Refer ERC Agent'
            ilustration={(<div className=' relative -top-10 right-2'><ERCAgent/></div>)}
            link={`${auth.referralLink}&role=${ROLES.AGENT}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='Refer ERC Client'
            ilustration={(<div className=' relative -top-10 right-2'><ERCClient/></div>)}
            link={`https://mysnappartners.com/referral-code/${auth.referralCode.trim()}/${auth.id}/snap-financial/erc/` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='Refer SETC/FFCRA Client'
            ilustration={(<div className=' relative -top-10 right-2'><ERCClient/></div>)}
            link={`https://mysnappartners.com/referral-code/${auth.referralCode.trim()}/${auth.id}/snap-financial/setc/` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />

          <ReferralCards
            title='Refer Delivery Customers'
            ilustration={(<div className=' relative -top-10 right-2'><CustomerRefIcon /></div>)}
            link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='Refer Delivery Driver'
            ilustration={(<div className=' relative -top-10 right-2'><DriverRefIcon /></div>)}
            link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          <ReferralCards
            title='Refer Delivery Merchant/SK'
            ilustration={(<div className=' relative -top-10 right-2'><MerchantIcon /></div>)}
            link={`${auth.referralLink}&role=${ROLES.MERCHANT}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          {/*
        <ReferralCards
          title='Refer Vidgo'
          ilustration={(
            <div className='h-[120px]  flex items-center'>
              <img src='/images/vidgo.png' alt='Vidgo logo'/>
            </div>
          )}
          link={`https://www.vidgo.com/snap/?subpid=${auth.referralCode}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        */}
          <ReferralCards
            title='Refer Commercial Energy'
            ilustration={(<div className=' relative -top-10 right-2'>
              <Energy/></div>)}
            link={`https://usaenergy.com/free-rate-analysis/?subid=${auth.id}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />

          {/* <ReferralCards
        title='Refer Snap Kitchens'
        ilustration={(
          <div className='h-[100px] '>
            <img src='/images/snap-kitchen-logo.png' alt='Snap Kitchens' className='w-[110px]' />
          </div>
        )}
        link={'https://snapkitchens.net/' || 'With Out Link'}
        newUser={false}
        classes='col-span-1'
      /> */}
          <ReferralCards
            title='Refer a Integrous Wellness Customer'
            ilustration={(
              <div className='h-[120px] w-[70px] sm:w-[100px] w-[114px] flex items-center relative -top-10 right-1'><img src={'/static/wellness/int-link-logo.png'} /> </div>)}
            link={`${auth.referralLinkWellness}` || 'With Out Link'}
            newUser={false}
            classes='col-span-1'
          />
          {auth?.isCertified
            ? (
              <ReferralCards
                title='Refer a WeightCare Customer'
                ilustration={(
                  <div className='h-[120px] w-[70px] sm:w-[100px] w-[114px] flex items-center relative -top-12 right-1'><img src={'/static/wellness/link-weightcare.png'} />
                  </div>
                )}
                link={`${auth.referralLinkWeightCare}` || 'With Out Link'}
                newUser={false}
                classes='col-span-1'
              />
            )
            : (
              <InactiveCards title={'Refer a WeightCare Customer'} ilustration={<div className='h-[120px] w-[70px] sm:w-[100px] w-[114px]  flex items-center relative -top-10 right-1'><img src={'/static/wellness/link-weightcare.png'}/></div>} link={''} />
            )}
        </div>
        {!isCustomer && (
          <ContractModal open={openModal} onClose={handleCloseModal} />)
        }
      </div>
    </>
  )
}

ReferralsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Referrals</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ReferralsPage
