import { useEffect, useState } from 'react'
import Head from 'next/head'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { getMyPoints } from 'lib/services/nsur/getMyPoints'

import DashboardLayout from 'layouts/private/Dashboard'
import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

// import { FormConnectNsurAccount } from 'components/page/my-points/FormConnectNsurAccount'
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
          ...auth.nsurAccount,
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
      <p className='font-bold text-4xl'>{auth.nsurAccount?.myPoints ? auth.nsurAccount?.myPoints : 'No'} points</p>
      {/* <span className ='font-semibold text-lg'>You can win more points by _________</span> */}
    </div>
  )

  // if (auth.nsurAccount?.nsurUserId) {
  //   return (
  //     <div className='max-w-lg mx-auto w-full text-center'>
  //       <span className='font-semibold text-lg'>Now you’re connected to NSUR</span>
  //       <p className='font-bold text-4xl'>{auth.nsurAccount?.myPoints ? auth.nsurAccount?.myPoints : 'No'} points</p>
  //       {/* <span className ='font-semibold text-lg'>You can win more points by _________</span> */}
  //     </div>
  //   )
  // }

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
