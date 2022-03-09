import Head from 'next/head'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { PAGE_INFO } from 'config/pageInfo'
import { resetPasswordStepTwo } from 'lib/services/session/resetPassword'
import { useForm } from 'react-hook-form'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { RegisterPassword } from 'components/page/signup/SignUpForm/FormByRole/utils/RegisterPassword'
import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'

const { SEO } = PAGE_INFO

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

const ResetPasswordPage = ({ token }) => {
  const router = useRouter()

  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IForm>()
  const [isLoading, setIsLoading] = useState(false)

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
      className="w-screen h-screen flex flex-col items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <RegisterPassword
        errors={errors}
        register={register}
        rulesPasswordForm={rules.password}
        rulesConfirmPasswordForm={rules.confirmPassword}
      />
      <Button type='submit' classes='w-24 mt-4 text-sm bg-primary-500'>
        Send
      </Button>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { token } = query

  if (!token) {
    return {
      notFound: true
    }
  }

  return {
    props: { token }
  }
}

ResetPasswordPage.getLayout = (page) => (
  <>
    <Head>
      <title>{SEO.TITLE_PAGE} - Reset Password</title>
    </Head>

    {page}
  </>
)

export default ResetPasswordPage
