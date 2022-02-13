import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { useAuthStore } from 'lib/stores'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'

import { IHandleStep } from '../types'

interface IDataFormStepTwo {
  code1: string
  code2: string
  code3: string
  code4: string
  code5: string
  code6: string
}

export const StepTwo = ({ handleStep }: { handleStep: IHandleStep }) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataFormStepTwo>()
  const [isLoading, setLoading] = useState(false)
  const { createAccout } = useAuthStore()

  const onSubmit = async (dataForm) => {
    setLoading(true)
    console.log(dataForm)

    setTimeout(() => {
      setLoading(false)
      handleStep('FINISH')
    }, 2000)
  }

  const handleOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-screen md:w-full'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  return (
    <div>
      <form className='max-w-xs mt-6 text-center' onSubmit={handleSubmit(onSubmit)}>
        <span className='text-4xl font-bold'>Verify Code</span>
        {
          (errors.code1 || errors.code2 || errors.code3 || errors.code4 || errors.code5 || errors.code6) && (
            <p className='text-sm text-red-400'>
              {
                errors.code1?.message ||
                errors.code2?.message ||
                errors.code3?.message ||
                errors.code4?.message ||
                errors.code5?.message ||
                errors.code6?.message
              }
            </p>
          )
        }

        <div className='flex justify-center items-center gap-x-2 mt-4'>
          {
            ['1', '2', '3', '4', '5', '6'].map((item: '1' | '2' | '3' | '4' | '5' | '6') => (
              <input
                {...register(`code${item}`, { required: { value: true, message: 'Code required *' } })}
                key={item}
                className='w-full px-3 py-3 my-2 text-4xl text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
                placeholder='0'
                onKeyPress={handleOnlyNumbers}
                maxLength={1}
              />
            ))
          }
        </div>

        <Button type='submit' classes='w-full mt-4'>
          Verify Code
        </Button>
      </form>
    </div>
  )
}
