import { useRef } from 'react'
import { STEPS } from './index'
import { TStepsKey } from '../types'

export const BulletPagination = ({ stepToActivate }: { stepToActivate: TStepsKey }) => {
  const { current: steps } = useRef(Object.keys(STEPS))

  return (
    <div className='flex justify-center items-center gap-x-3 mt-6'>
      {
        steps.map((step, idx) => {
          if (idx === 0 || idx === 1) {
            return step === stepToActivate
              ? <div key={step} className='h-2.5 w-8 bg-primary-500 rounded-lg' />
              : <div key={step} className='h-2.5 w-8 bg-gray-200 rounded-lg' />
          } else return null
        })
      }
    </div>
  )
}
