import Link from 'next/link'
import { ChangeEvent, useRef, useState } from 'react'
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
import { signUpStep1 } from 'lib/services/auth/signUp'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { GTMTrack } from 'lib/utils/gtm'
import { useRouter } from 'next/router'
import { ROLES } from './../../../../../../../config/roles'
import Swal from 'sweetalert2'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { DatePickerForm } from '../DatePicker'
import states from 'data/states'
import { FormControlLabel, Radio } from '@mui/material'
import axios from 'axios'

interface IStepOpeProps {
  referralLink: IReferralLink,
  handleStep: IHandleStep,
  handleUserInfo: any
}

const maxFileSizeInMb = 5

const ssnHelptextDesign = {
  fontStyle: 'italic'
}

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

const AskIfCorrect = (referralCode) => {
// lets return a promise here
  return new Promise((resolve, reject) => {
    let html = `
    You are signing up under <b>${referralCode}</b> is this correct?
    `
    if (referralCode === 'undefined' || referralCode === 'null' || referralCode === null || referralCode === '') {
      html = `
      You are signing up <b>without a sponsor</b>, is this correct?
      `
    }

    Swal.fire({
      title: 'Important!',
      html: html,
      icon: 'warning',
      confirmButtonText: 'Yes, Continue!',
      showDenyButton: true,
      denyButtonText: 'No, Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        resolve(true)
      } else if (result.isDenied) {
        resolve(false)
      }
    })
  }
  )
}

export const RegisterBasicInfo = ({ referralLink, handleStep, handleUserInfo }: IStepOpeProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<IDataForm>()
  const [isLoading, setLoading] = useState(false)
  const role = useRoleFromUrl()
  const [selectedOption, setSelectedOption] = useState('Individual')

  // const { current: Apps } = useRef([
  //   { to: '/download-app?device=APPLE', icon: <img src='/images/app-store.png' className='inline-block mb-4 sm:mb-0 w-40' /> },
  //   { to: '/download-app?device=ANDROID', icon: <img src='/images/gplay.png' className='inline-block mb-4 sm:mb-0 w-40' /> }
  // ])

  const onSubmit = async (dataForm: IDataForm) => {
    if (dataForm.confirmEmail !== dataForm.email) {
      setLoading(false)
      setError('confirmEmail', { message: 'The email does not match' })
      return
    }

    if (dataForm.confirmPassword !== dataForm.password) {
      return setError('confirmPassword', { message: 'The password does not match' })
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

    if (await AskIfCorrect(dataForm.referralCode) === false) {
      return
    }

    setLoading(true)

    const { error } = await signUpStep1({
      phoneNumber: `+${dataForm.phoneNumber}`,
      email: dataForm.email,
      roles: {
        admin: referralLink.role === 'ADMIN',
        customer: referralLink.role === 'CUSTOMER',
        driver: referralLink.role === 'DRIVER',
        merchant: referralLink.role === 'MERCHANT',
        agent: referralLink.role === 'AGENT',
        ibo: referralLink.role === ROLES.IBO,
        integrousAssociate: referralLink.role === 'integrousAssociate',
        integrousCustomer: referralLink.role === 'integrousCustomer'
      },
      username: dataForm.username,
      sponsorReferralCode: dataForm.referralCode || null
    })

    if (error) {
      handleFetchError(error.status, error.info)
      setLoading(false)
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
    handleUserInfo({
      email: dataForm.email,
      username: dataForm.username,
      name: dataForm.name,
      lastname: dataForm.lastname,
      dateOfBirth: dataForm.dateOfBirth,
      password: dataForm.password,
      businessName: dataForm.businessName,
      business_type: dataForm.business_type,
      b_start_date: dataForm.b_start_date,
      ein: dataForm.ein,
      street: dataForm.street,
      city: dataForm.city,
      state: dataForm.state,
      zip: dataForm.zip,
      ssn: dataForm.ssn,
      socialSecurityNumber: dataForm.socialSecurityNumber,
      phone: `+${dataForm.phoneNumber}`,
      sponsorReferralCode: dataForm.referralCode || null,
      idImage: null,
      insuranceImage: null,
      roles: {
        admin: referralLink.role === 'ADMIN',
        customer: referralLink.role === 'CUSTOMER',
        driver: referralLink.role === 'DRIVER',
        merchant: referralLink.role === 'MERCHANT',
        agent: referralLink.role === 'AGENT',
        ibo: referralLink.role === ROLES.IBO,
        integrousAssociate: referralLink.role === 'integrousAssociate',
        integrousCustomer: referralLink.role === 'integrousCustomer'
      },
      level: setLevel(referralLink.role)
    })

    setLoading(false)
    GTMTrack.signUp(role, 1)
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

  let signUpas = 'Sign up as a'

  if (referralLink.role === 'AGENT') {
    signUpas = 'Sign up as an'
  }

  let roleText = capitalizeFirstLetter(referralLink.role)
  let subtext = ''
  if (referralLink.role === 'integrousAssociate') {
    roleText = 'Snap Partners Associate'
  }

  if (referralLink.role === 'integrousCustomer') {
    roleText = 'Snap Partners Customer'
    subtext = 'to purchase Integrous Products'
  }

  if (referralLink.role === ROLES.IBO) {
    roleText = 'Snap Partners Associate'
    subtext = ''
  }

  const showSSNField = referralLink.role !== 'CUSTOMER' && referralLink.role !== 'integrousCustomer'

  const router = useRouter()
  const referralCode = router.query.referralCode || 'IntegrousWellness'
  const redirectToWeightCare = router.query.redirectToWeightCare === 'true'
  const redirectToIntegrousWellness = router.query.redirectToIntegrousWellness === 'true'
  const loginURL = router.pathname === '/auth/login-integrous'
    ? `/auth/login-integrous?referralCode=${referralCode}`
    : redirectToWeightCare
      ? `/auth/login-wellness?referralCode=${referralCode}&redirectToWeightCare=true`
      : redirectToIntegrousWellness
        ? `/auth/login-wellness?referralCode=${referralCode}&redirectToIntegrousWellness=true`
        : '/auth/login'
  const maxWClass = router.pathname === '/auth/signup-wellness' ? 'max-w-2xl' : 'max-w-md'

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((prevOption) => {
      return event.target.value as 'Individual' | 'Business'
    })
  }

  return (
    <>
      <div className={`mx-auto w-full ${maxWClass}`}>
        <p className='sm:block font-bold text-3xl md:font-extrabold md:text-4xl mb-2 text-[#000] mt-4'>{signUpas}{' '}
          <span className='text-primary-500'>{roleText}</span>
        </p>
        <p className='text-[#18203F] font-bold text-md mb-2'>{subtext}</p>
        <p className='font-medium text-gray-600'>Welcome! register to continue.</p>
        <div className='bg-[#F0F4F8] border border-[#DCE5ED] rounded-lg pl-2 pt-2 mt-2'>
          <p className='font-medium text-[#E74426]'>Register as a:</p>
          <FormControlLabel
            value="Individual"
            control={<Radio checked={selectedOption === 'Individual'} onChange={handleOptionChange}/>}
            label="Individual"
            sx={{
              '@media (max-width:600px)': {
                '.MuiFormControlLabel-label': {
                  fontSize: '0.8rem'
                },
                '.MuiSvgIcon-root': {
                  width: '16px',
                  height: '16px'
                }
              }
            }}
          />
          <FormControlLabel
            value="Business"
            control={<Radio checked={selectedOption === 'Business'} onChange={handleOptionChange} />}
            label="Business"
            sx={{
              '@media (max-width:600px)': {
                '.MuiFormControlLabel-label': {
                  fontSize: '0.8rem'
                },
                '.MuiSvgIcon-root': {
                  width: '16px',
                  height: '16px'
                }
              }
            }}
          />
        </div>

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
          {selectedOption === 'Business' && (
            <>
              <InputForm
                id='businessName'
                name='businessName'
                type='text'
                label={'Business Name'}
                registerId='businessName'
                placeholder='Enter Business Name'
                errors={errors.businessName}
                register={register}
                rulesForm={registerRulesConfig.businessName}
                isRequired />

              <label className='font-semibold text-gray-600 text-md'>
              Business Type {' '}
                <span className='text-red-500'>*</span>
              </label>
              <select
                className='w-full px-3 py-1 my-2 text-base text-black border-2 border-gray-200 rounded-lg outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-10 transition-colors duration-200 ease-in-out placeholder:text-black'
                id='business_type'
                name='business_type'
                style={{ backgroundImage: 'none' }}
                {...register('business_type', { required: 'Business Type is required *' })}
              >
                <option value=''>Select Business Type</option>
                <option value="Individual/sole proprietor or LLC">Individual/sole proprietor or LLC</option>
                <option value="C Corporation">C Corporation</option>
                <option value="S Corporation">S Corporation</option>
                <option value="Partnership">Partnership</option>
                <option value="Trust/estate">Trust/estate</option>

              </select>

              <InputForm
                id='ein'
                name='ein'
                type='text'
                label={'EIN'}
                registerId='ein'
                placeholder='Enter EIN'
                errors={errors.ein}
                register={register}
                rulesForm={registerRulesConfig.ein}
                isRequired />

              <DatePickerForm
                id='b_start_date'
                name='b_start_date'
                label='Start of business'
                register={register}
                registerId='b_start_date'
                errors={errors.b_start_date}
                isRequired
              />

              <InputForm
                id='name'
                name='name'
                type='text'
                label={'Owner First Name'}
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
                label='Owner Last Name'
                registerId='lastname'
                placeholder='Enter Last Name'
                errors={errors.lastname}
                register={register}
                rulesForm={registerRulesConfig.lastname}
                isRequired
              />
            </>

          )}
          {selectedOption === 'Individual' && (
            <>
              <InputForm
                id='name'
                name='name'
                type='text'
                label={'First Name'}
                registerId='name'
                placeholder='Enter Name'
                errors={errors.name}
                register={register}
                rulesForm={registerRulesConfig.name}
                isRequired />

              <InputForm
                id='lastname'
                name='lastname'
                type='text'
                label='Last Name'
                registerId='lastname'
                placeholder='Enter Last Name'
                errors={errors.lastname}
                register={register}
                rulesForm={registerRulesConfig.lastname}
                isRequired /></>
          )}

          <DatePickerForm
            id='dateOfBirth'
            name='dateOfBirth'
            label='Date of Birth'
            register={register}
            registerId='dateOfBirth'
            errors={errors.dateOfBirth}
            isRequired
          />

          <InputForm
            id='street'
            name='street'
            type='text'
            label='Street'
            registerId='street'
            placeholder='Enter Street Name'
            errors={errors.street}
            register={register}
            rulesForm={registerRulesConfig.street}
            isRequired
          />

          <InputForm
            id='city'
            name='city'
            type='text'
            label='city'
            registerId='city'
            placeholder='Enter City Name'
            errors={errors.city}
            register={register}
            rulesForm={registerRulesConfig.city}
            isRequired
          />
          <label className='font-semibold text-gray-600 text-md'>
          State / Province {' '}
            <span className='text-red-500'>*</span>
          </label>
          <select
            className='w-full px-3 py-1 my-2 text-base text-gray-600 bg-white border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
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
            id='zip'
            name='zip'
            type='text'
            label='Zip'
            registerId='zip'
            placeholder='Enter Zip Code'
            errors={errors.zip}
            register={register}
            rulesForm={registerRulesConfig.zip}
            isRequired
          />

          {showSSNField && selectedOption === 'Individual' && (
            <InputForm
              id='socialSecurityNumber'
              name='socialSecurityNumber'
              type='text'
              label='Social Security Number'
              registerId='socialSecurityNumber'
              placeholder='Enter Social Security Number'
              errors={errors.socialSecurityNumber}
              register={register}
              rulesForm={registerRulesConfig.socialSecurityNumber}
              isRequired={true}
              style = {ssnHelptextDesign}
            />
          )}

          <InputPhone
            label={'Phone'}
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
            readOnly={Boolean(referralLink.code)}
          />
          <div className='block sm:flex w-full'>
            <div className='mt-7'>
              <TermsAndConditions
                errors={errors.termsAndConditions}
                register={register}
                rulesForm={registerRulesConfig.termsAndConditions}
              />
            </div>
            <div className='w-auto ml-auto'>
              <Button type='submit' classes=' w-full mt-4 text-sm bg-primary-500 font-semibold uppercase ml-auto'>Sign Up</Button>
            </div>
          </div>

          <BulletPagination stepToActivate='REGISTER_BASIC_INFO' />
          <section className='my-4'>

            <p className='mt-12 text-center'>
              <span className='font-semibold text-gray-600 text-sm sm:text-base'>Already have an account?</span>
              <Link href={loginURL}>
                <a className='text-primary-500 font-semibold text-xl underline decoration-1 ml-2 hover:text-black'>Sign In</a>
              </Link>
            </p>
          </section>
          {/* <div className='mt-8 text-center items-center'>
            {Apps.map(app => (
              <Link key={app.to} href={app.to}>
                <a className='mx-2'>
                  {app.icon}
                </a>
              </Link>
            ))}
          </div> */}
        </form>
      </div>
    </>

  )
}
