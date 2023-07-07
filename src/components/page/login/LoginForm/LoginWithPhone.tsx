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
import { InputPhone } from './utils/InputPhone'
import { RegisterPassword } from './utils/RegisterPassword'
import { useRouter } from 'next/router'
import { getLocalStorage, removeLocalStorage } from 'lib/utils/localStorage'

export interface IDataForm {
  phoneExt: string
  phoneNumber: string
  password: string
  // rememberMe: boolean
}

interface IProps {
  trackLoginHandle: (beforeLogin) => void
}

export const LoginWithPhone = ({ trackLoginHandle }: IProps) => {
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors }, control } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    trackLoginHandle(true)
    setLoading(true)
    const phoneNumber = `+${dataForm.phoneNumber}`

    const { data: dataLogin, error: errorLogin } = await login({
      phoneNumber,
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
    if (router.query.redirectToIntegrous || redirectToIntegrous === true) {
      removeLocalStorage('redirectToIntegrous')
      removeLocalStorage('redirectToIntegrousReferralCode')
      // eslint-disable-next-line no-return-assign
      setTimeout(() => window.location.href = `https://www.integrouswellness.com/${redirectToIntegrousReferralCode}?access_token=${dataLogin.token}`, 1000)
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
      driver_status: data.driver_status,
      idImage: data.idImage,
      insuranceImage: data.insuranceImage,
      profileImage: data.profileImage,
      isManager: data.ranks?.type === 'manager',
      createdAt: data.createdAt,
      ownerName: data.ownerName,
      ranks: data.ranks,
      updatedAt: data.updatedAt,
      blocked: data.blocked,
      deleted: data.deleted,
      nsurAccount: {
        nsurUserId: data.nsurUserId,
        myPoints: null
      },
      bank_information: data.bank_information
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
  const signupURL = router.pathname === '/auth/login-integrous' ? `/auth/signup-integrous?referralCode=${referralCode}` : '/auth/signup'

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
            <Link href={signupURL}>
              <a className='text-textAcent-500'> Sign Up.</a>
            </Link>
          </p>
        </section>
      </form>
    </div>
  )
}
