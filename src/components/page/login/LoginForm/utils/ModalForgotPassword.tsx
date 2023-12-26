import Image from 'next/image'
import { useForm } from 'react-hook-form'
// import imageSrc from 'public/images/errorAsset.png'
import failedImgSrc from '../../../../../../public/images/errorAsset.png'
import successImgSrc from '../../../../../../public/images/dougNormal.png'
import { Button } from 'components/common/Button'
import { InputForm } from 'components/page/signup/SignUpForm/FormByRole/utils/Input'
import { resetPasswordByOTP, resetPasswordStepOne } from 'lib/services/auth/resetPassword'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useState } from 'react'
import { Spinner } from 'components/common/loaders'
import { InputPhone } from 'components/page/signup/SignUpForm/FormByRole/utils/InputPhone'
import { toast } from 'react-toastify'
import ReactCodeInput from 'react-verification-code-input'
import { RegisterPassword } from 'components/page/signup/SignUpForm/FormByRole/utils/RegisterPassword'
import { registerRulesConfig } from 'components/page/signup/SignUpForm/FormByRole/utils/formRules'
import { sendOTP } from 'lib/services/auth/sendOTP'
import { MODALS_ID, useModalStore } from 'lib/stores'

const ruleEmail = {
  required: { value: true, message: 'Email Required *' },
  pattern: {
    value:
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    message: 'Enter a valid email *'
  }
}

interface IForm {
  email: string
}

export const ModalForgotPassword = () => {
  const [identifier, setIdentifier] = useState<'phone' | 'email'>(null)
  const [emailSent, setEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [phoneSent, setPhoneSent] = useState(false)
  const [phone, setPhone] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const { closeModalManually } = useModalStore()

  const { handleSubmit, register, reset, formState: { errors } } = useForm()
  const {
    handleSubmit: handleSubmitPhone,
    register: registerPhone,
    reset: resetPhone,
    control
  } = useForm<{ phoneNumber: string }>()

  const onSubmitPhone = async (dataForm: { phoneNumber: string }) => {
    setPhone(`+${dataForm.phoneNumber}`)

    const { error } = await sendOTP({ phoneNumber: `+${dataForm.phoneNumber}` })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    resetPhone()
    setIsLoading(false)
    setPhoneSent(true)
    toast('Submitted Code', { type: 'success' })
  }

  const onSubmitResetPasswordWithPhone = async (dataForm) => {
    setIsLoading(true)

    if (!code) {
      toast('Code no valid', { type: 'error' })
      return setIsLoading(false)
    }

    if (dataForm.confirmPassword !== dataForm.password) {
      toast('The password does not match', { type: 'error' })
      return setIsLoading(false)
    }

    const { error } = await resetPasswordByOTP(code, phone, dataForm.password)

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    reset()
    setIsLoading(false)
    closeModalManually(MODALS_ID.MODAL_FORGOT_PASSWORD_ID)
    toast('Password Updated Correctly', { type: 'success' })
  }

  const onSubmitEmail = async (dataForm: IForm) => {
    setIsLoading(true)
    const { error } = await resetPasswordStepOne(dataForm.email)

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    setEmailSent(true)
    setIsLoading(false)
    reset()
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }

  if (identifier === 'phone') {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className='w-40'>
          {phoneSent
            ? <Image src={successImgSrc} placeholder='blur' className='w-full h-full' />
            : <Image src={failedImgSrc} placeholder='blur' />
          }
        </div>
        <h3 className='text-3xl font-bold text-black'>Account Recovery</h3>
        {
          phoneSent && (
            <p className='text-gray-600 mt-3'>
              Code is Sent to <span className='font-bold text-primary-500'>{phone}</span>
            </p>
          )
        }

        {
          !phoneSent
            ? <form onSubmit={handleSubmitPhone(onSubmitPhone)} className='mt-4 w-full'>
              <InputPhone
                label='Phone'
                isRequired
                register={registerPhone}
                errors={errors}
                withVerifyCode={false}
                control={control}
              />

              <Button type='submit' classes='w-auto text-sm bg-primary-500 uppercase float-right mt-2'>
                Send
              </Button>
            </form>

            : <form onSubmit={handleSubmit(onSubmitResetPasswordWithPhone)} className='w-full mt-4 flex flex-col justify-center items-center'>
              <ReactCodeInput
                fields={6}
                className='custom__reactCodeInput'
                disabled={isLoading}
                onComplete={(code: string) => setCode(code)}
              />

              <div className='mt-4 w-full'>
                <RegisterPassword
                  errors={errors}
                  register={register}
                  rulesPasswordForm={registerRulesConfig.password}
                  rulesConfirmPasswordForm={registerRulesConfig.confirmPassword}
                />
              </div>

              <Button type='submit' classes='mt-4 w-auto text-mg bg-primary-500 font-semibold uppercase ml-auto'>
                Send
              </Button>
            </form>
        }

      </div>
    )
  }

  if (identifier === 'email') {
    return (
      <div className="w-full flex flex-col items-center justify-center">
        <div className='w-40'>
          {emailSent
            ? <Image src={successImgSrc} placeholder='blur' className='w-full h-full' />
            : <Image src={failedImgSrc} placeholder='blur' />
          }
        </div>
        <h3 className='text-3xl font-bold text-black'>Account Recovery</h3>
        {emailSent
          ? (
            <p className='text-base font-semibold text-center text-gray-600 mb-4 mt-1'>
              We have sent you an email, please{' '}
               check your email address.
            </p>
          )
          : (
            <p className='text-base font-semibold text-center text-gray-600 mb-4 mt-1'>
              Enter the email address{' '}
               associated with your account.
            </p>
          )
        }
        {emailSent
          ? (
            <span className='w-full text-base text-gray-700 text-center my-2 rounded-lg p-3 border border-gray-300 bg-gray-50 mb-8'>
              You will have a link that will allow you{' '}
              to reset your password.
            </span>
          )
          : (
            <span className='w-full text-base text-gray-800 text-center rounded-lg p-3 bg-gray-100 mt-4 mb-4'>
              We will email you a link to reset{' '}
              <br/>
              your password.
            </span>
          )
        }

        {!emailSent && (
          <>
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
              rulesForm={ruleEmail}
              isRequired
            />
            <Button
              classes='w-auto text-mg bg-primary-500 font-semibold uppercase ml-auto mt-4'
              onClick={handleSubmit(onSubmitEmail)}
            >
                  Send
            </Button>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className='w-40'>
        {emailSent
          ? <Image src={successImgSrc} placeholder='blur' className='w-full h-full' />
          : <Image src={failedImgSrc} placeholder='blur' />
        }
      </div>
      <h3 className='text-3xl font-bold text-black'>Account Recovery</h3>
      <p className='text-base font-semibold text-center text-gray-600 mb-4 mt-1'>
        To help keep your account safe, SNAP wants to make sure it’s really you trying to sign
      </p>

      <p className='w-full text-base text-gray-800 text-center rounded-lg p-3 bg-gray-100 mt-4 mb-8'>Get a verification code via</p>

      <div className='w-full flex justify-center items-center'>
        <Button
          onClick={() => setIdentifier('phone')}
          classes='w-full mr-4 text-mg bg-primary-500 font-semibold uppercase ml-auto'
        >
          Phone
        </Button>

        <Button
          classes='w-full text-mg bg-primary-500 font-semibold uppercase ml-auto'
          onClick={() => setIdentifier('email')}
        >
          Email
        </Button>
      </div>
    </div>
  )
}
