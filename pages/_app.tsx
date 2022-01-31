import { ReactNode } from 'react'
import type { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppLayoutProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { useLoadingPage } from 'lib/hooks/useLoadingPage'
import { LoadingPage } from 'components/layout/LoadingPage'

import 'styles/tailwind.css'
import 'react-toastify/dist/ReactToastify.min.css'
import '@react-pdf-viewer/core/lib/styles/index.css'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({ Component, pageProps }: AppLayoutProps) => {
  const { isRouteChanging, loadingKey } = useLoadingPage()
  const getLayout = Component.getLayout || ((page: ReactNode) => page)

  return (
    <>
      <LoadingPage isRouteChanging={isRouteChanging} key={loadingKey} />

      {getLayout(<Component {...pageProps} />)}

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
