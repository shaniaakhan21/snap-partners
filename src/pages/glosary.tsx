import Head from 'next/head'

import type { Page } from 'lib/types'
import { APP_INFO } from 'config/appInfo'
import Link from 'next/link'
import { useRef } from 'react'
import { useAuthStore } from 'lib/stores'

const { SEO } = APP_INFO

const GlosaryPage: Page = () => {
  const { auth } = useAuthStore()

  const { current: glosaryInfo } = useRef({
    apps: [
      {
        title: 'Driver app',
        subtitle: 'Snap Operations Specialist app',
        description: 'Fullfil and Manage orders'
      },
      {
        title: 'Costumer app',
        subtitle: 'User app',
        description: 'Order food and get it SNAP'
      },
      {
        title: 'Restaurant app',
        subtitle: 'Snap Merchant Control app',
        description: 'Manager orders and payments'
      }
    ],

    roles: [
      {
        icon: '/static/glosary/driver.png',
        title: 'Driver',
        subtitle: 'Snap Operations Specialist'
      },
      {
        icon: '/static/glosary/customer.png',
        title: 'Costumer',
        subtitle: 'User'
      },
      {
        icon: '/static/glosary/restaurant.png',
        title: 'Restaurant',
        subtitle: 'Snap Merchant Control'
      }
    ],

    ranks: [
      {
        icons: [
          '/static/badges/FreeMemberDriver.png',
          '/static/badges/FreeMemberCustomer.png',
          '/static/badges/FreeMemberRestaurant.png'
        ],
        title: 'Free Member',
        qualifications: '100% Free to sign up and refer restaurants, drivers and customers.'
      },
      {
        icons: [
          '/static/badges/ManagerDriver.png',
          '/static/badges/ManagerCustomer.png',
          '/static/badges/ManagerRestaurant.png'
        ],
        title: 'Manager',
        qualifications: 'Sign up through the Snap Delivered Website as a Manager for $299.99 Annually. Minimum $100 in personal commissionable volume to earn level.'
      },
      {
        icons: [
          '/static/badges/SupervisorDriver.png',
          '/static/badges/SupervisorCustomer.png',
          '/static/badges/SupervisorRestaurant.png'
        ],
        title: 'Supervisor',
        qualifications: '3 PSM (Personally Sponsored Managers) All must be active. 500 Orders Per Month within organization. Limit of 250 Orders contributed from each leg. Must have 3 legs minimum with at least 50 Orders per leg. ($100 in Monthly Personal Commissionable Volume). Supervisors earn a 1% Open Line Override Below their 2nd Level down to the next Supervisor.'
      },
      {
        icons: [
          '/static/badges/DirectorDriver.png',
          '/static/badges/DirectorCustomer.png',
          '/static/badges/DirectorRestaurant.png'
        ],
        title: 'Director',
        qualifications: '4 PSMs, All must be active. 5,000 Orders Per Month within organization. Limit of 2,500 Orders contributed from each leg. Must have 4 legs minimum with at least 250 Orders per leg. ($100 in Monthly Personal Commissionable Volume). Directors earn a 1% Open Line Override below their 3rd Level down to the next Qualified Director. Directors earn a 1% First Generational Override below their 1st Qualified Director’s organization in each leg.'
      },
      {
        icons: [
          '/static/badges/ExecutiveDriver.png',
          '/static/badges/ExecutiveCustomer.png',
          '/static/badges/ExecutiveRestaurant.png'
        ],
        title: 'Excecutive',
        qualifications: '5 PSMs, All must be active. 10,000 Orders Per Month within organization. Limit of 5,000 Orders contributed from each leg. Must have 5 legs minimum with at least 500 Orders per leg. ($100 in Monthly Personal Commissionable Volume). Executives earn a 2% Open Line Override below their 5th Level down to the next Qualified Executive. Executives earn a 2% First Generational Override below their 1st Qualified Executive’s organization in each leg. Executives earn a 1% Second Generational Override below their 2nd Qualified Executive’s organization in each leg. 2% Profit Sharing Pool. 10 Shares for every 10,000 Orders. Limit of 5,000 Orders contributed from each leg.'
      }
    ]
  })

  return (
    <div className='w-full overflow-hidden h-full max-w-4xl mx-auto py-10 px-4'>
      <header className='w-full flex justify-between items-center'>
        <section className='flex justify-start items-center'>
          <img
            src='/images/logo-dark.png'
            className='w-16 h-16 mr-4'
          />

          <span className='text-3xl font-bold text-gray-800'>SnapDelivered</span>
        </section>

        <section className='hidden md:block'>
          {
            auth
              ? (
                <Link href='/overview'>
                  <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                    Back Dashboard
                  </a>
                </Link>
              )
              : (
                <>
                  <Link href='/auth/signup'>
                    <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
                  Register now!
                    </a>
                  </Link>

                  <Link href='/auth/login'>
                    <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
                  </Link>
                </>
              )
          }
        </section>
      </header>

      <div className='mt-20 w-full'>
        <p className='font-bold text-3xl'>Terms of our business</p>

        <div className='mt-4'>
          <span className='text-2xl font-bold'>Apps</span>

          <ul className='w-full flex justify-between items-start mt-4 text-gray-800'>
            {
              glosaryInfo.apps.map(app => (
                <li key={app.title}>
                  <article>
                    <h5 className='font-bold text-xl text-primary-500'>{app.title}</h5>
                    <span className='font-semibold'>{app.subtitle}</span>
                    <p>{app.description}</p>
                  </article>
                </li>
              ))
            }
          </ul>

          <div className='mt-32'>
            <span className='text-2xl font-bold'>Roles</span>

            <ul className='w-full flex justify-between items-start text-gray-800 mt-4'>
              {
                glosaryInfo.roles.map(role => (
                  <li key={role.title}>
                    <article>
                      <section className='flex justify-start items-center'>
                        <img src={role.icon} className='mr-4' />
                        <h5 className='font-bold text-xl text-primary-500'>{role.title}</h5>
                      </section>

                      <section className='mt-4'>
                        <span className='font-semibold text-lg'>{role.subtitle}</span>
                      </section>
                    </article>
                  </li>
                ))
              }
            </ul>
          </div>

          <div className='mt-32'>
            <ul className='flex flex-col justify-start items-center gap-y-32'>
              {
                glosaryInfo.ranks.map(rank => (
                  <li key={rank.title} className='max-w-lg w-full'>
                    <article>
                      <section className='flex justify-start items-start'>
                        {
                          rank.icons.map(icon => (
                            <img src={icon} className='mr-4' />
                          ))
                        }

                        <span className='text-xl font-bold'>{rank.title}</span>
                      </section>

                      <section className='mt-4 bg-primary-500 rounded-md p-4 text-white'>
                        <span className='font-semibold text-lg'>Qualifications</span>
                        <br /><br />

                        {rank.qualifications}
                      </section>
                    </article>
                  </li>
                ))
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

GlosaryPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Login</title>
    </Head>

    {page}
  </>
)

export default GlosaryPage
