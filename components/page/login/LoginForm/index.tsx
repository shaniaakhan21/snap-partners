import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuthStore } from 'lib/stores'
import { fakeLogin } from 'lib/utils/fakeLogin'
import { loginRulesConfig } from './formRules'

import { Button } from 'components/common/Button'
import { EyeHiddenIcon, EyeVisibleIcon, FacebookColorIcon, GoogleColorIcon, TwitterColorIcon } from 'components/common/icons'
import { Spinner } from 'components/common/loaders'

interface IDataForm {
  email: string
  password: string
  rememberMe: boolean
  privacyPolicy: boolean
}

export const LoginForm = () => {
  const { signIn } = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)

    setTimeout(async () => { // Simulate latency
      const { data, error } = await fakeLogin()

      setLoading(false)

      if (error) {
        return toast(error, { type: 'error' })
      }

      toast('¡Sign In Successful!', { type: 'success' })
      signIn({
        email: data.email,
        name: data.name,
        phone: data.phone.number,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      })
      reset()
    }, 2000)
  }

  if (isLoading) {
    return (<Spinner />)
  }

  return (
    <div>
      <span className='sm:hidden font-bold text-4xl text-[#18203F]'>SnapDelivered</span>
      <span className='hidden sm:block font-bold text-4xl text-[#18203F]'>Log In</span>
      <p className='text-gray-500'>Welcome! Log in to continue.</p>

      <form className='max-w-xs mt-6' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email' className='font-bold text-gray-700 text-sm uppercase'>Email</label>
          <input
            {...register('email', loginRulesConfig.email)}
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
            placeholder='Enter Email'
          />
          {errors.email && <p className='text-sm text-red-400'>{errors.email.message}</p> }
        </div>

        <div>
          <div className='w-full flex justify-between items-center text-sm'>
            <label htmlFor='password' className='font-bold text-gray-700 uppercase'>Password</label>
            <span className='text-textAcent-500 cursor-pointer'>Forgot Password?</span>
          </div>

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
            {errors.password && (
              <p className='text-sm text-red-400'>{errors.password.message}</p>
            )}
          </div>
        </div>

        <section className='space-y-2 mt-4 text-gray-800'>
          <div className='flex items-center justify-start'>
            <input
              {...register('rememberMe')}
              id='rememberMe'
              name='rememberMe'
              type='checkbox'
              defaultChecked={false}
              className='accent-primary-500'
            />

            <label htmlFor='rememberMe' className='ml-2 text-xs'>Remember me</label>
          </div>

          <div className='flex items-center justify-start'>
            <input
              {...register('privacyPolicy')}
              id='privacyPolicy'
              name='privacyPolicy'
              type='checkbox'
              defaultChecked={false}
              className='accent-primary-500'
            />

            <label htmlFor='privacyPolicy' className='ml-2 text-xs'>I agree to the Trems of Service and Privacy Policy</label>
          </div>
        </section>

        <section className='mt-4 text-center sm:text-left'>
          <Button type='submit' classes='w-full mr-1 text-sm bg-primary-500'>
            Log In
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Don’t have an account?</span>
            <Link href='/auth/register'>
              <a className='text-textAcent-500'> Sign Up.</a>
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

          <ul className='flex flex-col sm:flex-row justify-between items-center gap-x-2 gap-y-4 mt-8'>
            <li className='border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100 w-full sm:w-fit flex justify-center items-center'>
              <FacebookColorIcon />
            </li>
            <li className='border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100 w-full sm:w-fit flex justify-center items-center'>
              <GoogleColorIcon />
            </li>
            <li className='border border-solid border-300 rounded-sm px-8 py-2 hover:cursor-pointer hover:bg-gray-100 w-full sm:w-fit flex justify-center items-center'>
              <TwitterColorIcon />
            </li>
          </ul>
        </section>
      </form>
    </div>
  )
}
