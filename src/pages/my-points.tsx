import { useEffect, useState } from 'react'
import Head from 'next/head'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { getMyPoints } from 'lib/services/nsur/getMyPoints'

import DashboardLayout from 'layouts/private/Dashboard'
import type { Page, ReactNode } from 'lib/types'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'

// import { FormConnectNsurAccount } from 'components/page/my-points/FormConnectNsurAccount'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'

const { SEO } = APP_INFO

const MyPointsPage: Page = () => {
  const { auth } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [myPoints, setMypoints] = useState(null)

  useEffect(() => {
    (async () => {
      setLoading(true)
      const { data, error } = await getMyPoints(auth.id, auth.accessToken)

      if (error) {
        handleFetchError(error.status, error.info)
        setLoading(false)
        return
      }

      setMypoints(data.totalAmount)

      setLoading(false)
    })()
  }, [])

  if (loading) return <SpinnerPageContent />

  return (
    <div className='max-w-xl mx-auto w-full text-center'>
      <p className='font-bold text-4xl'>{myPoints || "You currently don't have any"} points</p>
      <br/>
      <span className='font-semibold text-lg'>Generate points by orders that will be converted to NSUR Coin.</span>

      <br/>
      <br/>
      <span className='font-semibold text-sm'>Start now by creating an account in NSUR and start accumulating points.</span>

      <br/>
      <br/>
      <a href='https://nsurcoin.com/invite/5/snapdelivered/website' className='uppercase text-white bg-primary-500 px-4 py-1.5 rounded-full font-semibold hover:opacity-80'>
        REGISTER NOW!
      </a>
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
