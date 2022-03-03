import { useRef } from 'react'
import { IBOIcon, DriverIcon, RestaurantsIcon, ArrowRightIcon } from 'components/common/icons'
import { MobileAppsLink } from 'components/common/mobileApps/MobileAppsLink'
import { ROLES } from 'config/roles'
import { mobileAppsLinks } from 'lib/utils/mobileAppLinks'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SelectRoleToSignUp = () => {
  const router = useRouter()
  const { current: roles } = useRef([
    {
      icon: <IBOIcon classes='w-14 h-14' />,
      label: 'I’m Customer',
      key: ROLES.CUSTOMER,
      link: `/auth/signup?role=${ROLES.CUSTOMER}`
    },
    {
      icon: <DriverIcon classes='w-14 h-14' />,
      label: 'I’m a Driver',
      key: ROLES.DRIVER,
      link: `/auth/signup?role=${ROLES.DRIVER}`
    },
    {
      icon: <RestaurantsIcon classes='w-14 h-14' />,
      label: 'I have a Restaurant',
      key: ROLES.RESTAURANT,
      link: `/auth/signup?role=${ROLES.RESTAURANT}`
    }
  ])

  return (
    <div className='text-center'>
      <span className='text-3xl text-gray-800 font-bold'>Welcome To Snap Delivered</span>

      <ul className='flex flex-col justify-center items-center my-4 gap-y-4'>
        {
          roles.map(role => {
            return (
              <li key={role.key} className='max-w-xs w-full bg-gray-200 hover:bg-gray-300 rounded-md'>
                <button
                  onClick={() => router.push(role.link)}
                  className='w-full py-4 px-5 flex justify-between items-center gap-x-8'
                >
                  {role.icon}

                  <div className='flex justify-end items-center'>
                    <span className='text-lg font-bold text-gray-800'>{role.label}</span>
                    <ArrowRightIcon classes='mt-0.5' />
                  </div>
                </button>
              </li>
            )
          })
        }
      </ul>

      <p>
        <span className='font-bold text-gray-800'>Already have an account?</span>
        <Link href='/auth/login'>
          <a className='text-textAcent-500'> Login.</a>
        </Link>
      </p>
      <br />

      <div className='max-w-sm mx-auto'>
        <span className='text-xl text-gray-500 text-center'>You can download some of our apps below or visit our website at </span>
        <Link href='https://snapdelivered.com/'>
          <a target='_blank' className='text-xl text-primary-500 text-center'>snapdelivered.com</a>
        </Link>
      </div>

      <MobileAppsLink
        appStoreHref={mobileAppsLinks.customer.appStore}
        playStoreHref={mobileAppsLinks.customer.playStore}
        title={mobileAppsLinks.customer.title}
      />
      <MobileAppsLink
        appStoreHref={mobileAppsLinks.driver.appStore}
        playStoreHref={mobileAppsLinks.driver.playStore}
        title={mobileAppsLinks.driver.title}
      />
      <MobileAppsLink
        appStoreHref={mobileAppsLinks.restaurant.appStore}
        playStoreHref={mobileAppsLinks.restaurant.playStore}
        title={mobileAppsLinks.restaurant.title}
      />
    </div>
  )
}
