import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { sendEmailToConfirm } from 'lib/services/user/updateUserEmail'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  newEmail: string
}

export const FormUpdateEmail = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    if (auth.email === dataForm.newEmail) {
      setError('newEmail', { message: 'The current email is the same as the new email' })
      setIsLoading(false)
      return
    }

    const { error } = await sendEmailToConfirm(auth.accessToken, {
      newEmail: dataForm.newEmail,
      domain: location.origin
    })

    if (error) {
      handleFetchError(error.status, error.info)
      setIsLoading(false)
      return
    }

    GTMTrack.editProfile(typeUpdate)
    toast('We have sent you an email to confirm the change', { type: 'info' })
    reset()
    setTypeUpdate(null)
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (
    <div className='max-w-2xl mx-auto rounded-2xl bg-white md:shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] pt-4'>
      <section className='px-4 pt-3 '>
        <h3 className='text-base md:text-xl font-semibold'>Change Your E-mail</h3>
        <p className='font-semibold'>It should be different from last e-mail</p>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          disabled
          inputId='email'
          inputType='email'
          labelFor='email'
          labelName='Your Current Email is :'
          value={auth.email}
        />

        <InputProfile
          inputId='newEmail'
          inputType='text'
          labelFor='newEmail'
          labelName='New Email'
          placeholder='Insert the new e-mail:'
          register={register}
          rules={{ // TODO: REFACTOR - It is the same as the login with email
            required: { value: true, message: 'Email Required *' },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Enter a valid email *'
            }
          }}
          error={errors.newEmail}
        />
        <br />
        <div className='flex items-center bg-[#DCE5ED] rounded-b-2xl justify-end py-4 px-2 border-2 border-[#DCE5ED] '>
          <Button type='submit' classes='mr-4 bg-[#E74426]'>Save</Button>
          <Button classes='text-black bg-white' onClick={() => setTypeUpdate(null)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
