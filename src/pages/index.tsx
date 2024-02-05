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
import { builderWebsiteFields } from '../lib/types/user/profile'

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
          socialSecurityNumber: data.socialSecurityNumber,
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
          driver_status: data.driver_status,
          idImage: data.idImage,
          insuranceImage: data.insuranceImage,
          profileImage: data.profileImage,
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
          },
          bank_information: data.bank_information,
          level: data?.level,
          isCertified: data.isCertified,
          isValidated: data.isValidated,
          street: data.street,
          city: data.city,
          state: data.state,
          dateOfBirth: data.dateOfBirth,
          zip: data.zip,
          TINstatus: data.TINstatus,
          SSNDocURL: data.SSNDocURL,
          doc_irs: data.doc_irs,
          doc_b_structure: data.doc_b_structure,
          ein: data.ein,
          businessName: data.businessName,
          business_type: data.business_type,
          b_start_date: data.b_start_date,
          zendesk_id: data.zendesk_id,
          business_approved: data.business_approved,
          ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
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
        driver_status,
        idImage,
        insuranceImage,
        ownerName,
        ranks,
        referralCode,
        updatedAt,
        referralLink,
        level,
        street,
        state,
        city,
        zip,
        dateOfBirth,
        isValidated,
        business_approved
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
        driver_status,
        createdAt,
        accessToken,
        idImage,
        insuranceImage,
        ownerName,
        ranks,
        referralCode,
        updatedAt,
        referralLink,
        level,
        street,
        state,
        city,
        zip,
        dateOfBirth,
        isValidated,
        business_approved
      })
    } else {
      GTMTrack.userInfo()
    }
  }, [auth])

  return (

    <div className='w-full h-full m-0 p-4 sm:p-6 lg:p-8 max-w-full md:mx-auto md:w-full xl:w-11/12 2xl:w-11/12'>
      <div className='block lg:flex items-center'>
        <div className='hidden lg:block w-full pt-8 ml-auto'>
          <div className='float-right'>
            <div className='flex'>
              <div className='mr-4 lg:mr-4 xl:mr-7 2xl:mr-12'>
                <div className='inline-block w-auto bg-primary-500 rounded-xl p-5 shadow-lg'>
                  <img src='/static/snap_partners_logo.png' className='w-36 overflow-hidden rounded-full border-4 border-white' />
                </div>
              </div>
              <div className='mb-8'>
                <div className=' '>
                  <h1 className='font-extrabold text-4xl 2xl:text-5xl'>Snap Partners</h1>
                  <p className='text-xl 2xl:text-2xl font-bold mt-3'>Delivering what matters most in a SNAP!</p>
                </div>
                <ul className='list-none pl-2 mt-12 font-base font-semibold text-xl 2xl:text-xl space-y-6'>
                  <li className='relative pl-8 before:absolute before:left-1 before:top-2.5 before:bg-black before:content before:w-0.5 before:h-32 after:absolute after:left-0 after:top-2.5 after:bg-black after:rounded-full after:content after:w-2.5 after:h-2.5'>Get notified about company updates</li>
                  <li className='relative pl-8 before:absolute before:left-1 before:top-2.5 before:bg-black before:content before:w-0.5 before:h-20 after:absolute after:left-0 after:top-2.5 after:bg-black after:rounded-full after:content after:w-2.5 after:h-2.5'>Access to company training</li>
                  <li className='relative pl-8 before:absolute before:left-1 before:top-2.5 before:bg-black before:content before:w-0.5 before:h-14 after:absolute after:left-0 after:top-2.5 after:bg-black after:rounded-full after:content after:w-2.5 after:h-2.5'>Get synced</li>
                  <li className='relative pl-8 after:absolute after:left-0 after:top-2.5 after:bg-black after:rounded-full after:content after:w-2.5 after:h-2.5'>Track your team</li>
                </ul>
              </div>
            </div>

            <img src='/static/landingpage-img.svg' className='-ml-7' />
          </div>
        </div>
        <div className='w-full'>
          {/* <ContentMobile /> */}
          <ContentDesktop />
        </div>
      </div>
      <div className='pt-6 text-center text-gray-400'>© 2024 Snap Partners. All rights reserved.</div>
    </div>
  )
}

HomePage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE}</title>
    </Head>

    {page}

    {/* <FooterPublic /> */}
  </>
)

export default HomePage
