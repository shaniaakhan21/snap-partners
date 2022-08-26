import Link from 'next/link'

import { STEPS } from '.'
import { IReferralLink } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { IHandleStep } from '../types'

import { Button } from 'components/common/Button'
import { CheckSuccess } from 'components/common/icons'
import { MobileAppsLink } from 'components/common/mobileApps/MobileAppsLink'
import { GTMTrack } from 'lib/utils/gtm'

const { SEO } = APP_INFO

export const SuccessCode = ({ userTrack, handleStep, referralLink }: { userTrack: any, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const handleClickContinue = () => {
    GTMTrack.signUp(referralLink.role, 3)
    handleStep(STEPS.UPGRADE_TO_MANAGER)
  }

  return (
    <div className='flex flex-col justify-center items-center max-w-xl mx-auto'>
      <br />
      <span className='text-4xl font-bold text-primary-500'>Register Done!</span>
      <CheckSuccess classes='my-10' />
      <span className='text-xl text-primary-500'>Welcome!</span>
      <span className='text-4xl text-primary-500 font-bold'>{userTrack.userInfo.name ? userTrack.userInfo.name : userTrack.userInfo.merchant.name }</span>

      <Button onClick={handleClickContinue} classes='w-full mt-10'>CONTINUE</Button>
      <br/>
      <span className='text-xl text-gray-500 text-center'>Please download the app below or visit our website at </span>
      <Link href={SEO.URL_PAGE}>
        <a target='_blank' className='text-xl text-primary-500 text-center'>{SEO.URL_PAGE.substring(8)}</a>
      </Link>
      <br/>
      <MobileAppsLink />
    </div>
  )
}
