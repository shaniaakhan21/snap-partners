import React from 'react'
import { CheckIcon } from '../icons'

export const Stepper = ({ data }) => {
  const steppers = [
    { quantity: 0, label: 'PSMs left' },
    { quantity: 0, label: 'Orders left' },
    { quantity: 0, label: 'Legs left' },
  ]

  return (
    <div className='bg-white rounded-md col-span-2 md:col-span-1 row-span-2 md:col-start-1 p-4'>
      <ul className='flex flex-col justify-center items-start gap-y-6'>
        <li className='flex justify-start items-center gap-x-2'>
          <div className='w-6 h-6 bg-primary-500 rounded-md flex justify-center items-center'>
            <CheckIcon />
          </div>
          <span className='text-primary-500'>Done</span>
        </li>

        {
          steppers.map(stepper => (
            <li key={stepper.label} className='flex justify-start items-center gap-x-2'>
              <div className='w-6 h-6 bg-[#19191929] rounded-full'></div>
              <p>
                <span className='text-primary-500 font-bold'>{stepper.quantity}</span> {stepper.label}
              </p>
            </li>
          ))
        }
      </ul>

      {/* <div className='mt-6'>
        <span className='text-gray-400'>Last updated today 2:00pm</span>
      </div> */}
    </div>
  )
}
