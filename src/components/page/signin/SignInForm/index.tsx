import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuthStore } from 'lib/stores'
// import { fakeLogin } from 'lib/utils/fakeLogin'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from './utils/Input'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { signInRulesConfig } from './utils/formRules'
import { RegisterPassword } from './utils/RegisterPassword'
import { RememberAndPolicy } from './utils/RememberAndPolicy'
import { login } from 'lib/services/session/login'

export const SignInForm = () => {
  const { signIn } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)

    // ESTO HAY QUE CAMBIARLO
    const { data: { x }, error } = await login({
      username: 'admin1',
      password: '12345678'
    })

    if (error) {
      return toast(error, { type: 'error' })
    }

    const data = {
      email: 'test@gmail.com',
      name: 'test',
      phone: {
        number: '1234567'
      },
      accessToken: '123128312982321',
      refreshToken: '1232141241'
    }

    toast('¡Sign In Successful!', { type: 'success' })

    console.log('DATA:', x)
    console.log('ERROR:', error)

    signIn({
      email: data.email,
      name: data.name,
      phone: data.phone.number,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
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
          id='email'
          name='email'
          type='email'
          label='Email'
          registerId='email'
          placeholder='Enter Email'
          autoComplete='email'
          errors={errors.email}
          register={register}
          rulesForm={signInRulesConfig.email}
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
