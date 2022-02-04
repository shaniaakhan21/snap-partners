import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
// import ReCAPTCHA from 'react-google-recaptcha'

import { useAuthStore } from 'lib/stores'
import { fakeLogin } from 'lib/utils/fakeLogin'
// import { useReCaptcha } from 'lib/hooks/useReCaptcha'

import { Button } from 'components/common/Button'
import { Spinner } from 'components/common/loaders'
import { InputForm } from './utils/Input'
import { IDataForm } from './utils/types'
import { RRSSAuth } from './utils/RRSSAuth'
import { signInRulesConfig } from './utils/formRules'
import { RegisterPassword } from './utils/RegisterPassword'
import { RememberAndPolicy } from './utils/RememberAndPolicy'

export const SignInForm = () => {
  const { signIn } = useAuthStore()
  const [isLoading, setLoading] = useState(false)
  // const { captchaRef, isValid, onChangeCaptcha } = useReCaptcha()
  const { handleSubmit, register, reset, formState: { errors } } = useForm<IDataForm>()

  const onSubmit = async (dataForm: IDataForm) => {
    setLoading(true)

    // console.log('SignInForm recaptcha isValid', isValid)

    setTimeout(async () => { // Simulate latency
      const { data, error } = await fakeLogin()

      setLoading(false)

      if (error) {
        return toast(error, { type: 'error' })
      }

      toast('¡Sign In Successful!', { type: 'success' })
      signIn({
        email: data.email,
        name: data.name,
        phone: data.phone.number,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      })
      reset()
    }, 1500)
  }

  if (isLoading) {
    return (<Spinner />)
  }

  return (
    <div>
      <span className='sm:hidden font-bold text-4xl text-[#18203F]'>SnapDelivered</span>
      <span className='hidden sm:block font-bold text-4xl text-[#18203F]'>Log In</span>
      <p className='text-gray-500'>Welcome! Log in to continue.</p>

      <form className='max-w-xs mt-6' onSubmit={handleSubmit(onSubmit)}>
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
          rulesForm={signInRulesConfig.email}
        />

        <RegisterPassword
          errors={errors}
          register={register}
        />

        <RememberAndPolicy
          register={register}
        />

        {/* <section className='mt-4'>
          <ReCAPTCHA
            ref={captchaRef}
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_V2}
            onChange={onChangeCaptcha}
          />
        </section> */}

        <section className='mt-4 text-center sm:text-left'>
          <Button type='submit' classes='w-full mr-1 text-sm bg-primary-500'>
            Sign In
          </Button>

          <br /><br />

          <p>
            <span className='font-semibold'>Don’t have an account?</span>
            <Link href='/auth/signup'>
              <a className='text-textAcent-500'> Sign Up.</a>
            </Link>
          </p>
        </section>

        <RRSSAuth />
      </form>
    </div>
  )
}
