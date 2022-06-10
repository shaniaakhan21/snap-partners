import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import Head from 'next/head'

import { handleFetchError } from 'lib/utils/handleFetchError'
import { getLocalStorage } from 'lib/utils/localStorage'
import { getUserMe } from 'lib/services/user/getUserMe'
import { useAuthStore } from 'lib/stores'
import { APP_INFO } from 'config/appInfo'
import { GTMTrack } from 'lib/utils/gtm'
import type { Page } from 'lib/types'

import { FooterPublic } from 'components/layout/public/Footer'
import { ContentMobile } from 'components/page/home/ContentMobile'
import { ContentDesktop } from 'components/page/home/ContentDesktop'

const { SEO } = APP_INFO

const HomePage: Page = () => {
  const { auth, setAuth } = useAuthStore()
  const router = useRouter()

  useEffect(() => {
    (async () => {
      if (auth) {
        router.push('/overview')
        return
      }

      const token = getLocalStorage('accessToken')

      if (token) {
        // const { userId } = decodeAccessToken(token)

        const { data, error } = await getUserMe({ token })

        if (error) {
          handleFetchError(error.status, error.info)
          return
        }

        toast('Session recovered!', { type: 'success' })
        setAuth({
          email: data.email,
          name: data.name,
          password: data.password,
          phoneNumber: data.phoneNumber,
          accessToken: token,
          lastname: data.lastname,
          roles: data.roles,
          id: data.id,
          username: data.username,
          referralCode: data.referralCode,
          idImage: data.idImage,
          insuranceImage: data.insuranceImage,
          isManager: data.ranks?.type === 'manager',
          createdAt: data.createdAt,
          ownerName: data.ownerName,
          ranks: data.ranks,
          updatedAt: data.updatedAt,
          blocked: data.blocked,
          deleted: data.deleted,
          nsurAccount: {
            nsurUserId: data.nsurUserId,
            myPoints: auth?.nsurAccount?.myPoints || null
          }
        })
        router.push('/overview')
      }
    })()
    // add user info into GTM dataLayer
    if (auth) {
      const {
        id,
        username,
        name,
        lastname,
        email,
        phoneNumber,
        roles,
        isManager,
        accessToken,
        createdAt,
        idImage,
        insuranceImage,
        ownerName,
        ranks,
        referralCode,
        updatedAt,
        referralLink
      } = auth

      GTMTrack.userInfo({
        id,
        username,
        name,
        lastname,
        email,
        phoneNumber,
        roles,
        isManager,
        createdAt,
        accessToken,
        idImage,
        insuranceImage,
        ownerName,
        ranks,
        referralCode,
        updatedAt,
        referralLink
      })
    } else {
      GTMTrack.userInfo()
    }
  }, [auth])

  return (
    <div className='w-full overflow-hidden'>
      <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
        <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
          <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

          <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
            <div className='mt-24'>
              <h1 className='text-5xl font-bold 2xl:text-7xl'>Snap Delivered</h1>
              <p className='text-3xl font-bold mt-1'>Order-Eat-Repeat</p>
              <br />
            </div>

            <ul className='list-disc pl-6 mt-20 text-xl space-y-4'>
              <li>Get notified about company updates</li>
              <li>Access to company training</li>
              <li>Get synced</li>
              <li>Track your team</li>
            </ul>

            <div className='absolute bottom-10 left-12 flex items-center gap-x-4'>
              <img src='/images/logo-dark.png' />
              <span className='font-bold text-2xl'>SnapDelivered</span>
            </div>
          </div>
        </section>

        <ContentMobile />
        <ContentDesktop />
      </div>
    </div>
  )
}

HomePage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE}</title>
    </Head>

    {page}

    <FooterPublic />
  </>
)

export default HomePage
