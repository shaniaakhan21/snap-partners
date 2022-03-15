import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { signUp } from 'lib/utils/gtm'
import Link from 'next/link'
import { AppleStore, GooglePlayBanner } from '../icons'

export const MobileAppsLink = () => {
  const role = useRoleFromUrl()
  const trackStore = (store: 'android' | 'ios') => {
    signUp(role, 3, store)
  }
  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      <div className='flex flex-wrap justify-center gap-x-4 gap-y-4'>
        <Link href='/download-app?device=ANDROID'>
          <a target='_blank' onClick={() => trackStore('android')}>
            <GooglePlayBanner />
          </a>
        </Link>
        <Link href='/download-app?device=APPLE'>
          <a target='_blank' onClick={() => trackStore('ios')}>
            <AppleStore />
          </a>
        </Link>
      </div>
    </div>
  )
}
