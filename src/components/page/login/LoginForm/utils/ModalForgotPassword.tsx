import Image from 'next/image'
import { useForm } from 'react-hook-form'
// import imageSrc from 'public/images/errorAsset.png'
import failedImgSrc from '../../../../../../public/images/errorAsset.png'
import successImgSrc from '../../../../../../public/images/dougNormal.png'
import { Button } from 'components/common/Button'
import { InputForm } from 'components/page/signup/SignUpForm/FormByRole/utils/Input'
import { resetPassword } from 'lib/services/session/resetPassword'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useState } from 'react'
import { timeout } from 'lib/utils/timeout'
import { Spinner } from 'components/common/loaders'

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
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IForm>()
  const [emailSent, setEmailSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IForm) => {
    setIsLoading(true)
    // const { error } = await resetPassword(dataForm.email)

    // if (error) {
    //   handleFetchError(error.status, error.info)
    //   setIsLoading(false)
    //   return
    // }

    await timeout(3000)
    setEmailSent(true)
    setIsLoading(false)
    reset()
  }

  if (isLoading) {
    return (
      <div className='flex items-center justify-center md:p-8'>
        <Spinner />
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col items-center md:p-8">
      <h3 className='text-3xl font-semibold text-gray-700'>Forgot Password?</h3>
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
          <Button classes='w-24 mt-4 text-sm bg-primary-500' onClick={handleSubmit(onSubmit)}>
          Send
          </Button>
        </>
      )}
    </div>
  )
}
