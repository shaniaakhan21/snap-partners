import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { connectNsurAccount } from 'lib/services/nsur/connectNsurAccount'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { getMyPoints } from 'lib/services/nsur/getMyPoints'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { CheckTermsAndConditions } from 'components/common/CheckTermsAndConditions'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
import { InputBasicForm } from 'components/common/InputBasicForm'
import { Spinner } from 'components/common/loaders'
import { Button } from 'components/common/Button'

interface IDataFormConnectNsurAccount {
  email: string
  password: string
  termsAndConditions: boolean
}

interface IFormConnectNsurAccountProps {
  auth: IAuth
  setAuth: TSetAuth
}

export const FormConnectNsurAccount = ({ auth, setAuth }: IFormConnectNsurAccountProps) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<IDataFormConnectNsurAccount>()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (dataForm: IDataFormConnectNsurAccount) => {
    setLoading(true)
    const { data, error } = await connectNsurAccount(dataForm.email, dataForm.password)

    if (error) {
      handleFetchError(error.status, error.info)
      setLoading(false)
      return
    }

    const { data: dataMyPoints, error: errorMyPoints } = await getMyPoints(auth.id, auth.accessToken)

    if (errorMyPoints) {
      handleFetchError(errorMyPoints.status, errorMyPoints.info)
      setLoading(false)
      return
    }

    setAuth({
      ...auth,
      nsurAccount: {
        nsurUserId: data.nsurUserId,
        myPoints: dataMyPoints.totalAmount
      }
    })

    reset()
    setLoading(false)
    toast('Connected to NSUR - Completed', { type: 'success' })
  }

  if (loading) {
    return (
      <div className='w-full h-screen-80 flex justify-center items-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmit)}>
      <section className='text-center'>
        <h3 className='font-bold text-4xl'>Connect NSUR account</h3>
        <span className='text-lg font-semibold'>Enter you NSUR details</span>
      </section>

      <section className='mt-12'>
        <InputBasicForm
          id='email'
          isRequired
          name='email'
          type='email'
          label='EMAIL (SAME AS NSUR)'
          registerId='email'
          placeholder='Enter email'
          autoComplete='email'
          errors={errors.email}
          register={register}
          rulesForm={{
            required: { value: true, message: 'Email Required *' },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email *'
            }
          }}
        />

        <div>
          <label htmlFor='password' className='font-bold text-gray-700 uppercase text-sm'>
            NSUR Password <span className='text-red-500'>*</span>
          </label>

          {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}
          <div className='relative'>
            <input
              {...register('password', {
                required: { value: true, message: 'Password Required *' },
                maxLength: { value: 50, message: 'Max 100 Characters *' },
                minLength: { value: 3, message: 'Min 3 Characters *' }
              })}
              id='password'
              name='password'
              type={`${showPassword ? 'text' : 'password'}`}
              autoComplete='current-password'
              className='w-full pl-3 pr-14 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
              placeholder='Enter Password'
            />
            <div
              onClick={() => setShowPassword((prevState) => !prevState)}
              className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-0.5'
            >
              {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
            </div>
          </div>
        </div>

        <CheckTermsAndConditions
          errors={errors.termsAndConditions}
          register={register}
          rulesForm={{ required: { value: true, message: 'Terms And Conditions Required *' } }}
        />

        <Button type='submit' classes='mt-6'>
          Connect to nsur
        </Button>
      </section>
    </form>
  )
}
