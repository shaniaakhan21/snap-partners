import Link from 'next/link'
import { Button } from 'components/common/Button'
import { CheckSuccess } from 'components/common/icons'
import { STEPS } from '.'
import { mobileAppsLinks } from 'lib/utils/mobileAppLinks'
import { IHandleStep, IUserTrack } from '../types'
import { IReferralLink } from 'lib/types'
import { MobileAppsLink } from 'components/common/mobileApps/MobileAppsLink'

export const SuccessCode = ({ userTrack, handleStep, referralLink }: { userTrack: IUserTrack, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const {
    playStore: linkPlayStore,
    appStore: linkAppStore,
    title: appTitle
  } = mobileAppsLinks[referralLink.role.toLocaleLowerCase()]

  return (
    <div className='flex flex-col justify-center items-center'>
      <span className='text-3xl font-bold'>SnapDelivered</span>
      <br />
      <br />
      <span className='text-4xl font-bold text-primary-500'>Register Done!</span>
      <CheckSuccess classes='my-10' />
      <span className='text-xl text-primary-500'>Welcome!</span>
      <span className='text-4xl text-primary-500 font-bold'>{userTrack.userInfo.name}</span>

      <Button onClick={() => handleStep(STEPS.UPGRADE_TO_MANAGER)} classes='w-full mt-10'>CONTINUE</Button>
      <br/>
      <span className='text-xl text-gray-500 text-center'>Please download the {appTitle} app below or visit our website at </span>
      <Link href='https://snapdelivered.com/'>
        <a target='_blank' className='text-xl text-primary-500 text-center'>snapdelivered.com</a>
      </Link>
      <br/>
      <MobileAppsLink appStoreHref={linkAppStore} playStoreHref={linkPlayStore} />
    </div>
  )
}
