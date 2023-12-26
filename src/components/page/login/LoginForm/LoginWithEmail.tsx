import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { login } from 'lib/services/auth/login'
import { getUserMe } from 'lib/services/user/getUserMe'
import { useAuthStore, useModalStore, MODALS_ID } from 'lib/stores'
import { handleFetchError } from 'lib/utils/handleFetchError'
import Link from 'next/link'
import { useRef, useState } from 'react'
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
  const router = useRouter()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const { openModal, addModal } = useModalStore()

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
    const { redirectToIntegrousWellness, referralCode } = router.query
    if (redirectToIntegrousWellness === 'true') {
      removeLocalStorage('redirectToIntegrousWellness')
      removeLocalStorage('redirectToIntegrousReferralCode')
      window.location.href = `/wellness?referralCode=${referralCode}`
      return
    }

    const { redirectToWeightCare } = router.query
    if (redirectToWeightCare === 'true') {
      removeLocalStorage('redirectToWeightCare')
      window.location.href = `/WeightCare?referralCode=${referralCode}`
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
      isCertified: data.isCertified,
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

  const referralCode = router.query.referralCode || 'IntegrousWellness'
  const redirectToWeightCare = router.query.redirectToWeightCare === 'true'
  const redirectToIntegrousWellness = router.query.redirectToIntegrousWellness === 'true'
  const signupURL = router.pathname === '/auth/login-integrous'
    ? `/auth/signup-integrous?referralCode=${referralCode}`
    : redirectToWeightCare
      ? `/auth/signup-wellness?referralCode=${referralCode}&redirectToWeightCare=true`
      : redirectToIntegrousWellness
        ? `/auth/signup-wellness?referralCode=${referralCode}&redirectToIntegrousWellness=true`
        : '/auth/signup'

  return (
    <div className='flex flex-col justify-start items-start gap-x-2 mb-2 mt-3 w-full'>
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

        <section className='mt-5 text-center sm:text-left'>
          <div className='flex'>
            <button
              type='button'
              className='text-primary-500 font-semibold underline decoration-1 text-left text-sm sm:text-base'
              onClick={() => openModal(MODALS_ID.MODAL_FORGOT_PASSWORD_ID)}
            >
                      Forgot Password?
            </button>

            <Button type='submit' classes='w-auto text-mg bg-primary-500 font-semibold uppercase ml-auto'>
                    Sign in
            </Button>
          </div>

          <div className='mt-8 text-center'>
            <span className='font-semibold text-gray-600 text-sm sm:text-base'>Don’t have an account?</span>
            <Link href={signupURL}>
              <a className='text-primary-500 font-semibold text-xl underline decoration-1 ml-2 hover:text-black'>Sign Up</a>
            </Link>
          </div>
          {/*
          <div className='mt-8 text-center items-center'>
            {Apps.map(app => (
              <Link key={app.to} href={app.to}>
                <a className='mx-2'>
                  {app.icon}
                </a>
              </Link>
            ))}
          </div> */}

        </section>
      </form>
    </div>
  )
}
