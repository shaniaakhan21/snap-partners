import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
import { useState } from 'react'
import { useTranslation } from 'next-i18next'

interface IInputFormProps {
  register: UseFormRegister<any>,
  errors: any,
  rulesPasswordForm: FieldErrors
  rulesConfirmPasswordForm: FieldErrors
}

export const RegisterPassword = ({ register, errors, rulesPasswordForm, rulesConfirmPasswordForm }: IInputFormProps) => {
  const { t } = useTranslation()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className='w-full'>
        <label htmlFor='password' className='font-bold text-gray-700 uppercase text-sm'>{t('auth:signup.form.password.label')}<span className='text-red-500'>*</span>
        </label>
        {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}

        <div className='relative'>
          <input
            {...register('password', rulesPasswordForm)}
            id='password'
            name='password'
            type={`${showPassword ? 'text' : 'password'}`}
            autoComplete='current-password'
            className='w-full pl-3 pr-14 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder={t('auth:signup.form.password.placeholder')}
          />
          <div
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-0.5'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </div>
        </div>
      </div>

      <div className='w-full'>
        <label htmlFor='confirmPassword' className='font-bold text-gray-700 uppercase text-sm'>{t('auth:signup.form.confirmPassword.label')}<span className='text-red-500'>*</span>
        </label>
        {errors.confirmPassword && <p className='text-sm text-red-400'>{errors.confirmPassword.message}</p>}

        <div className='relative'>
          <input
            {...register('confirmPassword', rulesConfirmPasswordForm)}
            id='confirmPassword'
            name='confirmPassword'
            type={`${showPassword ? 'text' : 'password'}`}
            autoComplete='current-password'
            className='w-full pl-3 pr-14 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder={t('auth:signup.form.confirmPassword.placeholder')}
          />
          <div
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-0.5'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </div>
        </div>
      </div>

    </>
  )
}
