import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from './utils/Input'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { signInRulesConfig } from './utils/formRules'
import { RegisterPassword } from './utils/RegisterPassword'
import { RememberAndPolicy } from './utils/RememberAndPolicy'
import { useAuthStore } from 'lib/stores'
import { login } from 'lib/services/session/login'

export const LoginForm = () => {
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async ({ username, password }: IDataForm) => {
    setLoading(true)

    const { data, error } = await login({
      username,
      password
    })

    if (error) {
      toast(error.message, { type: 'error' })
      setLoading(false)
      return
    }

    toast('Login Successful!', { type: 'success' })
    setLoading(false)
    setAuth({
      email: data.email,
      name: data.email,
      phone: data.phoneNumber,
      accessToken: data.token,
      iat: data.iat,
      lastname: data.lastname,
      roles: data.roles,
      id: data.userId,
      username: data.username,
      referralCode: data.referralCode
    })
    reset()
  }

  if (isLoading) {
    return <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
  }

  return (
    <div>
      <span className='sm:hidden font-bold text-4xl text-[#18203F]'>SnapDelivered</span>
      <span className='hidden sm:block font-bold text-4xl text-[#18203F]'>Login</span>
      <p className='text-gray-500'>Welcome! Login to continue.</p>

      <form className='max-w-xs mt-6' onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          id='username'
          name='username'
          type='text'
          label='Username'
          registerId='username'
          placeholder='Enter Username'
          autoComplete='username'
          errors={errors.username}
          register={register}
          rulesForm={signInRulesConfig.username}
        />

        <RegisterPassword
          errors={errors}
          register={register}
        />

        <RememberAndPolicy
          register={register}
        />

        <section className='mt-4 text-center sm:text-left'>
          <Button type='submit' classes='w-full mr-1 text-sm bg-primary-500'>
            Login
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Don’t have an account?</span>
            <Link href='/auth/signup'>
              <a className='text-textAcent-500'> Sign Up.</a>
            </Link>
          </p>
        </section>

        <RRSSAuth />
      </form>
    </div>
  )
}
