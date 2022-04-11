import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import type { Page as PageNext } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import { signUp } from 'lib/utils/gtm'

import { AndroidLinkApp } from 'components/page/download-app/AndroidLinkApp'
import { AppleLinkApp } from 'components/page/download-app/AppleLinkApp'
import { SelectDevice } from 'components/page/download-app/SelectDevice'
import { HeaderCTA } from 'components/page/download-app/HeaderCTA'
import { FooterPublic } from 'components/layout/public/Footer'
import { Spinner } from 'components/common/loaders'
import { ListDeviceLinkApp } from 'components/page/download-app/ListDeviceLinkApp'
import { AuthCTA } from 'components/page/download-app/AuthCTA'
import { useAuthStore } from 'lib/stores'

const { SEO, APPS } = APP_INFO

const DownloadAppPage: PageNext = () => {
  const [device, setDevice] = useState<'APPLE' | 'ANDROID'>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { auth } = useAuthStore()
  const role = useRoleFromUrl()
  const router = useRouter()

  const { current: androidApps } = useRef([
    { ...APPS.ANDROID_STORE.CUSTOMER_APP },
    { ...APPS.ANDROID_STORE.DRIVER_APP },
    { ...APPS.ANDROID_STORE.MERCHANT_APP }
  ])

  const { current: appleApps } = useRef([
    { ...APPS.APPLE_STORE.CUSTOMER_APP },
    { ...APPS.APPLE_STORE.DRIVER_APP },
    { ...APPS.APPLE_STORE.MERCHANT_APP }
  ])

  const handlerDevice = () => {
    if (typeof router.query.device === 'string') {
      if (router.query.device === 'APPLE') return 'APPLE'
      if (router.query.device === 'ANDROID') return 'ANDROID'
      else return null
    } else return null
  }

  const trackStore = (store: 'android' | 'ios') => {
    signUp(role, 3, store)
  }

  useEffect(() => {
    setDevice(() => handlerDevice())
    setIsLoading(false)
  }, [router.query.device])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-[85vh] md:w-full'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  if (!device) {
    return (
      <div className='w-full overflow-hidden h-full md:h-[85vh] max-w-7xl mx-auto py-10 px-4 text-center flex flex-col justify-center items-center'>
        <span className='text-4xl font-bold text-gray-800'>{router.query.device} It is not a recognized device</span>
        <span className='text-xl font-semibold text-primary-500'>Choose an allowed device</span>

        <SelectDevice />
      </div>
    )
  }

  return (
    <div className='w-full overflow-hidden h-full md:h-[85vh] max-w-5xl mx-auto py-10 px-4'>
      <HeaderCTA auth={auth} />

      <div className='mt-12 md:mt-40 w-full'>
        <span className='text-3xl 2xl:text-4xl font-bold text-gray-800'>
          Download our apps for {device === 'ANDROID' ? 'Android' : 'iOs' }
        </span>

        <ListDeviceLinkApp>
          {
            device === 'ANDROID'
              ? androidApps.map(androidApp => <AndroidLinkApp trackStore={trackStore} androidApp={androidApp} />)
              : appleApps.map(appleApp => <AppleLinkApp trackStore={trackStore} appleApp={appleApp} />)
          }
        </ListDeviceLinkApp>

        <AuthCTA />
      </div>
    </div>
  )
}

DownloadAppPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Download App</title>
    </Head>

    {page}

    <FooterPublic />
  </>
)

export default DownloadAppPage