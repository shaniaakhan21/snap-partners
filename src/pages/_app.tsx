import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import { LicenseInfo } from '@mui/x-license-pro';
import { ThemeProvider } from '@material-ui/core/styles'
import { Fragment, ReactNode, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import type { NextComponentType } from 'next'
import { useRouter } from 'next/router'
import Script from 'next/script'
import Head from 'next/head'

import { useLoadingPage } from 'lib/hooks/useLoadingPage'
import { GTM_ID, GTMTrack } from 'lib/utils/gtm'
import { useModalStore } from 'lib/stores'

import { ModalContainer } from 'components/common/ModalContainer'
import { LoadingPage } from 'components/layout/public/LoadingPage'
import { Overlay } from 'components/common/Overlay'
import { theme } from '../materialTheme'

import 'react-toastify/dist/ReactToastify.min.css'
import 'react-phone-input-2/lib/style.css'
import 'tippy.js/dist/tippy.css'
import 'styles/tailwind.css'
import { APP_INFO } from '../config/appInfo'
import { appWithTranslation } from "next-i18next";

const { SEO } = APP_INFO

LicenseInfo.setLicenseKey('fd071382740945dd691689004ef10226Tz02MzY2NixFPTE3MTIzMTEwODQ0MjYsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {
  const getLayout = Component.getLayout || ((page: ReactNode) => page)
  const { isRouteChanging, loadingKey } = useLoadingPage()
  const { modalsData, closeModal } = useModalStore()
  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeComplete', GTMTrack.pageview)

    return () => {
      router.events.off('routeChangeComplete', GTMTrack.pageview)
    }
  }, [router.events])

  return (
    <>
      {/* Google Tag Manager - Datalayer */}
      <Script
        id='gtm-init-datalayer'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({ event: 'optimize.activate' });
          `
        }}
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

      {!router.asPath.startsWith('/share') && (
        <Head>
          <meta name='title' content={SEO.TITLE_PAGE} />
          <meta name='description' content={SEO.DESCRIPTION_PAGE} />

          <meta property='twitter:card' content='summary_large_image' />
          <meta property='twitter:url' content={SEO.URL_PAGE} />
          <meta property='twitter:title' content={SEO.TITLE_PAGE} />
          <meta property='twitter:description' content={SEO.DESCRIPTION_PAGE} />
          <meta property='twitter:image:alt' content={SEO.TITLE_PAGE} />
          <meta property='twitter:image' content={`${SEO.URL_PAGE}/images/logo-full-232px.png`} />

          <meta property='og:site_name' content={SEO.TITLE_PAGE} />
          <meta property='og:type' content='website' />
          <meta property='og:url' content={SEO.URL_PAGE} />
          <meta property='og:title' content={SEO.TITLE_PAGE} />
          <meta property='og:description' content={SEO.DESCRIPTION_PAGE} />
          <meta property='og:image' content={`${SEO.URL_PAGE}/images/logo-full-232px.png`} />
        </Head>

      )}

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

export default appWithTranslation(MyApp)
