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
import { signUpStep1 } from 'lib/services/auth/signUp'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useRoleFromUrl } from 'lib/hooks/useRoleFromUrl'
import { GTMTrack } from 'lib/utils/gtm'
import { useRouter } from 'next/router'
import { ROLES } from './../../../../../../../config/roles'
import { useTranslation } from "next-i18next";

interface IStepOpeProps {
  referralLink: IReferralLink,
  handleStep: IHandleStep,
  handleUserInfo: any
}

const maxFileSizeInMb = 5

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

export const RegisterBasicInfo = ({ referralLink, handleStep, handleUserInfo }: IStepOpeProps) => {
  const { t } = useTranslation()
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<IDataForm>()
  const [isLoading, setLoading] = useState(false)
  const role = useRoleFromUrl()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)

    if (dataForm.confirmEmail !== dataForm.email) {
      setLoading(false)
      setError('confirmEmail', { message: t('auth:signup.error.email-not-match') })

      if (dataForm.confirmPassword !== dataForm.password) {
        return setError('confirmPassword', { message: t('auth:signup.error.password-not-match') })
      }

      return
    }

    if (dataForm.confirmPassword !== dataForm.password) {
      setError('confirmPassword', { message: t('auth:signup.error.password-not-match') })
      setLoading(false)

      if (dataForm.confirmEmail !== dataForm.email) {
        return setError('confirmEmail', { message: t('auth:signup.error.email-not-match') })
      }

      return
    }

    if (dataForm.idImage && dataForm.idImage[0].size > (maxFileSizeInMb * 1000000)) {
      setError('idImage', { message: t('auth:signup.error.file-size-id', { maxFileSizeInMb }) })
      setLoading(false)
      return
    }

    if (dataForm.insuranceImage && dataForm.insuranceImage[0].size > (maxFileSizeInMb * 1000000)) {
      setError('insuranceImage', { message: t('auth:signup.error.file-size-insurance', { maxFileSizeInMb }) })
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
      businessName: dataForm.businessName,
      street: dataForm.street,
      state: dataForm.state,
      zip: dataForm.zip,
      ssn: dataForm.ssn,
      phone: phoneNumber,
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
      }
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

  let signUpas = t('auth:signup.signup-as-a')

  if (referralLink.role === 'AGENT') {
    signUpas = t('auth:signup.signup-as-an')
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
  const loginURL = router.pathname === '/auth/signup-integrous' ? '/auth/login-integrous' : '/auth/login'

  return (
    <div className='max-w-md mx-auto w-full'>
      <p className='font-bold text-4xl text-[#18203F]'>{signUpas}{' '}
        <span className='text-primary-500'>{roleText}</span>
      </p>
<<<<<<< HEAD
      <p className='text-[#18203F] font-bold text-md mb-2'>{subtext}</p>
      <p className='text-gray-500'>Welcome! register to continue.</p>
=======
      <p className='text-gray-500'>{t('auth:signup.form.welcome')}</p>
>>>>>>> 62b6bded2ef10da694717975e421a29d22f187df

      <form className='mt-6 w-full' onSubmit={handleSubmit(onSubmit)}>
        <InputForm
          id='email'
          name='email'
          type='email'
          label={t('auth:signup.form.email.label')}
          registerId='email'
          placeholder={t('auth:signup.form.email.placeholder')}
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
          label={t('auth:signup.form.confirm-email.label')}
          registerId='confirmEmail'
          placeholder={t('auth:signup.form.confirm-email.placeholder')}
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
          label={t('auth:signup.form.username.label')}
          registerId='username'
          placeholder={t('auth:signup.form.username.placeholder')}
          errors={errors.username}
          register={register}
          rulesForm={registerRulesConfig.username}
          isRequired
        />

        <InputForm
          id='name'
          name='name'
          type='text'
          label={t('auth:signup.form.first-name.label')}
          registerId='name'
          placeholder={t('auth:signup.form.first-name.placeholder')}
          errors={errors.name}
          register={register}
          rulesForm={registerRulesConfig.name}
          isRequired
        />

        <InputForm
          id='lastname'
          name='lastname'
          type='text'
          label={t('auth:signup.form.last-name.label')}
          registerId='lastname'
          placeholder={t('auth:signup.form.last-name.placeholder')}
          errors={errors.lastname}
          register={register}
          rulesForm={registerRulesConfig.lastname}
          isRequired
        />

        <InputForm
          id='businessName'
          name='businessName'
          type='text'
          label={t('auth:signup.form.business-name.label')}
          registerId='businessName'
          placeholder={t('auth:signup.form.business-name.placeholder')}
          errors={errors.businessName}
          register={register}
          rulesForm={registerRulesConfig.businessName}
          isRequired={false}
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
          id='state'
          name='state'
          type='text'
          label='State / Province'
          registerId='state'
          placeholder='Enter State / Province'
          errors={errors.state}
          register={register}
          rulesForm={registerRulesConfig.state}
          isRequired
        />

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

        {showSSNField && (
          <InputForm
            id='ssn'
            name='ssn'
            type='text'
            label='Social Security Number'
            registerId='ssn'
            placeholder='Enter Social Security Number'
            errors={errors.ssn}
            register={register}
            rulesForm={registerRulesConfig.ssn}
            isRequired={false}
            helpText='* Required to receive commissions beyond $600'
          />
        )}

        <InputPhone
          label={t('auth:signup.form.phone.label')}
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
          label={t('auth:signup.form.referralCode.label')}
          registerId='referralCode'
          placeholder={t('auth:signup.form.referralCode.placeholder')}
          defaultValue={referralLink.code}
          errors={errors.referralCode}
          register={register}
          rulesForm={registerRulesConfig.referralCode}
          isRequired={false}
          readOnly={Boolean(referralLink.code)}
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
            {t('auth:signup.form.submit')}
          </Button>

<<<<<<< HEAD
          {role !== ROLES.IBO && <p className='mt-4'>
            <span className='font-semibold'>Already have an account?</span>
=======
          <p className='mt-4'>
            <span className='font-semibold'>{t('auth:signup.already-have-an-account')}</span>
            {' '}
>>>>>>> 62b6bded2ef10da694717975e421a29d22f187df
            <Link href={loginURL}>
              <a className='text-textAcent-500 focus:underline'>{t('auth:signup.login')}</a>
            </Link>
          </p>}
        </section>
      </form>
    </div>
  )
}
