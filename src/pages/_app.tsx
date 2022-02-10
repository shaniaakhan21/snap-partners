import { ReactNode, useEffect } from 'react'
import type { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { ToastContainer } from 'react-toastify'
import { SWRConfig } from 'swr'
import { LoadingPage } from 'components/layout/LoadingPage'
import { GTM_ID, pageview } from 'lib/utils/gtm'
import { useLoadingPage } from 'lib/hooks/useLoadingPage'
import { swrConfigValue } from 'lib/utils/swrConfig'
import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.min.css'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {
  const router = useRouter()
  const { isRouteChanging, loadingKey } = useLoadingPage()
  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)

    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
    <>
      {/* Google Tag Manager - Datalayer */}
      <Script
        id='gtm-init-datalayer'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{ __html: 'window.dataLayer = window.dataLayer || [];' }}
      />
      {/* Google Tag Manager (gtm.ts) - Global base code */}
      <Script
        id='gtm-init'
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', '${GTM_ID}');
          `
        }}
      />

      <LoadingPage isRouteChanging={isRouteChanging} key={loadingKey} />

      <SWRConfig value={swrConfigValue}>
        {getLayout(<Component {...pageProps} />)}
      </SWRConfig>

      <ToastContainer
        position='bottom-left'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />
    </>
  )
}

export default MyApp
