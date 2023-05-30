import { useRef } from 'react'
import { IBOIcon, ArrowRightIcon } from 'components/common/icons'
import { ROLES } from 'config/roles'
import { GTMTrack } from 'lib/utils/gtm'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const SelectRoleForIntegrousSignUp = () => {
  const router = useRouter()
  const { current: roles } = useRef([
    {
      icon: <IBOIcon classes='w-14 h-14' />,
      label: 'I’m a Customer',
      key: ROLES.integrousCustomer,
      link: `/auth/signup-integrous?role=${ROLES.integrousCustomer}`
    },

    {
      icon: <IBOIcon classes='w-14 h-14' />,
      label: 'I’m a Associate',
      key: ROLES.integrousAssociate,
      link: `/auth/signup-integrous?role=${ROLES.integrousAssociate}`
    }
  ])

  const onRoleClick = (role) => {
    GTMTrack.signUp(role.key)
    router.push(role.link)
  }

  return (
    <div className='text-center h-[85vh] flex flex-col justify-center items-center w-full'>
      <span className='text-3xl text-gray-800 font-bold'>Welcome To Snap Partners</span>
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
