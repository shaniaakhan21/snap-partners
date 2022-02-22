import { Button } from 'components/common/Button'
import { AppleStore, CheckSuccess, GooglePlayBanner } from 'components/common/icons'
import { STEPS } from '.'
import { IHandleStep, IUserTrack } from '../types'

export const SuccessCode = ({ userTrack, handleStep }: { userTrack: IUserTrack, handleStep: IHandleStep }) => {
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
      <span className='text-xl text-gray-500 text-center'>Please download the Snap Delivered ordering app below or visit our website at </span>
      <a href='https://snapdelivered.com/' className='text-xl text-primary-500 text-center'>snapdelivered.com </a>
      <br/>
      <div className='flex flex-wrap justify-center items-center mt-8 gap-x-4 gap-y-4'>
        <GooglePlayBanner />
        <AppleStore />
      </div>
    </div>
  )
}
