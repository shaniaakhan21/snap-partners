import { UseFormRegister } from 'react-hook-form'
import { IDataForm } from './types'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
import { useState } from 'react'
import { signInRulesConfig } from './formRules'

interface IInputFormProps {
  register: UseFormRegister<IDataForm>,
  errors: any,
}

export const RegisterPassword = ({ register, errors }: IInputFormProps) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <div className='w-full flex justify-between items-center text-sm'>
        <div>
          <label htmlFor='password' className='font-bold text-gray-700 uppercase'>Password</label>
          {errors.password && (
            <p className='text-sm text-red-400'>{errors.password.message}</p>
          )}
        </div>
        <span className='text-textAcent-500 cursor-pointer'>Forgot Password?</span>
      </div>

      <div className='relative'>
        <input
          {...register('password', signInRulesConfig.password)}
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
  )
}
