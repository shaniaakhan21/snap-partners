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
import { useState } from 'react'
import ContractModal from './WeightCare/ContractModal'
import { CustomerRefIcon } from 'components/common/icons/CustomerRefIcon'
import { DriverRefIcon } from 'components/common/icons/DriverRefIcon'

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

  return (
    <div className='min-h-[80vh] flex justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center justify-center justify-items-center gap-4'>
        <ReferralCards
          title='Sponsor a Snap IBO'
          ilustration={(
            <div className='h-[120px] flex items-center'><img src={'/images/referralPartner1.png'} />
            </div>
          )}
          link={`${auth.referralLink}&role=${ROLES.IBO}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />

        <ReferralCards
          title='Refer ERC Agent'
          ilustration={<ERCAgent/>}
          link={`${auth.referralLink}&role=${ROLES.AGENT}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Refer ERC Client'
          ilustration={<ERCClient/>}
          link={`https://www.jornscpa.com/snap/?refid=${auth.id}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Refer SETC/FFCRA Client'
          ilustration={<ERCClient/>}
          link={`https://www.jornscpa.com/snap-ffcra/?refid=${auth.id}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />

        <ReferralCards
          title='Refer Delivery Customers'
          ilustration={<CustomerRefIcon />}
          link={`${auth.referralLink}&role=${ROLES.CUSTOMER}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Refer Delivery Driver'
          ilustration={<DriverRefIcon />}
          link={`${auth.referralLink}&role=${ROLES.DRIVER}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        <ReferralCards
          title='Refer Delivery Merchant/SK'
          ilustration={<MerchantIcon />}
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
          ilustration={
            <Energy/>}
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
          title='Refer a Snap Vitality Customer'
          ilustration={(
            <div className='h-[120px]  flex items-center'><img src={'/static/referral-link-img-vitality.png'} /> </div>)}
          link={`${auth.referralLinkWellness}` || 'With Out Link'}
          newUser={false}
          classes='col-span-1'
        />
        {auth?.isCertified
          ? (
            <ReferralCards
              title='Refer a WeightCare Customer'
              ilustration={(
                <div className='h-[120px] flex items-center'><img src={'/static/wellness/link-weightcare.png'} />
                </div>
              )}
              link={`${auth.referralLinkWeightCare}` || 'With Out Link'}
              newUser={false}
              classes='col-span-1'
            />
          )
          : (
            <InactiveCards title={'Refer a WeightCare Customer'} ilustration={<img src={'/static/wellness/link-weightcare.png'} width={100} />} link={''} />
          )}
      </div>
      {!isCustomer && (
        <ContractModal open={openModal} onClose={handleCloseModal} />)
      }
    </div>
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
