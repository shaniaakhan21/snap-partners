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
import { useTranslation } from "next-i18next";

export interface IDataForm {
  username: string
  password: string
  // rememberMe: boolean
}

interface IProps {
  trackLoginHandle: (beforeLogin) => void
}

export const LoginWithUsername = ({ trackLoginHandle }: IProps) => {
  const { t } = useTranslation()
  const { setAuth } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    trackLoginHandle(true)
    setLoading(true)

    const { data: dataLogin, error: errorLogin } = await login({
      username: dataForm.username,
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
      window.location.href = `https://www.integrouswellness.com/${redirectToIntegrousReferralCode}?access_token=${dataLogin.token}`
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
  const signupURL = router.pathname === '/auth/login-integrous' ? '/auth/signup-integrous' : '/auth/signup'

  return (
    <div className='flex flex-col justify-start items-start gap-x-2 my-2'>
      <form className='w-full mt-2' onSubmit={handleSubmit(onSubmit)}>
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
          rulesForm={{
            required: { value: true, message: 'Username Required *' },
            maxLength: { value: 50, message: 'Max 50 Characters *' },
            minLength: { value: 3, message: 'Min 3 Characters *' },
            pattern: { value: /^[a-zA-Z0-9!@#$%\\^&*)(+=._-]*$/, message: 'Username not allow *' }
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
            {t('auth:login')}
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>{t('auth:dont-have-an-account')}</span>
            <Link href={signupURL}>
              <a className='text-textAcent-500'>{t('auth:dont-have-an-account-sign-up')}</a>
            </Link>
          </p>
        </section>
      </form>
    </div>
  )
}
