import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from 'components/common/Button'
import { EyeHiddenIcon, EyeVisibleIcon, FacebookColorIcon, GoogleColorIcon, TwitterColorIcon } from 'components/common/icons'
import { loginRulesConfig } from './formRules'
import Link from 'next/link'
import { useAuthStore } from 'lib/stores'
import { toast } from 'react-toastify'
import { Spinner } from 'components/common/loaders'
import { fakeLogin } from 'lib/utils/fakeLogin'

interface IDataForm {
  email: string
  confirmEmail: string
  name: string
  phone: string
  password: string
  confirmPassword: string
  rememberMe: boolean
  termsAndConditions: boolean
}

interface IRegisterFromProps {
  referralLink: string | string[]
  identity: string | string[] | null
}

export const RegisterForm = ({ referralUser }: { referralUser?: IRegisterFromProps }) => {
  const { createAccout } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)
    const { data, error } = await fakeLogin()

    setLoading(false)

    if (error) {
      return toast(error, { type: 'error' })
    }

    toast('¡Sign In Successful!', { type: 'success' })
    console.log('registerForm onSubmit referralUser', referralUser)
    createAccout({
      email: data.email,
      name: data.name,
      phone: data.phone.number,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })
    reset()
  }

  if (isLoading) {
    return (<Spinner />)
  }

  return (
    <div>
      <span className='font-bold text-4xl text-[#18203F]'>Sign up!</span>
      <p>As {referralUser?.identity}</p>
      <p className='text-gray-500'>Welcome! register to continue.</p>

      <form className='max-w-xs mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email' className='font-bold text-gray-700 uppercase text-sm'>Email</label>
          {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p>}

          <input
            {...register('email', loginRulesConfig.email)}
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='Enter Email'
          />
        </div>

        <div>
          <label htmlFor='confirmEmail' className='font-bold text-gray-700 uppercase text-sm'>Confirm Email</label>
          {errors.confirmPassword && <p className='text-sm text-red-400'>{errors.confirmPassword.message}</p>}

          <input
            {...register('confirmEmail', loginRulesConfig.confirmPassword)}
            id='confirmEmail'
            name='confirmEmail'
            type='email'
            autoComplete='email'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='Confirm Email'
          />
        </div>

        <div>
          <label htmlFor='name' className='font-bold text-gray-700 uppercase text-sm'>Name</label>
          {errors.name && <p className='text-sm text-red-400'>{errors.name.message}</p>}

          <input
            {...register('name', loginRulesConfig.name)}
            id='name'
            name='name'
            type='text'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='Enter Name'
          />
        </div>

        <div>
          <label htmlFor='phone' className='font-bold text-gray-700 uppercase text-sm'>Phone Number</label>
          {errors.phone && <p className='text-sm text-red-400'>{errors.phone.message}</p>}

          <input
            {...register('phone', loginRulesConfig.phone)}
            id='phone'
            name='phone'
            type='tel'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='+34 0000 0000 '
          />
        </div>

        <div>
          <label htmlFor='password' className='font-bold text-gray-700 uppercase text-sm'>Password</label>
          {errors.password && <p className='text-sm text-red-400'>{errors.password.message}</p>}

          <div className='relative'>
            <input
              {...register('password', loginRulesConfig.password)}
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

        <div>
          <label htmlFor='confirmPassword' className='font-bold text-gray-700 uppercase text-sm'>Confirm Password</label>
          {errors.confirmEmail && <p className='text-sm text-red-400'>{errors.confirmEmail.message}</p>}

          <div className='relative'>
            <input
              {...register('confirmPassword', loginRulesConfig.confirmEmail)}
              id='confirmPassword'
              name='confirmPassword'
              type={`${showPassword ? 'text' : 'password'}`}
              autoComplete='current-password'
              className='w-full pl-3 pr-14 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
              placeholder='Confirm Password'
            />
            <div
              onClick={() => setShowPassword((prevState) => !prevState)}
              className='cursor-pointer absolute right-4 mr-0.5 top-3.5 mt-0.5'
            >
              {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
            </div>
          </div>
        </div>

        <section className='space-y-2 mt-4 text-gray-800'>
          <div className='flex items-center justify-start'>
            <input
              {...register('termsAndConditions', loginRulesConfig.termsAndConditions)}
              id='termsAndConditions'
              name='termsAndConditions'
              type='checkbox'
              defaultChecked={false}
            />

            <label htmlFor='termsAndConditions' className='ml-2 text-xs'>
              Agree to {' '}
              <Link href='/auth/register'>
                <a className='text-textAcent-500 font-semibold'>Terms and Conditions</a>
              </Link>
            </label>
          </div>

          {errors.termsAndConditions && <p className='text-sm text-red-400'>{errors.termsAndConditions.message}</p>}
        </section>

        <section className='mt-4'>
          <Button type='submit' classes='w-full mr-1 text-sm bg-primary-500'>
            Log In
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Already have an accout?</span>
            <Link href='/auth/login'>
              <a className='text-textAcent-500'> Log In.</a>
            </Link>
          </p>
        </section>

        <section className='mt-8'>
          <div className='w-full flex justify-center items-center space-x-2'>
            <div className='w-full h-0.5 border-[0.5px] border-solid border-gray-200'></div>

            <div>
              <span>Or</span>
            </div>

            <div className='w-full h-0.5 border-[0.5px] border-solid border-gray-200'></div>
          </div>

          <ul className='w-full flex flex-wrap justify-between items-center gap-x-2 gap-y-4 mt-8'>
            <li className='border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100'>
              <FacebookColorIcon />
            </li>
            <li className='border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100'>
              <GoogleColorIcon />
            </li>
            <li className='border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100'>
              <TwitterColorIcon />
            </li>
          </ul>
        </section>
      </form>
    </div>
  )
}
