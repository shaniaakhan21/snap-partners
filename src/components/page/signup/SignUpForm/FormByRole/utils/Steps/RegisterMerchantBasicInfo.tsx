import Link from 'next/link'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from '../Input'
import { InputPhone } from '../InputPhone'
import { registerMerchantRulesConfig } from '../formRules'
import { RegisterPassword } from '../RegisterPassword'
import { TermsAndConditions } from '../TermsAndConditions'
import { signUpStep2 } from 'lib/services/auth/signUp'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IReferralLink } from 'lib/types'
import { IHandleStep } from '../types'
import { STEPS } from '.'
import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { GTMTrack } from 'lib/utils/gtm'
import { FooterApple } from 'components/common/icons'
import { DatePickerForm } from '../DatePicker'
import states from 'data/states'

export interface dataFormSignUpMerchant {
  'city' : string
  'street_name': string,
  'state': string
  'country_code': string
  'email': string
  'mobile_no' : string
  'name': string
  'password': string
  'save_on_snap': boolean
  ownerName: string

  username: string
  confirmEmail: string
  confirmPassword: string
  referralCode?: string | null
  termsAndConditions: boolean
  // phoneExt: string
  phoneNumber: string
  dateOfBirth: Date
}

interface IRegisterMerchantBasicInfoProps {
  referralLink: IReferralLink,
  handleStep: IHandleStep,
  handleUserInfo: any
}

export const RegisterMerchantBasicInfo = ({ referralLink, handleUserInfo, handleStep }: IRegisterMerchantBasicInfoProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<dataFormSignUpMerchant>()
  const [isLoading, setLoading] = useState(false)
  const role = useRoleFromUrl()
  const onSubmit = async (dataForm: dataFormSignUpMerchant) => {
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

    const setLevel = (referral) => {
      let level = ''
      if (referral === 'CUSTOMER' || referral === 'integrousCustomer') {
        level = 'customer'
      } else if (referral === 'integrousAssociate') {
        level = 'iboWellness'
      } else if (referral === 'AGENT') {
        level = 'iboErc'
      } else if (referral === 'DRIVER') {
        level = 'driver'
      } else if (referral === 'MERCHANT') {
        level = 'merchant'
      } else {
        level = 'ibo'
      }
      return level
    }

    const phoneNumber = `+${dataForm.phoneNumber}`

    const dataToSend = {
      name: dataForm.name,
      lastname: 'Merchant',
      dateOfBirth: dataForm.dateOfBirth,
      email: dataForm.email,
      username: dataForm.username,
      password: dataForm.password,
      phoneNumber,
      idImage: null,
      insuranceImage: null,
      city: dataForm.city,
      roles: {
        admin: false,
        customer: false,
        driver: false,
        merchant: true,
        ibo: false,
        agent: false,
        integrousCustomer: false,
        integrousAssociate: false
      },
      code: null,
      ownerName: dataForm.ownerName,
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
      sponsorReferralCode: dataForm.referralCode || null,
      level: setLevel(referralLink.role)
    }

    handleUserInfo(dataToSend)

    const { error } = await signUpStep2(dataToSend)

    if (error) {
      handleFetchError(error.status, error.info)
      setLoading(false)
      return
    }

    reset()
    GTMTrack.signUp(role, 1)
    setLoading(false)
    handleStep(STEPS.SUCCESS_CODE)
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
      <p className='sm:block font-bold text-3xl md:font-extrabold md:text-4xl mb-2 text-[#000] mt-4'>Sign up as a{' '}
        <span className='text-primary-500'>Merchant</span>
      </p>
      <p className='font-medium text-gray-600'>Welcome! register to continue.</p>

      <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          id='username'
          name='username'
          type='text'
          label='Username'
          registerId='username'
          placeholder='Enter Username'
          errors={errors.username}
          register={register}
          rulesForm={registerMerchantRulesConfig.username}
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
          rulesForm={registerMerchantRulesConfig.email}
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
          rulesForm={registerMerchantRulesConfig.confirmEmail}
          isRequired
        />

        <InputForm
          id='name'
          name='name'
          type='text'
          label='Merchant Name'
          registerId='name'
          placeholder='Enter Merchant Name'
          errors={errors.name}
          register={register}
          rulesForm={registerMerchantRulesConfig.name}
          isRequired
        />

        <InputForm
          id='ownerName'
          name='ownerName'
          type='text'
          label='Merchant Owner Name'
          registerId='ownerName'
          placeholder='Enter Merchant Owner Name'
          errors={errors.ownerName}
          register={register}
          rulesForm={registerMerchantRulesConfig.ownerName}
          isRequired
        />

        <InputPhone
          label='Merchant Phone number'
          isRequired
          register={register}
          errors={errors}
          withVerifyCode={false}
          control={control}
        />
        <DatePickerForm
          id='dateOfBirth'
          name='dateOfBirth'
          label='Date of Birth'
          register={register}
          registerId='dateOfBirth'
          errors={errors.dateOfBirth}
          isRequired={true}
        />
        <RegisterPassword
          errors={errors}
          register={register}
          rulesPasswordForm={registerMerchantRulesConfig.password}
          rulesConfirmPasswordForm={registerMerchantRulesConfig.confirmPassword}
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
          rulesForm={registerMerchantRulesConfig.city}
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
          rulesForm={registerMerchantRulesConfig.street_name}
          isRequired
        />

        <label className='font-bold text-gray-700 uppercase text-sm'>
          STATE {' '}
          <span className='text-red-500'>*</span>
        </label>
        <select
          className='w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
          id='state'
          name='state'
          style={{ backgroundImage: 'none' }}
          {...register('state', { required: 'State is required *' })}
        >
          <option value=''>Select a state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>

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
          rulesForm={registerMerchantRulesConfig.referralCode}
          isRequired={false}
          readOnly={Boolean(referralLink.code)}
        />

        <div className='sm:flex mt-5 items-center'>
          <TermsAndConditions
            errors={errors.termsAndConditions}
            register={register}
            rulesForm={registerMerchantRulesConfig.termsAndConditions}
          />
          <Button type='submit' classes='mt-4 sm:mt-0 w-full sm:w-auto text-mg bg-primary-500 font-semibold uppercase ml-auto'>Sign Up</Button>
        </div>

        <section className='my-4'>
          <p className='mt-8 text-center mt-12'>
            <span className='font-semibold text-gray-600 text-sm sm:text-base'>Already have an account?</span>

            <Link href='/auth/login'>
              <a className='text-primary-500 font-semibold text-xl underline decoration-1 ml-2 hover:text-black'>Sign In</a>
            </Link>
          </p>
        </section>

        {/* <div className='mt-8 text-center items-center'>
              {Apps.map(app => (
                <a className='mx-2' key={app.to}>
                  <Link key={app.to} href={app.to}>

                      {app.icon}

                  </Link>
                </a>
              ))}
          </div> */}
      </form>
    </div>
  )
}
