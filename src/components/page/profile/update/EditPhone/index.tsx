import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { updateUserPhone } from 'lib/services/user/updateUserPhone'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { signUpStep1 } from 'lib/services/auth/signUp'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { FormChangePhone } from './FormChangePhone'
import { FormSendPhone } from './FormSendPhone'
import { VerifyCode } from './VerifyCode'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const EditPhone = ({ auth, setAuth, setTypeUpdate }: IFormUpdatePhoneProps) => {
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

    const { error } = await signUpStep1({ phoneNumber })

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

    const { error } = await signUpStep1({ phoneNumber: `+${phoneNumber}` })

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

    const { error } = await signUpStep1({ phoneNumber: `+${phoneNumber}` })

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
    <div className='max-w-3xl mx-auto flex flex-col justify-center items-start w-full'>
      {
        !phoneSent && (
          <section className='text-gray-800'>
            <h3 className='font-bold text-2xl'>Change Your Phone</h3>
            <span>It should be different from last Phone</span>
            <p className='text-sm'>Your current phone is: <span className='font-bold'>{auth.phoneNumber}</span></p>
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
