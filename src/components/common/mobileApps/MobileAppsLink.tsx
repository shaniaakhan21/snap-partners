import Link from 'next/link'
import { AppleStore, GooglePlayBanner } from '../icons'

export const MobileAppsLink = () => (
  <div className='flex flex-col justify-center items-center mt-8'>
    <div className='flex flex-wrap justify-center gap-x-4 gap-y-4'>
      <Link href='/download-app?device=ANDROID'>
        <a target='_blank'>
          <GooglePlayBanner />
        </a>
      </Link>
      <Link href='/download-app?device=APPLE'>
        <a target='_blank'>
          <AppleStore />
        </a>
      </Link>
    </div>
  </div>
)
