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

  const { handleSubmit, register, reset, formState: { errors } } = useForm<IForm>()
  const {
    handleSubmit: handleSubmitPhone,
    register: registerPhone,
    // formState: { errors: errorPhone },
    reset: resetPhone,
    control
  } = useForm<{ phoneNumber: string }>()

  const onSubmitPhone = async (dataForm: { phoneNumber: string }) => {
    setIsLoading(true)
    console.log(dataForm)

    const phoneNumber = `+${dataForm.phoneNumber}`

    const { error } = await resetPasswordByOTP(phoneNumber, '', '')

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    resetPhone()
    setIsLoading(false)
    toast('Submitted Code', { type: 'success' })
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
      <div className='min-h-[564px] flex items-center justify-center md:p-8'>
        <Spinner />
      </div>
    )
  }

  if (identifier === 'phone') {
    return (
      <div className="w-full min-h-[564px] flex flex-col items-center justify-center md:p-8">
        <h3 className='text-3xl font-semibold text-gray-700'>Account Recovery</h3>
        <br />
        <div className='w-28'>
          {emailSent
            ? <Image src={successImgSrc} placeholder='blur' className='w-full h-full' />
            : <Image src={failedImgSrc} placeholder='blur' />
          }
        </div>

        <form onClick={handleSubmitPhone(onSubmitPhone)} className='mt-4'>
          <InputPhone
            label='Phone'
            isRequired
            register={registerPhone}
            errors={errors}
            withVerifyCode={false}
            control={control}
          />

          <Button type='submit' classes='w-full text-sm bg-primary-500'>
            Send
          </Button>
        </form>
      </div>
    )
  }

  if (identifier === 'email') {
    return (
      <div className="w-full min-h-[564px] flex flex-col items-center justify-center md:p-8">
        <h3 className='text-3xl font-semibold text-gray-700'>Account Recovery</h3>
        <br />
        <div className='w-28'>
          {emailSent
            ? <Image src={successImgSrc} placeholder='blur' className='w-full h-full' />
            : <Image src={failedImgSrc} placeholder='blur' />
          }
        </div>
        <br />
        {emailSent
          ? (
            <p className='text-2xl font-semibold text-gray-700 text-center'>
              We have sent you an email, please{' '}
              <br className='hidden sm:block' />
              check your email address.
            </p>
          )
          : (
            <p className='text-2xl font-semibold text-gray-700 text-center'>
              Enter the email address{' '}
              <br className='hidden sm:block' />
              associated with your account.
            </p>
          )
        }
        {emailSent
          ? (
            <span className='text-xl text-gray-400 text-center my-2'>
              You will have a link that will allow you{' '}
              <br className='hidden sm:block' />
              to reset your password.
            </span>
          )
          : (
            <span className='text-xl text-gray-400 text-center my-2'>
              We will email you a link to reset{' '}
              <br className='hidden sm:block' />
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
            <br />
            <Button
              classes='w-full mt-4 text-sm bg-primary-500'
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
    <div className="w-full min-h-[564px] flex flex-col items-center justify-center md:p-8">
      <h3 className='text-3xl font-semibold text-gray-700'>Account Recovery</h3>
      <br />
      <div className='w-28'>
        {emailSent
          ? <Image src={successImgSrc} placeholder='blur' className='w-full h-full' />
          : <Image src={failedImgSrc} placeholder='blur' />
        }
      </div>
      <br />

      <div className='flex justify-center items-center'>
        <Button
          onClick={() => setIdentifier('phone')}
          classes='mr-4'
        >
          Phone
        </Button>

        <Button onClick={() => setIdentifier('email')}>
          Email
        </Button>
      </div>
    </div>
  )
}
