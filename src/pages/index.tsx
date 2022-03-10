import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

import { useAuthStore } from 'lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
import { decodeAccessToken } from 'lib/utils/decodedAccessToken'
import { getUserMe } from 'lib/services/users/getUserMe'
import { handleFetchError } from 'lib/utils/handleFetchError'
import type { Page as PageNext } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'

import { HomeIllustration } from 'components/common/illustrations'
import { FooterPublic } from 'components/layout/public/Footer'

const { SEO } = PAGE_INFO

const HomePage: PageNext = () => {
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
        const { userId } = decodeAccessToken(token)

        const { data, error } = await getUserMe({ token })

        if (error) {
          handleFetchError(error.status, error.info)
          router.push('/auth/login')
          return
        }

        toast('Session recovered!', { type: 'success' })
        setAuth({
          email: data.email,
          name: data.name,
          phone: data.phoneNumber,
          accessToken: token,
          lastname: data.lastname,
          roles: data.roles,
          id: userId,
          username: data.username,
          referralCode: data.referralCode,
          idImage: data.idImage,
          insuranceImage: data.insuranceImage,
          isManager: data.isManager,
          sponsorId: data.sponsorId
        })
        router.push('/overview')
      }
    })()
  }, [auth])

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE}</title>
      </Head>

      <div className='w-full overflow-hidden'>
        <div className='flex flex-col h-full md:flex-row justify-between items-center md:items-start'>
          <section className='sticky top-0 left-0 h-screen hidden md:flex flex-col justify-start w-1/2 md:min-h-screen bg-textAcent-500 text-white'>
            <img src='/static/authBg.svg' className='w-full h-screen object-cover absolute bottom-0 right-0 z-0' />

            <div className='absolute w-full h-full top-0 right-0 z-10 px-4 pb-8 md:px-12'>
              <div className='mt-24'>
                <h1 className='text-5xl font-bold 2xl:text-7xl'>Snap Delivered</h1>
                <p className='text-3xl font-bold mt-1 2xl:text-5xl'>Order-Eat-Repeat</p>
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

          <section className='w-full md:w-1/2 bg-white px-4 py-10 relative h-screen lg:hidden'> {/* Mobile */}
            <div className='flex justify-center items-center gap-x-3'>
              <div>
                <img
                  src='/images/logo-dark.png'
                  className='w-12 h-12'
                />
              </div>

              <div>
                <p>
                  <span className='text-2xl font-bold'>SnapDelivered</span> <br />
                  <span className='text-lg font-semibold'>Order-Eat-Repeat</span>
                </p>
              </div>
            </div>

            <div className='mt-40 text-center'>
              <span className='text-3xl font-bold'>Unlock your team <br /> performance</span><br />

              <Link href='/auth/signup'>
                <a className='w-full block mt-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                  Register now!
                </a>
              </Link>

              <Link href='/auth/login'>
                <a className='block mt-14 text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
              </Link>
            </div>

            <div className='absolute -bottom-10 lg:bottom-0 left-0 w-full flex justify-center items-center'>
              <HomeIllustration />
            </div>
          </section>

          <section className='w-full md:w-1/2 bg-white px-4 py-10 relative h-screen hidden lg:block'> {/* Desktop */}
            <div className='absolute top-10 right-4'>
              <Link href='/auth/login'>
                <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
              </Link>
            </div>

            <div className='leading-8 h-screen flex justify-center items-center -mt-10'>
              <div>
                <span className='text-5xl font-bold text-gray-700'>Welcome to Snap Delivered</span> <br />
                <span className='text-3xl font-bold text-gray-700'>Join the ever growing Snap Delivered Community</span> <br />
                <span className='text-xl font-bold text-gray-600'>Unlock your team performance</span> <br /><br />

                <Link href='/auth/signup'>
                  <a className='px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                    Register now!
                  </a>
                </Link>
              </div>
            </div>

            <div className='absolute -bottom-10 lg:bottom-0 left-0 w-full flex justify-center items-center'>
              <HomeIllustration />
            </div>
          </section>
        </div>
      </div>

      <FooterPublic />
    </>
  )
}

export default HomePage
