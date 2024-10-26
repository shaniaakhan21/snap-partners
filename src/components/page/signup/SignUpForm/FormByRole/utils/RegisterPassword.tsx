import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
import { useState } from 'react'

interface IInputFormProps {
  register: UseFormRegister<any>,
  errors: any,
  rulesPasswordForm: FieldErrors
  rulesConfirmPasswordForm: FieldErrors
}

export const RegisterPassword = ({ register, errors, rulesPasswordForm, rulesConfirmPasswordForm }: IInputFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className='w-full'>
        <label htmlFor='password' className='font-semibold text-gray-600 text-md'>
          Password <span className='text-red-500'>*</span>
        </label>
        {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}

        <div className='relative'>
          <input
            {...register('password', rulesPasswordForm)}
            id='password'
            name='password'
            type={`${showPassword ? 'text' : 'password'}`}
            autoComplete='current-password'
            className='w-full pl-3 pr-14 py-1 my-2 text-base text-black bg-white border-2 border-gray-200 rounded-lg outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-10 transition-colors duration-200 ease-in-out placeholder:text-black'
            placeholder='Enter Password'
          />
          <div
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-1.5'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </div>
        </div>
      </div>

      <div className='w-full mt-3'>
        <label htmlFor='confirmPassword' className='font-semibold text-gray-600 text-md'>
          Confirm Password <span className='text-red-500'>*</span>
        </label>
        {errors.confirmPassword && <p className='text-sm text-red-400'>{errors.confirmPassword.message}</p>}

        <div className='relative'>
          <input
            {...register('confirmPassword', rulesConfirmPasswordForm)}
            id='confirmPassword'
            name='confirmPassword'
            type={`${showPassword ? 'text' : 'password'}`}
            autoComplete='current-password'
            className='w-full pl-3 pr-14 py-1 my-2 text-base text-black bg-white border-2 border-gray-200 rounded-lg outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-10 transition-colors duration-200 ease-in-out placeholder:text-black'
            placeholder='Confirm Password'
          />
          <div
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-1.5'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </div>
        </div>
      </div>

    </>
  )
}
