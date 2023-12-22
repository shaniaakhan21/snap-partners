import { useRef } from 'react'
import { IBOIcon, DriverIcon, MerchantsIcon, ArrowRightIcon, CustomerIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SelectRoleToSignUp = () => {
  const router = useRouter()

  const { current: Apps } = useRef([
    { to: '/download-app?device=APPLE', icon: <img src='/images/app-store.png' className='inline-block mb-4 sm:mb-0 w-40' /> },
    { to: '/download-app?device=ANDROID', icon: <img src='/images/gplay.png' className='inline-block mb-4 sm:mb-0 w-40' /> }
  ])

  const { current: roles } = useRef([
    {
      icon: <CustomerIcon classes='w-12 h-16' />,
      label: 'I’m a Customer',
      key: ROLES.CUSTOMER,
      link: `/auth/signup?role=${ROLES.CUSTOMER}`
    },
    {
      icon: <DriverIcon classes='w-16 h-16' />,
      label: 'I’m a Driver',
      key: ROLES.DRIVER,
      link: `/auth/signup?role=${ROLES.DRIVER}`
    },
    {
      icon: <MerchantsIcon classes='w-16 h-16' />,
      label: 'I’m a Merchant',
      key: ROLES.MERCHANT,
      link: `/auth/signup?role=${ROLES.MERCHANT}`
    }
  ])

  const onRoleClick = (role) => {
    GTMTrack.signUp(role.key)
    router.push(role.link)
  }

  return (
    <div className='text-left flex flex-col justify-center items-center w-full'>
      <span className='sm:block font-bold text-3xl md:font-extrabold md:text-4xl mb-2 text-[#000] mt-4'>Welcome To Snap Delivered</span>
      <p className='font-semibold text-gray-600'>Please choose how you want to register, other rolls can be added once you log in </p>

      <ul className='flex flex-col justify-center items-center my-4 w-full rounded-lg border-2 border-gray-200 mb-8'>
        {
          roles.map(role => {
            return (
              <li key={role.key} className='w-full hover:bg-gray-50 border-b-2 border-gray-200 last:border-b-0 ease-in duration-150'>
                <button
                  onClick={() => onRoleClick(role)}
                  className='w-full py-4 px-4 sm:flex justify-between items-center gap-x-4'
                >
                  <div className=' '>
                    <div className='w-28 h-28 mx-auto sm:mx-inherit border-2 border-gray-200 rounded-full inline-block bg-white p-3 flex items-center text-center'>
                      <span className='mx-auto'>{role.icon}</span>
                    </div>
                  </div>

                  <div className='flex items-center w-full ml-0 text-center sm:ml-2'>
                    <span className='flex mx-auto sm:mx-0'>
                      <span className='text-gray-700 text-lg font-semibold Capitalise text-back'>{role.label}</span>
                      <ArrowRightIcon classes='mt-0.5 ml-4' />
                    </span>
                  </div>
                </button>
              </li>
            )
          })
        }
      </ul>

      <div className='border-t-2 border-t-gray-200 mt-8 mb-8 relative text-gray-700 font-semibold w-full text-center '>
        <span className='mx-auto border-2 border-gray-300 rounded-full w-12 h-12 block text-center pt-3 font-bold text-sm bg-white  -mt-6'>OR</span>
      </div>

      <div className='text-center'>
        <span className='font-semibold text-gray-600 text-sm sm:text-base'>Already have an account?</span>
        <Link href='/auth/login'>
          <a className='text-primary-500 font-semibold text-xl underline decoration-1 ml-2 hover:text-black'>Sign In</a>
        </Link>
      </div>

      <div className='mt-8 text-center items-center'>
        {Apps.map(app => (
          <Link key={app.to} href={app.to}>
            <a className='mx-2'>
              {app.icon}
            </a>
          </Link>
        ))}
      </div>

    </div>

  )
}
