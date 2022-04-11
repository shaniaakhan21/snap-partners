import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ReactCodeInput from 'react-verification-code-input'

import { STEPS } from '.'
import { IHandleStep } from '../types'
import { Spinner } from 'components/common/loaders'
import { BulletPagination } from './BulletPagination'
import { signUpStep1, signUpStep2 } from 'lib/services/auth/signUp'
import { IReferralLink } from 'lib/types'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { InputPhone } from '../InputPhone'
import { Button } from 'components/common/Button'

interface IDataFormVerifyCode {
  code: string
}

export const VerifyCode = ({ userTrack, handleStep, referralLink, handleUserInfo }: { userTrack: any, handleStep: IHandleStep, referralLink: IReferralLink, handleUserInfo: any }) => {
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)
  const [isPhoneEditable, setIsPhoneEditable] = useState(false)
  const { handleSubmit: handleSubmitVerifyCode } = useForm<IDataFormVerifyCode>()
  const { handleSubmit: handleSubmitPhone, register: registerPhone, formState: { errors }, control } = useForm<{ phoneNumber: string }>()

  const sendSMSCode = async () => {
    setIsVerifyingCode(true)

    const { error } = await signUpStep1({ phoneNumber: userTrack.userInfo.phone })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsVerifyingCode(false)
    }

    setIsVerifyingCode(false)
    toast('Submitted Code', { type: 'success' })
  }

  const onSubmitUpdatePhone = async ({ phoneNumber }) => {
    setIsVerifyingCode(true)

    const { error } = await signUpStep1({ phoneNumber: `+${phoneNumber}` })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsVerifyingCode(false)
    }

    handleUserInfo({ ...userTrack.userInfo, phone: `+${phoneNumber}` })
    setIsVerifyingCode(false)
    setIsPhoneEditable(false)
    toast('Submitted Code', { type: 'success' })
  }

  const onSubmitVerifyCode = async (code) => {
    setIsVerifyingCode(true)

    const validateRole = userTrack.userInfo.roles.driver || userTrack.userInfo.roles.customer || userTrack.userInfo.roles.admin
      ? {
        data: {
          name: userTrack.userInfo.name,
          lastname: userTrack.userInfo.lastname,
          email: userTrack.userInfo.email,
          username: userTrack.userInfo.username,
          password: userTrack.userInfo.password,
          phoneNumber: userTrack.userInfo.phone,
          idImage: userTrack.userInfo.idImage,
          insuranceImage: userTrack.userInfo.insuranceImage,
          roles: {
            admin: userTrack.userInfo.roles.admin,
            customer: userTrack.userInfo.roles.customer,
            driver: userTrack.userInfo.roles.driver,
            merchant: userTrack.userInfo.roles.merchant
          },
          code,
          sponsorReferralCode: userTrack.userInfo.sponsorReferralCode
        }
      }
      : {
        data: {
          name: userTrack.userInfo.name,
          lastname: 'Merchant', // TODO: THIS WILL BE CHANGE
          email: userTrack.userInfo.email,
          username: userTrack.userInfo.username,
          password: userTrack.userInfo.password,
          phoneNumber: userTrack.userInfo.phoneNumber,
          idImage: userTrack.userInfo.idImage,
          insuranceImage: userTrack.userInfo.insuranceImage,
          roles: {
            admin: userTrack.userInfo.roles.admin,
            customer: userTrack.userInfo.roles.customer,
            driver: userTrack.userInfo.roles.driver,
            merchant: userTrack.userInfo.roles.merchant
          },
          code: code,
          sponsorReferralCode: userTrack.userInfo.sponsorReferralCode,
          merchant: {
            city: userTrack.userInfo.merchant.city,
            street_name: userTrack.userInfo.merchant.street_name,
            delivery_fees: userTrack.userInfo.merchant.delivery_fees,
            deliverykm: userTrack.userInfo.merchant.deliverykm,
            maxdeliverytime: userTrack.userInfo.merchant.maxdeliverytime,
            pincode: userTrack.userInfo.merchant.pincode,
            state: userTrack.userInfo.merchant.state,
            country_code: userTrack.userInfo.merchant.country_code,
            email: userTrack.userInfo.merchant.email,
            mobile_no: userTrack.userInfo.merchant.mobile_no,
            name: userTrack.userInfo.merchant.name,
            password: userTrack.userInfo.merchant.password,
            save_on_snap: userTrack.userInfo.merchant.save_on_snap
          }
        }
      }

    const { error } = await signUpStep2(validateRole.data)

    if (error) {
      handleFetchError(error.status, error.info)
      setIsVerifyingCode(false)
      return
    }

    toast('Code Verified', { type: 'success' })
    setIsVerifyingCode(false)
    handleStep(STEPS.SUCCESS_CODE)
  }

  if (isVerifyingCode) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <Spinner classes='w-20 h-20 md:w-10 md:h-10' />
      </div>
    )
  }

  if (isPhoneEditable) {
    return (
      <div className='flex justify-center items-center h-[85vh]'>
        <form className='max-w-sm mt-6 text-center' onSubmit={handleSubmitPhone(onSubmitUpdatePhone)}>
          <span className='text-4xl font-bold'>Verify Phone</span>
          <p className='text-gray-500 mt-3'>
          Code is Sent to <span className='font-bold text-black'>{userTrack.userInfo.phone}</span>
          </p>

          <div className='mt-4'>
            <div className='text-left'>
              <InputPhone
                label='Phone'
                isRequired
                register={registerPhone}
                errors={errors}
                withVerifyCode={false}
                control={control}
              />

              <Button type='submit' classes='w-full text-sm bg-primary-500'>
                  Update Phone
              </Button>
            </div>
          </div>

          <div className='mt-20'>
            <BulletPagination stepToActivate='VERIFY_CODE' />
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <form className='max-w-sm mt-6 text-center' onSubmit={handleSubmitVerifyCode(onSubmitVerifyCode)}>
        <span className='text-4xl font-bold'>Verify Phone</span>
        <p className='text-gray-500 mt-3'>
          Code is Sent to <span className='font-bold text-black'>{userTrack.userInfo.phone}</span>
        </p>

        <button
          type='button'
          onClick={() => setIsPhoneEditable(true)}
          className='text-primary-500 font-medium'
        >
              Change Number
        </button>

        <div className='mt-4'>
          <ReactCodeInput
            fields={6}
            className='custom__reactCodeInput'
            disabled={isVerifyingCode}
            onComplete={onSubmitVerifyCode}
          />
        </div>

        <div className='mt-4'>
          <p className='font-bold'>
                Didn’t recieve the code? {' '}
            <button
              type='button'
              onClick={sendSMSCode}
              className='text-primary-500 font-medium'
            > Send Again
            </button>
          </p>
        </div>

        <div className='mt-20'>
          <BulletPagination stepToActivate='VERIFY_CODE' />
        </div>
      </form>
    </div>
  )
}
