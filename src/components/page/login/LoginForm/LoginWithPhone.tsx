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
import { InputPhone } from './utils/InputPhone'
import { RegisterPassword } from './utils/RegisterPassword'

export interface IDataForm {
  phoneExt: string
  phoneNumber: string
  password: string
  // rememberMe: boolean
}

export const LoginWithPhone = () => {
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors }, control } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)
    const phoneNumber = `+${dataForm.phoneNumber}`

    setLoading(true)

    const { data: dataLogin, error: errorLogin } = await login({
      phoneNumber,
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
    <div className='flex flex-col justify-start items-start gap-x-2 mb-2 mt-3 w-full'>
      <form className='mt-2 w-full' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex gap-x-2 justify-start items-center w-full'>
          <label htmlFor='phone' className='font-bold text-gray-700 uppercase text-sm'>
            Phone
          </label>
        </div>

        {(errors.phoneNumber || errors.phoneExt) && (
          <p className='text-sm text-red-400'>
            {errors.phoneNumber ? errors.phoneNumber.message : errors.phoneExt.message }
          </p>
        )}

        <div className='w-full flex justify-start items-center gap-x-2'>
          <InputPhone
            errors={errors}
            control={control}
          />
        </div>

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
