import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { API } from 'config/api'
import { useAuthStore } from 'lib/stores'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from './utils/Input'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { signInRulesConfig } from './utils/formRules'
import { RegisterPassword } from './utils/RegisterPassword'
import { RememberAndPolicy } from './utils/RememberAndPolicy'

export const SignInForm = () => {
  const { signIn } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async ({ username, password }: IDataForm) => {
    setLoading(true)

    const res = await fetch(`${API.BASE_URL}/api/authentication/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    }).finally(() => setLoading(false))

    if (!res.ok) {
      return toast(`Credentials Error ${res.status}`, { type: 'error' })
    }

    const { data } = await res.json()

    toast('¡Sign In Successful!', { type: 'success' })
    signIn({
      email: 'user@test.com',
      name: 'user test',
      phone: '+15555555555',
      accessToken: data.token,
      refreshToken: 'refreshToken'
    })
    reset()
  }

  if (isLoading) {
    return <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
  }

  return (
    <div>
      <span className='sm:hidden font-bold text-4xl text-[#18203F]'>SnapDelivered</span>
      <span className='hidden sm:block font-bold text-4xl text-[#18203F]'>Log In</span>
      <p className='text-gray-500'>Welcome! Log in to continue.</p>

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
            Sign In
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
