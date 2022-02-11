import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuthStore } from 'lib/stores'
import { IReferralLink } from 'lib/types'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from './utils/Input'
import { InputPhone } from './utils/InputPhone'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { registerRulesConfig } from './utils/formRules'
import { RegisterPassword } from './utils/RegisterPassword'
import { TermsAndConditions } from './utils/TermsAndConditions'

export const SignUpDriverForm = ({ referralLink }: { referralLink: IReferralLink }) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()
  const [isLoading, setLoading] = useState(false)
  const { createAccout } = useAuthStore()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)

    if (dataForm.confirmEmail !== dataForm.email) {
      setLoading(false)
      setError('confirmEmail', { message: 'The email does not match' })

      if (dataForm.confirmPassword !== dataForm.password) {
        return setError('confirmPassword', { message: 'The password does not match' })
      }

      return
    }

    if (dataForm.confirmPassword !== dataForm.password) {
      setError('confirmPassword', { message: 'The password does not match' })
      setLoading(false)

      if (dataForm.confirmEmail !== dataForm.email) {
        return setError('confirmEmail', { message: 'The email does not match' })
      }

      return
    }

    setLoading(false)

    toast('¡Sign In Successful!', { type: 'success' })
    createAccout({
      email: dataForm.email,
      name: dataForm.name,
      phone: `${dataForm.phoneExt + dataForm.phoneNumber}`,
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
      refreshToken: 'eesre6-d5av2y-asd6w0'
    })
    reset()
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-screen md:w-full'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  return (
    <div>
      <span className='font-bold text-4xl text-[#18203F]'>Sign up!</span>
      <p>As {referralLink?.role}</p>
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
          label='Confirm Email'
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

        <InputPhone
          register={register}
          errors={errors}
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
          defaultValue={referralLink.code}
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
            Sign Up
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Already have an accout?</span>
            <Link href='/auth/signin'>
              <a className='text-textAcent-500'> Sign In.</a>
            </Link>
          </p>
        </section>

        <RRSSAuth />
      </form>
    </div>
  )
}
