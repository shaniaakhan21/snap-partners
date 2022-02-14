import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ReactCodeInput from 'react-verification-code-input'

import { STEPS } from '.'
import { IHandleStep } from '../types'
import { fakeVerifyCode } from '../fakeVerifyCode'
import { Spinner } from 'components/common/loaders'
import { BulletPagination } from './BulletPagination'

interface IDataFormVerifyCode {
  code: string
}

export const VerifyCode = ({ handleStep }: { handleStep: IHandleStep }) => {
  const { handleSubmit } = useForm<IDataFormVerifyCode>()
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)

  const onSubmit = async (code) => {
    setIsVerifyingCode(true)
    console.log(code)

    fakeVerifyCode(code)
      .then(() => {
        handleStep(STEPS.SUCCESS_CODE)
        toast('Code Verified', { type: 'success' })
      })
      .catch(() => toast('Incorrect Code', { type: 'error' }))
      .finally(() => setIsVerifyingCode(false))
  }

  if (isVerifyingCode) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <form className='max-w-sm mt-6 text-center' onSubmit={handleSubmit(onSubmit)}>
        <span className='text-4xl font-bold'>Verify Code</span>

        <div className='mt-4'>
          <ReactCodeInput
            fields={6}
            className='custom__reactCodeInput'
            disabled={isVerifyingCode}
            onComplete={onSubmit}
          />
        </div>

        <div className='mt-4'>
          <BulletPagination stepToActivate='VERIFY_CODE' />
        </div>
      </form>
    </div>
  )
}
