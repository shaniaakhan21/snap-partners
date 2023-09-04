import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { login } from 'lib/services/auth/login'
import { getUserMe } from 'lib/services/user/getUserMe'
import { useAuthStore } from 'lib/stores'
import { handleFetchError } from 'lib/utils/handleFetchError'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { InputForm } from './utils/Input'
import { RegisterPassword } from './utils/RegisterPassword'
import { useRouter } from 'next/router'
import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'
import { builderWebsiteFields } from '../../../../lib/types/user/profile'
export interface IDataForm {
  email: string
  password: string
  // rememberMe: boolean
}

interface IProps {
  trackLoginHandle: (beforeLogin) => void
}

export const LoginWithEmail = ({ trackLoginHandle }: IProps) => {
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    trackLoginHandle(true)
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

    const { data, error: errorUser } = await getUserMe({ token: dataLogin.token })

    if (errorUser) {
      handleFetchError(errorUser.status, errorUser.info)
      setLoading(false)
      return
    }

    const redirectToIntegrous = getLocalStorage('redirectToIntegrous')
    const redirectToIntegrousReferralCode = getLocalStorage('redirectToIntegrousReferralCode')
    if (redirectToIntegrous === true) {
      removeLocalStorage('redirectToIntegrous')
      removeLocalStorage('redirectToIntegrousReferralCode')
      window.location.href = `/wellness/${redirectToIntegrousReferralCode}?access_token=${dataLogin.token}`
      return
    }

    const redirectToWellness = getLocalStorage('redirectToWellness')
    const redirectToWellnessReferralCode = getLocalStorage('redirectToWellnessReferralCode')
    if (redirectToWellness === true) {
      removeLocalStorage('redirectToWellness')
      removeLocalStorage('redirectToWellnessReferralCode')
      window.location.href = `https://www.snapdelivered.com/wellness${redirectToWellnessReferralCode}?access_token=${dataLogin.token}`
      return
    }

    toast('Login Successful!', { type: 'success' })
    trackLoginHandle(false)
    setLoading(false)
    setAuth({
      socialSecurityNumber: data.socialSecurityNumber,
      email: data.email,
      name: data.name,
      password: data.password,
      phoneNumber: data.phoneNumber,
      accessToken: dataLogin.token,
      lastname: data.lastname,
      roles: data.roles,
      id: dataLogin.userId,
      username: data.username,
      referralCode: data.referralCode,
      idImage: data.idImage,
      driver_status: data.driver_status,
      insuranceImage: data.insuranceImage,
      profileImage: data.profileImage,
      isManager: data.ranks?.type === 'manager',
      createdAt: data.createdAt,
      ownerName: data.ownerName,
      ranks: data.ranks,
      updatedAt: data.updatedAt,
      blocked: data.blocked,
      deleted: data.deleted,
      bank_information: data.bank_information,
      nsurAccount: {
        nsurUserId: data.nsurUserId,
        myPoints: null
      },
      level: data?.level,
      ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
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

  const router = useRouter()
  const referralCode = router.query.referralCode || 'IntegrousWellness'
  const signupURL =
  router.pathname === '/auth/login-integrous'
    ? `/auth/signup-integrous?referralCode=${referralCode}`
    : router.pathname === '/auth//login-wellness'
      ? `/auth/signup-wellness?referralCode=${referralCode}`
      : '/auth/signup'

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
            <Link href={signupURL}>
              <a className='text-textAcent-500'> Sign Up.</a>
            </Link>
          </p>
        </section>
      </form>
    </div>
  )
}
