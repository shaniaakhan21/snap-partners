import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from '../Input'
import { InputPhone } from '../InputPhone'
import { RRSSAuth } from '../RRSSAuth'
import { registerRulesConfig } from '../formRules'
import { RegisterPassword } from '../RegisterPassword'
import { TermsAndConditions } from '../TermsAndConditions'
import { IReferralLink } from 'lib/types'
import { IHandleStep, IHandleUserInfo, IDataForm } from '../types'
import { STEPS } from '.'
import { BulletPagination } from './BulletPagination'
import { signUpStep1 } from 'lib/services/session/signUp'

interface IStepOpeProps {
  referralLink: IReferralLink,
  handleStep: IHandleStep,
  handleUserInfo: IHandleUserInfo
}

export const RegisterBasicInfo = ({ referralLink, handleStep, handleUserInfo }: IStepOpeProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()
  const [isLoading, setLoading] = useState(false)

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

    const phoneNumber = `+${dataForm.phoneExt}${dataForm.phoneNumber}`

    const { error } = await signUpStep1({ phoneNumber })

    if (error) {
      toast('error', { type: 'error' })
      setLoading(false)
      return
    }

    handleUserInfo({
      email: dataForm.email,
      username: dataForm.username,
      name: dataForm.name,
      lastname: dataForm.lastname,
      password: dataForm.password,
      phone: phoneNumber,
      referralCode: dataForm.referralCode
    })
    setLoading(false)

    handleStep(STEPS.VERIFY_CODE)
    reset()
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-screen h-[85vh] md:w-full'>
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
          id='username'
          name='username'
          type='text'
          label='Username'
          registerId='username'
          placeholder='Enter Username'
          errors={errors.username}
          register={register}
          rulesForm={registerRulesConfig.username}
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
          id='lastname'
          name='lastname'
          type='text'
          label='Lastname'
          registerId='lastname'
          placeholder='Enter Lastname'
          errors={errors.lastname}
          register={register}
          rulesForm={registerRulesConfig.lastname}
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
          <BulletPagination stepToActivate='REGISTER_BASIC_INFO' />

          <Button type='submit' classes='w-full mt-4 text-sm bg-primary-500'>
            Sign Up
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Already have an accout?</span>
            <Link href='/auth/signin'>
              <a className='text-textAcent-500 focus:underline'> Sign In.</a>
            </Link>
          </p>
        </section>

        <RRSSAuth />
      </form>
    </div>
  )
}