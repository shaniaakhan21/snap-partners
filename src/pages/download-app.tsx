import Link from 'next/link'
import Head from 'next/head'

import type { Page as PageNext } from 'lib/types'
import { PAGE_INFO } from 'config/pageInfo'

import { FooterPublic } from 'components/layout/public/Footer'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { Spinner } from 'components/common/loaders'
import { AppleStore, GooglePlayBanner } from 'components/common/icons'

const { SEO } = PAGE_INFO

const DownloadAppPage: PageNext = () => {
  const [device, setDevice] = useState<'APPLE' | 'ANDROID'>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const { current: androidApps } = useRef([
    {
      title: 'Driver app',
      subtitle: 'Snap Operations Specialist app',
      description: 'Fullfil and Manage orders and',
      link: 'https://play.google.com/store/apps/details?id=com.snapdelivered.driverapp'
    },
    {
      title: 'Costumer app',
      subtitle: 'User app',
      description: 'Order food and get it SNAP',
      link: 'https://play.google.com/store/apps/details?id=com.snapdelivered.userapp'
    },
    {
      title: 'Restaurant app',
      subtitle: 'Snap Merchant Control app',
      description: 'Manager orders and payments',
      link: 'https://play.google.com/store/apps/details?id=com.snapdelivered.restaurantapp'
    }
  ])

  const { current: appleApps } = useRef([
    {
      title: 'Driver app',
      subtitle: 'Snap Operations Specialist app',
      description: 'Fullfil and Manage orders and',
      link: 'https://apps.apple.com/us/app/snap-operations-specialist/id1478862279'
    },
    {
      title: 'Costumer app',
      subtitle: 'User app',
      description: 'Order food and get it SNAP',
      link: 'https://apps.apple.com/us/app/snap-user/id1478863057'
    },
    {
      title: 'Restaurant app',
      subtitle: 'Snap Merchant Control app',
      description: 'Manager orders and payments',
      link: 'https://apps.apple.com/ve/app/snap-merchant-control/id1478737288'
    }
  ])

  const handlerDevice = () => {
    if (typeof router.query.device === 'string') {
      if (router.query.device === 'APPLE') return 'APPLE'
      if (router.query.device === 'ANDROID') return 'ANDROID'
      else return null
    } else return null
  }

  useEffect(() => {
    setDevice(() => handlerDevice())
    setIsLoading(false)
  }, [router.query.device])

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-[85vh] md:w-full'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  if (!device) {
    return (
      <>
        <div className='w-full overflow-hidden h-full md:h-[85vh] max-w-7xl mx-auto py-10 px-4 text-center flex flex-col justify-center items-center'>
          <span className='text-4xl font-bold text-gray-800'>{router.query.device} It is not a recognized device</span>
          <span className='text-xl font-semibold text-primary-500'>Choose an allowed device</span>

          <div className='mt-5 flex justify-center items-center'>
            <Link href='/download-app?device=ANDROID'>
              <a className='block w-36 mr-8 px-4 py-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                Android
              </a>
            </Link>

            <Link href='/download-app?device=APPLE'>
              <a className='block w-36 px-4 py-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                iOs
              </a>
            </Link>
          </div>
        </div>

        <FooterPublic />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{SEO.TITLE_PAGE} - Download App</title>
      </Head>

      <div className='w-full overflow-hidden h-full md:h-[85vh] max-w-5xl mx-auto py-10 px-4'>
        <header className='w-full flex justify-between items-center'>
          <section className='flex justify-start items-center'>
            <img
              src='/images/logo-dark.png'
              className='w-16 h-16 mr-4'
            />

            <span className='text-3xl font-bold text-gray-800'>SnapDelivered</span>
          </section>

          <section className='hidden md:block'>
            <Link href='/auth/signup'>
              <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                Register now!
              </a>
            </Link>

            <Link href='/auth/login'>
              <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
            </Link>
          </section>
        </header>

        <div className='mt-12 md:mt-40 w-full'>
          <span className='text-3xl 2xl:text-4xl font-bold text-gray-800'>
            Download our apps for {device === 'ANDROID' ? 'Android' : 'iOs' }
          </span>

          <ul className='flex flex-col md:flex-row justify-between items-start mt-10 gap-x-28 gap-y-11'>
            {
              device === 'ANDROID'
                ? androidApps.map(androidApp => (
                  <li>
                    <article>
                      <h6 className='text-2xl 2xl:text-3xl font-bold text-primary-500'>{androidApp.title}</h6>
                      <span className='text-xl font-semibold text-gray-700'>{androidApp.subtitle}</span> <br />
                      <p className='text-gray-700'>{androidApp.description}</p>

                      <a
                        href={androidApp.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block w-fit mt-4'
                      >
                        <GooglePlayBanner classes='w-36' />
                      </a>
                    </article>
                  </li>
                ))
                : appleApps.map(appleApp => (
                  <li>
                    <article>
                      <h6 className='text-2xl 2xl:text-3xl font-bold text-primary-500'>{appleApp.title}</h6>
                      <span className='text-xl font-semibold text-gray-700'>{appleApp.subtitle}</span> <br />
                      <p className='text-gray-700'>{appleApp.description}</p>

                      <a
                        href={appleApp.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block w-fit mt-4'
                      >
                        <AppleStore classes='w-36' />
                      </a>
                    </article>
                  </li>
                ))
            }
          </ul>

          <section className='md:hidden mt-10 w-full flex justify-center items-center'>
            <Link href='/auth/signup'>
              <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                Register now!
              </a>
            </Link>

            <Link href='/auth/login'>
              <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
            </Link>
          </section>
        </div>
      </div>

      <FooterPublic />
    </>
  )
}

export default DownloadAppPage
