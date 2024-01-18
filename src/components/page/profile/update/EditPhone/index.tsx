import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { updateUserPhone } from 'lib/services/user/updateUserPhone'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { sendOTP } from 'lib/services/auth/sendOTP'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { FormChangePhone } from './FormChangePhone'
import { FormSendPhone } from './FormSendPhone'
import { VerifyCode } from './VerifyCode'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const EditPhone = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { register: registerPhone, handleSubmit: handleSubmitPhone, formState: { errors }, control } = useForm()
  const { handleSubmit } = useForm()
  const [isPhoneEditable, setIsPhoneEditable] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneSent, setPhoneSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendSMSCode = async () => {
    setIsLoading(true)

    if (!phoneNumber) {
      setPhoneSent(false)
      setIsLoading(false)
      return
    }

    const { error } = await sendOTP({ phoneNumber })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    const phone = `+${phoneNumber}`
    setPhoneNumber(phone)

    setPhoneSent(true)
    setIsLoading(false)
  }

  const onSubmitPhone = async ({ phoneNumber }) => {
    setIsLoading(true)

    if (!phoneNumber) {
      setPhoneSent(false)
      setIsLoading(false)
      return
    }

    const { error } = await sendOTP({ phoneNumber: `+${phoneNumber}` })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    const phone = `+${phoneNumber}`
    setPhoneNumber(phone)

    setPhoneSent(true)
    setIsLoading(false)
  }

  const onSubmitVerifyCode = async (codeToVerify) => {
    setIsLoading(true)
    console.log(codeToVerify)
    const { error } = await updateUserPhone(auth.accessToken, { code: codeToVerify, phone: phoneNumber })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    GTMTrack.editProfile(typeUpdate)
    setIsLoading(false)
    toast('Phone Updated', { type: 'success' })
    setAuth({ ...auth, phoneNumber })
    setTypeUpdate(null)
  }

  const onSubmitUpdatePhone = async ({ phoneNumber }) => {
    setIsLoading(true)
    setIsPhoneEditable(false)

    setIsLoading(true)

    if (!phoneNumber) {
      setPhoneSent(false)
      setIsLoading(false)
      return
    }

    const { error } = await sendOTP({ phoneNumber: `+${phoneNumber}` })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    const phone = `+${phoneNumber}`
    setPhoneNumber(phone)

    setPhoneSent(true)
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  if (isPhoneEditable) {
    return (
      <div className='flex justify-center items-center w-full'>
        <FormChangePhone
          onSubmitUpdatePhone={onSubmitUpdatePhone}
          setIsPhoneEditable={setIsPhoneEditable}
          handleSubmitPhone={handleSubmitPhone}
          registerPhone={registerPhone}
          phoneNumber={phoneNumber}
          control={control}
          errors={errors}
        />
      </div>
    )
  }

  return (
    <div className='max-w-2xl mx-auto rounded-2xl bg-white md:shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] pt-4'>
      {
        !phoneSent && (
          <section className='text-black px-4 pt-3'>
            <h3 className='font-semibold text-xl md:text-2xl'>Change Your Phone</h3>
            <span className='font-semibold'>It should be different from last Phone</span>
            <p className='text-sm text-[#708292] mt-7'>Your current phone is: <span className='font-semibold text-black'>{auth.phoneNumber}</span></p>
          </section>
        )
      }

      {
        !phoneSent
          ? <FormSendPhone
            handleSubmitPhone={handleSubmitPhone}
            onSubmitPhone={onSubmitPhone}
            registerPhone={registerPhone}
            setTypeUpdate={setTypeUpdate}
            control={control}
            errors={errors}
          />

          : <VerifyCode
            onSubmitUpdatePhone={onSubmitUpdatePhone}
            setIsPhoneEditable={setIsPhoneEditable}
            onSubmitVerifyCode={onSubmitVerifyCode}
            handleSubmit={handleSubmit}
            sendSMSCode={sendSMSCode}
            phoneNumber={phoneNumber}
            isLoading={isLoading}
          />

      }
    </div>
  )
}
