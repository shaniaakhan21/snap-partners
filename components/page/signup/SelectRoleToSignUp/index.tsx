import { IBOIcon, DriverIcon, RestaurantsIcon, ArrowRightIcon } from 'components/common/icons'
import { ROLES } from 'config'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export const SelectRoleToSignUp = ({ referralLink }) => {
  const router = useRouter()
  const { current: roles } = useRef([
    {
      icon: <IBOIcon classes='w-14 h-14' />,
      label: 'I’m Customer',
      key: ROLES.CUSTOMER,
      link: `/auth/signup?referralRole=${ROLES.CUSTOMER}`
    },
    {
      icon: <RestaurantsIcon classes='w-14 h-14' />,
      label: 'I have a Restaurant',
      key: ROLES.RESTAURANT,
      link: 'https://opportunity.snapdelivered.com/restaurants.php'
    },
    {
      icon: <DriverIcon classes='w-14 h-14' />,
      label: 'I’m a Driver',
      key: ROLES.DRIVER,
      link: `/auth/signup?referralRole=${ROLES.DRIVER}`
    }
  ])

  return (
    <div className='text-center'>
      <span className='text-3xl text-gray-800 font-bold'>Tell us what’s your situation</span>

      <ul className='flex flex-col justify-center items-center my-4 gap-y-4'>
        {
          roles.map(role => {
            if (role.key === ROLES.RESTAURANT) {
              return (
                <li key={role.key} className='max-w-xs w-full bg-gray-200 hover:bg-gray-300 rounded-md'>
                  <a
                    href={role.link}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='w-full py-4 px-5 flex justify-between items-center gap-x-8'
                  >
                    {role.icon}

                    <div className='flex justify-end items-center'>
                      <span className='text-lg font-bold text-gray-800'>{role.label}</span>
                      <ArrowRightIcon classes='mt-0.5' />
                    </div>
                  </a>
                </li>
              )
            }

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
        <span className='font-normal text-gray-800'>Already have an accout?</span>
        <Link href='/auth/signin'>
          <a className='text-textAcent-500'> Sign In.</a>
        </Link>
      </p>
    </div>
  )
}
