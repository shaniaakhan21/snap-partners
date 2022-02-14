import { useRef } from 'react'
import { STEPS } from './index'
import { TStepsKey } from '../types'

export const BulletPagination = ({ stepToActivate }: { stepToActivate: TStepsKey }) => {
  const { current: steps } = useRef(Object.keys(STEPS))

  return (
    <div className='flex justify-center items-center gap-x-3'>
      {
        steps.map((step, idx) => {
          if (idx === 0 || idx === 1) {
            return step === stepToActivate
              ? <div key={step} className='h-2.5 w-2.5 bg-primary-500 rounded-full' />
              : <div key={step} className='h-2.5 w-2.5 bg-gray-300 rounded-full' />
          } else return null
        })
      }
    </div>
  )
}
