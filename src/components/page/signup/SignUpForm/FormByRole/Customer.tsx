import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { useAuthStore } from 'lib/stores'
import { IReferralLink } from 'lib/types'
import { fakeLogin } from 'lib/utils/fakeLogin'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from './utils/Input'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { registerRulesConfig } from './utils/formRules'
import { RegisterPassword } from './utils/RegisterPassword'
import { TermsAndConditions } from './utils/TermsAndConditions'

export const SignUpCustomerForm = ({ referralLink }: { referralLink: IReferralLink }) => {
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
    console.log('SignUpCustomerForm onSubmit referralLink', referralLink)
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
            Log In
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Already have an accout?</span>
            <Link href='/auth/signin'>
              <a className='text-textAcent-500'> Log In.</a>
            </Link>
          </p>
        </section>

        <RRSSAuth />
      </form>
    </div>
  )
}
