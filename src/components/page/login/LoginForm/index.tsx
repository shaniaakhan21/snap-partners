import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { RegisterPassword } from './utils/RegisterPassword'
import { RememberAndPolicy } from './utils/RememberAndPolicy'
import { useAuthStore } from 'lib/stores'
import { login } from 'lib/services/session/login'
import { getUserMe } from 'lib/services/users/getUserMe'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { DynamicInput } from './DynamicInput'

export const LoginForm = () => {
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async ({ credentialProvider, password }: IDataForm) => {
    setLoading(true)

    const { data: dataLogin, error: errorLogin } = await login({
      username: credentialProvider,
      password
    })

    if (errorLogin) {
      handleFetchError(errorLogin.status, errorLogin.info)
      setLoading(false)
      return
    }

    const { data: dataUser, error: errorUser } = await getUserMe({ token: dataLogin.token })

    if (errorUser) {
      handleFetchError(errorUser.status, errorUser.info)
      setLoading(false)
      return
    }

    toast('Login Successful!', { type: 'success' })
    setLoading(false)
    setAuth({
      email: dataUser.email,
      name: dataUser.email,
      phone: dataUser.phoneNumber,
      accessToken: dataLogin.token,
      lastname: dataUser.lastname,
      roles: dataUser.roles,
      id: dataLogin.userId,
      username: dataUser.username,
      referralCode: dataUser.referralCode,
      idImage: dataUser.idImage,
      insuranceImage: dataUser.insuranceImage,
      isManager: dataUser.isManager,
      sponsorId: dataUser.sponsorId
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

      <form className='max-w-xs mt-2' onSubmit={handleSubmit(onSubmit)}>
        <DynamicInput
          reset={reset}
          errors={errors}
          register={register}
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
