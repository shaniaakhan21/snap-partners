import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from 'components/common/Button'
import { registerRulesConfig } from './formRules'
import { useAuthStore } from 'lib/stores'
import { toast } from 'react-toastify'
import { Spinner } from 'components/common/loaders'
import { fakeLogin } from 'lib/utils/fakeLogin'
import { InputForm } from './Input'
import { IDataForm, IRegisterFromProps } from './types'
import { RegisterPassword } from './RegisterPassword'
import { TermsAndConditions } from './TermsAndConditions'
import { RRSSAuth } from './RRSSAuth'

export const RegisterForm = ({ referralUser }: { referralUser?: IRegisterFromProps }) => {
  const { createAccout } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)
    const { data, error } = await fakeLogin()

    setLoading(false)

    if (error) {
      return toast(error, { type: 'error' })
    }

    toast('¡Sign In Successful!', { type: 'success' })
    console.log('registerForm onSubmit referralUser', referralUser)
    createAccout({
      email: data.email,
      name: data.name,
      phone: data.phone.number,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    })
    reset()
  }

  if (isLoading) {
    return (<Spinner />)
  }

  return (
    <div>
      <span className='font-bold text-4xl text-[#18203F]'>Sign up!</span>
      <p>As {referralUser?.identity}</p>
      <p className='text-gray-500'>Welcome! register to continue.</p>

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
          rulesForm={registerRulesConfig.email}
        />

        <InputForm
          id='confirmEmail'
          name='confirmEmail'
          type='email'
          label='confirmEmail'
          registerId='confirmEmail'
          placeholder='Confirm Email'
          autoComplete='email'
          errors={errors.confirmEmail}
          register={register}
          rulesForm={registerRulesConfig.confirmEmail}
        />

        <InputForm
          id='name'
          name='name'
          type='text'
          label='Name'
          registerId='name'
          placeholder='Enter Name'
          errors={errors.name}
          register={register}
          rulesForm={registerRulesConfig.name}
        />

        <InputForm
          id='phone'
          name='phone'
          type='tel'
          label='Phone Number'
          registerId='phone'
          placeholder='+34 0000 0000 '
          errors={errors.phone}
          register={register}
          rulesForm={registerRulesConfig.phone}
        />

        <RegisterPassword
          errors={errors}
          register={register}
          rulesPasswordForm={registerRulesConfig.password}
          rulesConfirmPasswordForm={registerRulesConfig.confirmPassword}
        />

        <InputForm
          id='referralCode'
          name='referralCode'
          type='text'
          label='Referral Code'
          registerId='referralCode'
          placeholder='Referral Code'
          errors={errors.referralCode}
          register={register}
          rulesForm={registerRulesConfig.referralCode}
        />

        <TermsAndConditions
          errors={errors.termsAndConditions}
          register={register}
          rulesForm={registerRulesConfig.termsAndConditions}
        />

        <section className='mt-4'>
          <Button type='submit' classes='w-full mr-1 text-sm bg-primary-500'>
            Log In
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Already have an accout?</span>
            <Link href='/auth/login'>
              <a className='text-textAcent-500'> Register.</a>
            </Link>
          </p>
        </section>

        <RRSSAuth />
      </form>
    </div>
  )
}
