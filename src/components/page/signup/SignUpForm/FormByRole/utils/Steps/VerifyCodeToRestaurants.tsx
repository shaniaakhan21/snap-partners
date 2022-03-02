import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ReactCodeInput from 'react-verification-code-input'

import { STEPS } from '.'
import { IHandleStep } from '../types'
import { Spinner } from 'components/common/loaders'
import { BulletPagination } from './BulletPagination'
import { signUpRestaurant } from 'lib/services/session/signUp'
import { IReferralLink } from 'lib/types'
import { handleFetchError } from 'lib/utils/handleFetchError'

interface IDataFormVerifyCode {
  code: string
}

export const VerifyCodeToRestaurants = ({ userTrack, handleStep, referralLink }: { userTrack: any, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const { handleSubmit } = useForm<IDataFormVerifyCode>()
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)

  const onSubmit = async (code) => {
    setIsVerifyingCode(true)

    const { error } = await signUpRestaurant({
      lastname: null,
      username: null,
      idImage: null,
      insuranceImage: null,
      roles: {
        admin: false,
        customer: false,
        driver: false,
        merchant: true
      },
      code: code,
      sponsorReferralCode: null,
      name: null,
      email: null,
      password: null,
      phoneNumber: userTrack.userInfo.phoneNumber,
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
    })

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

  return (
    <div className='flex justify-center items-center h-[85vh]'>
      <form className='max-w-sm mt-6 text-center' onSubmit={handleSubmit(onSubmit)}>
        <span className='text-4xl font-bold'>Verify Code</span>

        <div className='mt-4'>
          <ReactCodeInput
            fields={6}
            className='custom__reactCodeInput'
            disabled={isVerifyingCode}
            onComplete={onSubmit}
          />
        </div>

        <div className='mt-4'>
          <BulletPagination stepToActivate='VERIFY_CODE' />
        </div>
      </form>
    </div>
  )
}
