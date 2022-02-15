import { Button } from 'components/common/Button'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { IHandleStep, IUserTrack } from '../types'

export const UpgradeToManager = ({ userTrack, handleStep }: { userTrack: IUserTrack, handleStep: IHandleStep }) => {
  const { push } = useRouter()

  const handleUpagradeToManage = () => {
    window.open(
      'https://store.snapdelivered.com/product/manager-upgrade/',
      '_blank',
      'noopener,resizable,scrollbars,'
    )
    push('/auth/signin')
  }

  return (
    <div className='flex flex-col items-center text-center'>
      <figure>
        <img src='/images/logo-full.png' className='w-28 h-28' />
      </figure>

      <span className='text-3xl font-bold mt-4'>SnapDelivered</span>

      <div className='mt-10'>
        <span className='text-4xl font-bold text-primary-500'>Upgrade to <br /> Manager Account</span>
      </div>

      <ul className='mt-5 list-disc custom__bulletList text-left self-start text-gray-400 px-5'>
        <li>Benefit number one</li>
        <li>Benefit number two</li>
        <li>Benefit number three</li>
      </ul>

      <div className='w-full mt-10'>
        <Button classes='w-full' onClick={handleUpagradeToManage}>
          Continue
        </Button>

        <p className='mt-2'>
          Do it later in{' '}
          <Link href='/auth/signin'>
            <a className='text-primary-500 cursor-pointer focus:underline'>Account settings</a>
          </Link>
        </p>
      </div>
    </div>
  )
}
