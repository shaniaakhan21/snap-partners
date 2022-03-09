import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { login } from 'lib/services/session/login'
import { getUserMe } from 'lib/services/users/getUserMe'
import { useAuthStore } from 'lib/stores'
import { handleFetchError } from 'lib/utils/handleFetchError'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { InputForm } from './utils/Input'
import { RegisterPassword } from './utils/RegisterPassword'
export interface IDataForm {
  email: string
  password: string
  // rememberMe: boolean
}

export const LoginWithEmail = () => {
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)

    setLoading(true)

    const { data: dataLogin, error: errorLogin } = await login({
      email: dataForm.email,
      password: dataForm.password
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
      name: dataUser.name,
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
    return (
      <div className='flex items-center justify-center w-full h-full mt-6'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  return (
    <div className='flex flex-col justify-start items-start gap-x-2 my-2'>
      <form className='w-full mt-2' onSubmit={handleSubmit(onSubmit)}>
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
          rulesForm={{
            required: { value: true, message: 'Email Required *' },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email *'
            }
          }}
        />

        <RegisterPassword
          errors={errors}
          register={register}
        />

        {/* <RememberAndPolicy
          register={register}
        /> */}

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
      </form>
    </div>
  )
}
