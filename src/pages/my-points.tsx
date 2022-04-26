import Head from 'next/head'

import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { useAuthStore } from 'lib/stores'
import { useEffect, useState } from 'react'
import { getMyPoints } from 'lib/services/nsur/getMyPoints'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { Spinner } from 'components/common/loaders'

const { SEO } = APP_INFO

const MyPointsPage: Page = () => {
  const { auth, setAuth } = useAuthStore()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data, error } = await getMyPoints(auth.id, auth.accessToken)

      if (error) {
        handleFetchError(error.status, error.info)
        setLoading(false)
        return
      }

      setAuth({
        ...auth,
        nsurAccount: {
          myPoints: data.totalAmount
        }
      })
      setLoading(false)
    })()
  }, [])

  if (loading) {
    return (
      <div className='w-full h-screen-80 flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='max-w-lg mx-auto w-full text-center'>
      <span className='font-semibold text-lg'>Now you’re connected to NSUR</span>
      <p className='font-bold text-4xl'>{auth.nsurAccount?.myPoints ? auth.nsurAccount?.myPoints : '0'} points</p>
      <span className='font-semibold text-lg'>You can win more points by _________</span>
    </div>
  )

  // return (
  //   <div className='max-w-lg mx-auto w-full'>
  //     <FormConnectNsurAccount auth={auth} setAuth={setAuth} />
  //   </div>
  // )
}

MyPointsPage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - My Points</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default MyPointsPage
