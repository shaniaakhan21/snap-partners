import Link from 'next/link'
import { AppleStore, GooglePlayBanner } from '../icons'

interface IProps {
  playStoreHref: string
  appStoreHref: string
  title?: string
}

export const MobileAppsLink = ({ playStoreHref, appStoreHref, title }: IProps) => {
  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      {title && <h6 className='mb-2 text-primary-500 text-xl'>{title}</h6>}

      <div className='flex flex-wrap justify-center gap-x-4 gap-y-4'>
        <Link href='/download-app?device=ANDROID'>
          <a>
            <GooglePlayBanner />
          </a>
        </Link>

        <Link href='/download-app?device=APPLE'>
          <a>
            <AppleStore />
          </a>
        </Link>
      </div>
    </div>
  )
}
