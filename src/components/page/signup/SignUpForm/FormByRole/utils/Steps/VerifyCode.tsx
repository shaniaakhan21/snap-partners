import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ReactCodeInput from 'react-verification-code-input'

import { STEPS } from '.'
import { IHandleStep, IUserTrack } from '../types'
import { Spinner } from 'components/common/loaders'
import { BulletPagination } from './BulletPagination'
import { signUpStep2 } from 'lib/services/session/signUp'
import { IReferralLink } from 'lib/types'
import { handleFetchError } from 'lib/utils/handleFetchError'

interface IDataFormVerifyCode {
  code: string
}

export const VerifyCode = ({ userTrack, handleStep, referralLink }: { userTrack: IUserTrack, handleStep: IHandleStep, referralLink: IReferralLink }) => {
  const { handleSubmit } = useForm<IDataFormVerifyCode>()
  const [isVerifyingCode, setIsVerifyingCode] = useState(false)

  const onSubmit = async (code) => {
    setIsVerifyingCode(true)

    const { error } = await signUpStep2({
      name: userTrack.userInfo.name,
      lastname: userTrack.userInfo.lastname,
      email: userTrack.userInfo.email,
      username: userTrack.userInfo.username,
      password: userTrack.userInfo.password,
      phoneNumber: userTrack.userInfo.phone,
      idImage: userTrack.userInfo.idImage ?? null,
      insuranceImage: userTrack.userInfo.insuranceImage ?? null,
      roles: {
        admin: referralLink.role === 'ADMIN',
        customer: referralLink.role === 'CUSTOMER',
        driver: referralLink.role === 'DRIVER',
        merchant: referralLink.role === 'RESTAURANT'
      },
      code,
      sponsorReferralCode: referralLink.code ?? null
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
