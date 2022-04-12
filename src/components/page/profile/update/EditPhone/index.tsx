import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { IAuth } from 'lib/stores/Auth'

import { Spinner } from 'components/common/loaders'
import { FormChangePhone } from './FormChangePhone'
import { VerifyCode } from './VerifyCode'
import { FormSendPhone } from './FormSendPhone'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const EditPhone = ({ auth, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { register: registerPhone, handleSubmit: handleSubmitPhone, formState: { errors }, control } = useForm()
  const { handleSubmit } = useForm()
  const [isPhoneEditable, setIsPhoneEditable] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [phoneSent, setPhoneSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const sendSMSCode = async () => {
    setIsLoading(true)

    let error

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
    }

    setIsLoading(false)
    toast('Submitted Code', { type: 'success' })
  }

  const onSubmitPhone = ({ phoneNumber }) => {
    setIsLoading(true)
    if (!phoneNumber) {
      setPhoneSent(false)
      setIsLoading(false)
      return
    }

    const phone = `+${phoneNumber}`

    console.log('onSubmitPhone data', phone)

    setPhoneNumber(phone)
    setPhoneSent(true)
    setIsLoading(false)
  }

  const onSubmitVerifyCode = async (codeToVerify) => {
    console.log(codeToVerify)
  }

  const onSubmitUpdatePhone = ({ phoneNumber }) => {
    setIsLoading(true)
    setIsPhoneEditable(false)
    setPhoneNumber(`+${phoneNumber}`)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen-80 flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (isPhoneEditable) {
    return (
      <div className='flex justify-center items-center h-[70vh] w-full'>
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
    <div className='max-w-3xl mx-auto flex flex-col justify-center items-start h-[70vh] w-full'>
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
