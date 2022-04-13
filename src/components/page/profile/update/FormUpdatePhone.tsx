import ReactCodeInput from 'react-verification-code-input'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { InputPhone } from 'components/page/signup/SignUpForm/FormByRole/utils/InputPhone'
import { Spinner } from 'components/common/loaders'
import { Button } from 'components/common/Button'
import { InputProfile } from '../commons/InputProfile'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormUpdatePhone = ({ auth, setAuth, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { register: registerPhone, handleSubmit: handleSubmitPhone, formState: { errors }, control } = useForm()
  const { register, handleSubmit } = useForm()
  const [phoneSent, setPhoneSent] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [code, setCode] = useState('')

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

  const onSubmitUpdatePhone = (data) => {
    setIsLoading(true)
    console.log('onSubmitUpdatePhone code', code)
    console.log('onSubmitUpdatePhone data', data)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen-80 flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className='max-w-3xl mx-auto'>
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
          ? (
            <form onSubmit={handleSubmitPhone(onSubmitPhone)} className='w-full'>
              <InputPhone
                label='Phone'
                isRequired
                register={registerPhone}
                errors={errors}
                withVerifyCode={false}
                control={control}
              />

              <div className='mt-4 flex items-center'>
                <Button type='submit' classes='text-sm mr-2'>
                  Send
                </Button>

                <Button onClick={() => setTypeUpdate(null)} classes='text-sm'>
                  Cancel
                </Button>
              </div>
            </form>
          )
          : (
            <form onSubmit={handleSubmit(onSubmitUpdatePhone)} className='w-full'>
              <div className='flex flex-col justify-center items-center mt-10'>
                <section className='text-center'>
                  <span className='text-2xl font-bold'>Verify Phone</span>
                  <p className='text-gray-500 mt-3'>
                    Code is Sent to <span className='font-bold text-black'>{phoneNumber}</span>
                  </p>
                </section>

                <ReactCodeInput
                  fields={6}
                  className='custom__reactCodeInput mt-4'
                  disabled={isLoading}
                  onComplete={(code: string) => setCode(code)}
                />
              </div>

              <div className='mt-4 w-full'>
                <InputProfile
                  disabled
                  inputId='newPhone'
                  inputType='phone'
                  labelFor='newPhone'
                  labelName='New Phone'
                  register={register}
                />

                <InputProfile
                  inputId='newEmail'
                  inputType='email'
                  labelFor='newEmail'
                  labelName='New Email'
                  placeholder='Insert the new email'
                  register={register}
                />
              </div>

              <div className='mt-4 flex items-center'>
                <Button type='submit' classes='text-sm mr-2'>
                  Send
                </Button>

                <Button onClick={() => setTypeUpdate(null)} classes='text-sm'>
                  Cancel
                </Button>
              </div>
            </form>
          )

      }
    </div>
  )
}
