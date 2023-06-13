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
import axios from 'axios'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  newUsername: string
}

export const FormUpdateUsename = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    try {
      await axios.post('/api/user/update-username', {
        username: dataForm.newUsername
      }, {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      }
      )

      setAuth({ ...auth, username: dataForm.newUsername })

      GTMTrack.editProfile(typeUpdate)
      reset()
      setTypeUpdate(null)
      setIsLoading(false)
    } catch (error) {
      toast('Username is already in use, plesae try another one', { type: 'error' })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change Username</h3>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          disabled
          inputId='username'
          inputType='username'
          labelFor='username'
          labelName='Current Username'
          value={auth.username}
        />

        <InputProfile
          inputId='newUsername'
          inputType='text'
          labelFor='newUsername'
          labelName='New Username'
          placeholder='Insert the new Username'
          register={register}
          rules={{ // TODO: REFACTOR - It is the same as the login with email
            required: { value: true, message: 'Username is required *' },
            minLength: {
              value: 5,
              message: 'Username must have at least 5 characters *'
            }
          }}
          error={errors.newUsername}
        />
        <br />
        <div className='flex items-center'>
          <Button type='submit' classes='mr-2'>Save</Button>
          <Button onClick={() => setTypeUpdate(null)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  )
}
