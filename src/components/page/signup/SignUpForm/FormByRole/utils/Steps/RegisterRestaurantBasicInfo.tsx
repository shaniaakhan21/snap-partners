import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from '../Input'
import { InputPhone } from '../InputPhone'
import { registerRestaurantRulesConfig } from '../formRules'
import { RegisterPassword } from '../RegisterPassword'
import { TermsAndConditions } from '../TermsAndConditions'
import { signUpStep1 } from 'lib/services/session/signUp'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IReferralLink } from 'lib/types'
import { IHandleStep } from '../types'
import { STEPS } from '.'
import { BulletPagination } from './BulletPagination'

export interface dataFormSignUpRestaurant {
  'city' : string
  'street_name': string,
  'state': string
  'country_code': string
  'email': string
  'mobile_no' : string
  'name': string
  'password': string
  'save_on_snap': boolean

  username: string
  confirmEmail: string
  confirmPassword: string
  referralCode?: string | null
  termsAndConditions: boolean
  // phoneExt: string
  phoneNumber: string
}

interface IRegisterRestaurantBasicInfoProps {
  referralLink: IReferralLink,
  handleStep: IHandleStep,
  handleUserInfo: any
}

export const RegisterRestaurantBasicInfo = ({ referralLink, handleUserInfo, handleStep }: IRegisterRestaurantBasicInfoProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<dataFormSignUpRestaurant>()
  const [isLoading, setLoading] = useState(false)

  const onSubmit = async (dataForm: dataFormSignUpRestaurant) => {
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

    const phoneNumber = `+${dataForm.phoneNumber}`

    const { error } = await signUpStep1({ phoneNumber })

    const dataToSend = {
      name: dataForm.name,
      lastname: null,
      email: dataForm.email,
      username: dataForm.username,
      password: dataForm.password,
      phoneNumber,
      idImage: null,
      insuranceImage: null,
      roles: {
        admin: false,
        customer: false,
        driver: false,
        merchant: true
      },
      code: null,
      merchant: {
        city: dataForm.city,
        street_name: dataForm.street_name,
        state: dataForm.state,
        country_code: dataForm.country_code,
        delivery_fees: 0.01,
        deliverykm: 0.01,
        email: dataForm.email,
        maxdeliverytime: 0.01,
        mobile_no: phoneNumber,
        name: dataForm.name,
        password: dataForm.password,
        pincode: '1234',
        save_on_snap: true
      },
      sponsorReferralCode: dataForm.referralCode || null
    }

    if (error) {
      handleFetchError(error.status, error.info)
      setLoading(false)
      return
    }

    handleUserInfo({ ...dataToSend })
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
      <p className='text-gray-500'>Welcome! register to continue.</p>

      <form className='max-w-xs mt-6' onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          id='username'
          name='username'
          type='text'
          label='Username'
          registerId='username'
          placeholder='Enter Username'
          errors={errors.username}
          register={register}
          rulesForm={registerRestaurantRulesConfig.username}
          isRequired
        />

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
          rulesForm={registerRestaurantRulesConfig.email}
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
          rulesForm={registerRestaurantRulesConfig.confirmEmail}
          isRequired
        />

        <InputForm
          id='name'
          name='name'
          type='text'
          label='Restaurant Name'
          registerId='name'
          placeholder='Enter Restaurant Name'
          errors={errors.name}
          register={register}
          rulesForm={registerRestaurantRulesConfig.name}
          isRequired
        />

        <InputPhone
          label='Restaurant Phone number'
          isRequired
          register={register}
          errors={errors}
          withVerifyCode={false}
          control={control}
        />

        <RegisterPassword
          errors={errors}
          register={register}
          rulesPasswordForm={registerRestaurantRulesConfig.password}
          rulesConfirmPasswordForm={registerRestaurantRulesConfig.confirmPassword}
        />

        <InputForm
          id='city'
          name='city'
          type='text'
          label='City'
          registerId='city'
          placeholder='Enter City'
          autoComplete='city'
          errors={errors.city}
          register={register}
          rulesForm={registerRestaurantRulesConfig.city}
          isRequired
        />

        <InputForm
          id='street_name'
          name='street_name'
          type='text'
          label='Street Name'
          registerId='street_name'
          placeholder='Enter Street Name'
          autoComplete='street'
          errors={errors.street_name}
          register={register}
          rulesForm={registerRestaurantRulesConfig.street_name}
          isRequired
        />

        <InputForm
          id='state'
          name='state'
          type='text'
          label='State'
          registerId='state'
          placeholder='Enter State'
          autoComplete='state'
          errors={errors.state}
          register={register}
          rulesForm={registerRestaurantRulesConfig.state}
          isRequired
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
          rulesForm={registerRestaurantRulesConfig.referralCode}
          isRequired={false}
        />

        <TermsAndConditions
          errors={errors.termsAndConditions}
          register={register}
          rulesForm={registerRestaurantRulesConfig.termsAndConditions}
        />

        <section className='mt-4'>
          <BulletPagination stepToActivate='REGISTER_BASIC_INFO' />

          <br /><br />

          <Button type='submit' classes='w-full mt-4 text-sm bg-primary-500'>
            Sign Up
          </Button>
        </section>
      </form>
    </div>
  )
}
