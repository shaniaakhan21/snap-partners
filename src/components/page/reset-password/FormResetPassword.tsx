import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { resetPasswordStepTwo } from 'lib/services/auth/resetPassword'
import { handleFetchError } from 'lib/utils/handleFetchError'

import { RegisterPassword } from 'components/page/signup/SignUpForm/FormByRole/utils/RegisterPassword'
import { Spinner } from 'components/common/loaders'
import { Button } from 'components/common/Button'

interface IForm {
  password: string,
  confirmPassword: string
}

const rules = {
  password: {
    required: { value: true, message: 'Password Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  },

  confirmPassword: {
    required: { value: true, message: 'Password Required *' },
    maxLength: { value: 50, message: 'Max 50 Characters *' },
    minLength: { value: 3, message: 'Min 3 Characters *' }
  }
}

interface IFormResetPasswordProps {
  token: string
}

export const FormResetPassword = ({ token }: IFormResetPasswordProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IForm>()

  const onSubmit = async (dataForm: IForm) => {
    setIsLoading(true)

    if (dataForm.confirmPassword !== dataForm.password) {
      setError('confirmPassword', { message: 'The password does not match' })
      setIsLoading(false)

      return
    }

    const { error } = await resetPasswordStepTwo(dataForm.password, token)

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    toast('Password changed successfully!', { type: 'success' })
    setIsLoading(false)
    reset()
    router.push('/auth/login')
  }

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center md:p-8'>
        <Spinner />
      </div>
    )
  }

  return (
    <form
      className='max-w-md mx-auto w-full h-screen flex flex-col items-center justify-center px-4'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='flex flex-col justify-center items-center'>
        <img src='/images/logo-red.png' />

        <span className='mt-5 text-3xl font-bold'>Snap Delivered</span>
        <span className='mt-5 text-xl font-bold'>Create New Password</span> <br />
        <p>New Password must be different from previous password</p>
      </div>

      <section className='mt-4 w-full'>
        <RegisterPassword
          errors={errors}
          register={register}
          rulesPasswordForm={rules.password}
          rulesConfirmPasswordForm={rules.confirmPassword}
        />
        <Button type='submit' classes='w-full mt-4 text-sm bg-primary-500 uppercase'>
          Save New password
        </Button>
      </section>
    </form>
  )
}
