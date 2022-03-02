import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from '../Input'
import { InputPhone } from '../InputPhone'
import { registerRestaurantRulesConfig } from '../formRules'
import { RegisterPassword } from '../RegisterPassword'
import { TermsAndConditions } from '../TermsAndConditions'
import { BulletPagination } from './BulletPagination'
import { signUpRestaurant } from 'lib/services/session/signUp'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IReferralLink } from 'lib/types'

export interface dataFormSignUpRestaurant {
  'city' : string
  'street_name': string,
  'state': string
  'country_code': string
  'delivery_fees': number
  'deliverykm': number
  'email': string
  'maxdeliverytime': number
  'mobile_no' : string
  'name': string
  'password': string
  'pincode': string
  'save_on_snap': boolean

  confirmEmail: string
  confirmPassword: string
  termsAndConditions: boolean
  phoneExt: string
  phoneNumber: string
}

export const RegisterRestaurantBasicInfo = ({ referralLink }: { referralLink: IReferralLink }) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<dataFormSignUpRestaurant>()
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

    const phoneNumber = `${dataForm.phoneExt}${dataForm.phoneNumber}`

    const dataToSend = {
      city: dataForm.city,
      street_name: dataForm.street_name,
      state: dataForm.state,
      country_code: dataForm.country_code,
      delivery_fees: Number(dataForm.delivery_fees),
      deliverykm: Number(dataForm.deliverykm),
      email: dataForm.email,
      maxdeliverytime: Number(dataForm.maxdeliverytime),
      mobile_no: phoneNumber,
      name: dataForm.name,
      password: dataForm.password,
      pincode: dataForm.pincode,
      save_on_snap: true
    }

    const { error } = await signUpRestaurant(dataToSend)

    if (error) {
      handleFetchError(error.status, error.info)
      setLoading(false)
      return
    }

    setLoading(false)
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
          label='Name'
          registerId='name'
          placeholder='Enter Name'
          errors={errors.name}
          register={register}
          rulesForm={registerRestaurantRulesConfig.name}
          isRequired
        />

        <InputPhone
          isRequired
          register={register}
          errors={errors}
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
          id='country_code'
          name='country_code'
          type='text'
          label='Country Code'
          registerId='country_code'
          placeholder='Enter Country Code'
          autoComplete='country_code'
          errors={errors.country_code}
          register={register}
          rulesForm={registerRestaurantRulesConfig.country_code}
          isRequired
        />

        <InputForm
          id='delivery_fees'
          name='delivery_fees'
          type='number'
          label='Delivery Fees'
          registerId='delivery_fees'
          placeholder='Enter Delivery Fees'
          autoComplete='delivery_fees'
          errors={errors.delivery_fees}
          register={register}
          rulesForm={registerRestaurantRulesConfig.delivery_fees}
          isRequired
          isNumberFloat
        />

        <InputForm
          id='deliverykm'
          name='deliverykm'
          type='number'
          label='Delivery(km)'
          registerId='deliverykm'
          placeholder='Enter Delivery(km)'
          autoComplete='deliverykm'
          errors={errors.deliverykm}
          register={register}
          rulesForm={registerRestaurantRulesConfig.deliverykm}
          isRequired
          isNumberFloat
        />

        <InputForm
          id='maxdeliverytime'
          name='maxdeliverytime'
          type='number'
          label='Max Delivery Time'
          registerId='maxdeliverytime'
          placeholder='Enter Max Delivery Time'
          autoComplete='maxdeliverytime'
          errors={errors.maxdeliverytime}
          register={register}
          rulesForm={registerRestaurantRulesConfig.maxdeliverytime}
          isRequired
          isNumberFloat
        />

        <InputForm
          id='pincode'
          name='pincode'
          type='text'
          label='Pin Code'
          registerId='pincode'
          placeholder='Enter Pin Code'
          autoComplete='pincode'
          errors={errors.pincode}
          register={register}
          rulesForm={registerRestaurantRulesConfig.pincode}
          isRequired
        />

        <TermsAndConditions
          errors={errors.termsAndConditions}
          register={register}
          rulesForm={registerRestaurantRulesConfig.termsAndConditions}
        />

        <section className='mt-4'>
          <BulletPagination stepToActivate='REGISTER_BASIC_INFO' />

          <Button type='submit' classes='w-full mt-4 text-sm bg-primary-500'>
            Sign Up
          </Button>
        </section>
      </form>
    </div>
  )
}
