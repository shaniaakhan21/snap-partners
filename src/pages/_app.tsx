import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'

import { ThemeProvider } from '@material-ui/core/styles'
import { Fragment, ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import type { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import Script from 'next/script'

import { useLoadingPage } from 'lib/hooks/useLoadingPage'
import { GTM_ID, pageview } from 'lib/utils/gtm'
import { useModalStore } from 'lib/stores'

import { ModalContainer } from 'components/common/ModalContainer'
import { LoadingPage } from 'components/layout/LoadingPage'
import { Overlay } from 'components/common/Overlay'
import { theme } from '../materialTheme'

import 'react-toastify/dist/ReactToastify.min.css'
import 'react-phone-input-2/lib/style.css'
import 'tippy.js/dist/tippy.css'
import 'styles/tailwind.css'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {
  const router = useRouter()
  const { isRouteChanging, loadingKey } = useLoadingPage()
  const { modalsData, closeModal } = useModalStore()
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
            })(window,document,'script','dataLayer', '${typeof document !== 'undefined' && document.location.hostname === 'snapdeliveredteam.com' ? GTM_ID.PRO : GTM_ID.PRE}');
          `
        }}
      />

      <LoadingPage isRouteChanging={isRouteChanging} key={loadingKey} />

      <ThemeProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>

      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        draggable={false}
        closeOnClick
        pauseOnHover
      />

      {modalsData?.map(modal => (
        <Fragment key={modal.id}>
          {modal.isOpen && (
            <Overlay onClick={(e, element) => closeModal(e, element, modal.id)}>
              <ModalContainer>
                {modal.modalChildren}
              </ModalContainer>
            </Overlay>
          )}
        </Fragment>
      ))}
    </>
  )
}

export default MyApp
