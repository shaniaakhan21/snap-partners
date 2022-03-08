import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { signUp } from 'lib/utils/gtm'
import Link from 'next/link'
import { AppleStore, GooglePlayBanner } from '../icons'

interface IProps {
  playStoreHref: string
  appStoreHref: string
  title?: string
}

export const MobileAppsLink = ({ playStoreHref, appStoreHref, title }: IProps) => {
  const role = useRoleFromUrl()
  const trackStore = (store: 'android' | 'ios') => {
    signUp(role, 3, store)
  }

  return (
    <div className='flex flex-col justify-center items-center mt-8'>
      {title && <h6 className='mb-2 text-primary-500 text-xl'>{title}</h6>}

      <div className='flex flex-wrap justify-center gap-x-4 gap-y-4'>
        <Link href={playStoreHref}>
          <a target='_blank' onClick={() => trackStore('android')}>
            <GooglePlayBanner />
          </a>
        </Link>

        <Link href={appStoreHref}>
          <a target='_blank' onClick={() => trackStore('ios')}>
            <AppleStore />
          </a>
        </Link>
      </div>
    </div>
  )
}
