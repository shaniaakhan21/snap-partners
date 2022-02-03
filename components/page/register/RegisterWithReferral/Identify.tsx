import { IBOIcon, DriverIcon, RestaurantsIcon, ArrowRightIcon } from 'components/common/icons'
import Link from 'next/link'
import { useRef } from 'react'

export const Identify = ({ handlerIdentify }: { handlerIdentify: (identidy: string) => void }) => {
  const { current: identities } = useRef([
    {
      icon: <IBOIcon classes='w-14 h-14' />,
      label: 'I’m Customer',
      key: 'CUSTOMER'
    },
    {
      icon: <RestaurantsIcon classes='w-14 h-14' />,
      label: 'I have a Restaurant',
      key: 'RESTAURANT'
    },
    {
      icon: <DriverIcon classes='w-14 h-14' />,
      label: 'I’m a Driver',
      key: 'DRIVER'
    }
  ])

  return (
    <div className='text-center'>
      <span className='text-3xl text-gray-800 font-bold'>Tell us what’s your situation</span>

      <ul className='flex flex-col justify-center items-center my-4 gap-y-4'>
        {
          identities.map(identity => (
            <li key={identity.key} className='max-w-xs w-full bg-gray-200 hover:bg-gray-300 rounded-md'>
              <button
                onClick={() => handlerIdentify(identity.key)}
                className='w-full py-4 px-5 flex justify-between items-center gap-x-8'
              >
                {identity.icon}

                <div className='flex justify-end items-center'>
                  <span className='text-lg font-bold text-gray-800'>{identity.label}</span>
                  <ArrowRightIcon classes='mt-0.5' />
                </div>
              </button>
            </li>
          ))
        }
      </ul>

      <p>
        <span className='font-normal text-gray-800'>Already have an accout?</span>
        <Link href='/auth/login'>
          <a className='text-textAcent-500'> Sign In.</a>
        </Link>
      </p>
    </div>
  )
}
