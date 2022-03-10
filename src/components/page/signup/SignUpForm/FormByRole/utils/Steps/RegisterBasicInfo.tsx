import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from '../Input'
import { InputPhone } from '../InputPhone'
import { registerRulesConfig } from '../formRules'
import { RegisterPassword } from '../RegisterPassword'
import { TermsAndConditions } from '../TermsAndConditions'
import { IReferralLink } from 'lib/types'
import { IHandleStep, IDataForm } from '../types'
import { STEPS } from '.'
import { BulletPagination } from './BulletPagination'
import { signUpStep1 } from 'lib/services/session/signUp'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { signUp } from 'lib/utils/gtm'

interface IStepOpeProps {
  referralLink: IReferralLink,
  handleStep: IHandleStep,
  handleUserInfo: any
}

const maxFileSizeInMb = 5

export const RegisterBasicInfo = ({ referralLink, handleStep, handleUserInfo }: IStepOpeProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<IDataForm>()
  const [isLoading, setLoading] = useState(false)
  const role = useRoleFromUrl()

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

    if (dataForm.idImage && dataForm.idImage[0].size > (maxFileSizeInMb * 1000000)) {
      setError('idImage', { message: `The maximum file size in ID Image is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
      setLoading(false)
      return
    }

    if (dataForm.insuranceImage && dataForm.insuranceImage[0].size > (maxFileSizeInMb * 1000000)) {
      setError('insuranceImage', { message: `The maximum file size in Insurance Image is ${maxFileSizeInMb}mb, please upload a file with a maximum file size of ${maxFileSizeInMb}mb` })
      setLoading(false)
      return
    }

    const phoneNumber = `+${dataForm.phoneNumber}`

    const { error } = await signUpStep1({ phoneNumber })

    if (error) {
      handleFetchError(error.status, error.info)
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
      sponsorReferralCode: dataForm.referralCode || null,
      idImage: null,
      insuranceImage: null,
      roles: {
        admin: referralLink.role === 'ADMIN',
        customer: referralLink.role === 'CUSTOMER',
        driver: referralLink.role === 'DRIVER',
        merchant: referralLink.role === 'RESTAURANT'
      }
    })

    setLoading(false)
    signUp(role, 2)
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
    <div className='max-w-md mx-auto w-full'>
      <span className='font-bold text-4xl text-[#18203F]'>Sign up!</span>
      <p className='text-gray-500'>Welcome! register to continue.</p>

      <form className='mt-6 w-full' onSubmit={handleSubmit(onSubmit)}>
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
          isRequired
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
          isRequired
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
          isRequired
        />

        <InputForm
          id='name'
          name='name'
          type='text'
          label={referralLink.role ? `${referralLink.role} Name` : 'Name'}
          registerId='name'
          placeholder='Enter Name'
          errors={errors.name}
          register={register}
          rulesForm={registerRulesConfig.name}
          isRequired
        />

        <InputForm
          id='lastname'
          name='lastname'
          type='text'
          label='Last Name'
          registerId='lastname'
          placeholder='Enter Lastname'
          errors={errors.lastname}
          register={register}
          rulesForm={registerRulesConfig.lastname}
          isRequired
        />

        <InputPhone
          label={referralLink.role ? `${referralLink.role} Phone` : 'Phone'}
          isRequired
          register={register}
          errors={errors}
          withVerifyCode
          control={control}
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
          isRequired={false}
        />

        {/* {referralLink.role === 'DRIVER' && (
          <>
            <InputFile
              register={register}
              registerId='idImage'
              isRequired
              errors={errors.idImage}
              rulesForm={registerRulesConfig.idImage}
              label='ID image'
            />
            <InputFile
              register={register}
              registerId='insuranceImage'
              isRequired
              errors={errors.insuranceImage}
              rulesForm={registerRulesConfig.insuranceImage}
              label='Insurance image'
            />
          </>
        )} */}

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

          <p className='mt-4'>
            <span className='font-semibold'>Already have an account?</span>
            <Link href='/auth/login'>
              <a className='text-textAcent-500 focus:underline'> Login.</a>
            </Link>
          </p>
        </section>
      </form>
    </div>
  )
}
