import { useRef } from 'react'
import { IBOIcon, DriverIcon, MerchantsIcon, ArrowRightIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { signUp } from 'lib/utils/gtm'
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
      icon: <MerchantsIcon classes='w-14 h-14' />,
      label: 'I have a Restaurant',
      key: ROLES.MERCHANT,
      link: `/auth/signup?role=${ROLES.MERCHANT}`
    }
  ])

  const onRoleClick = (role) => {
    signUp(role.key, 1)
    router.push(role.link)
  }

  return (
    <div className='text-center h-[85vh] flex flex-col justify-center items-center w-full'>
      <span className='text-3xl text-gray-800 font-bold'>Welcome To Snap Delivered</span>
      <p className='text-gray-600 font-semibold'>Please choose how you want to register, other rolls <br className='hidden sm:block' /> can be added once you log in </p>

      <ul className='flex flex-col justify-center items-center my-4 gap-y-4 w-full'>
        {
          roles.map(role => {
            return (
              <li key={role.key} className='max-w-md w-full bg-gray-200 hover:bg-gray-300 rounded-md'>
                <button
                  onClick={() => onRoleClick(role)}
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

      <br />
      <p className='text-gray-700 font-semibold'>OR</p>
      <br />

      <p>
        <span className='font-bold text-gray-800'>Already have an account?</span>
        <Link href='/auth/login'>
          <a className='text-textAcent-500'> Login.</a>
        </Link>
      </p>
    </div>
  )
}
