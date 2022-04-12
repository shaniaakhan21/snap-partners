import { useForm } from 'react-hook-form'

import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

import { Button } from 'components/common/Button'
import { InputProfile } from '../commons/InputProfile'
import { useState } from 'react'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  newEmail: string
}

export const FormUpdateEmail = ({ auth, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<IDataForm>()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: IDataForm) => {
    setLoading(true)

    if (auth.email === data.newEmail) {
      setError('newEmail', { message: 'The current email is the same as the new email' })
      setLoading(false)
      return
    }

    console.log(data)

    // * FETCHING
    // ...
    // reset()
    setLoading(false)
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change email</h3>
        <p className='text-gray-800'>It should be different from last email</p>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          disabled
          inputId='email'
          inputType='email'
          labelFor='email'
          labelName='Current Email'
          value={auth.email}
        />

        <InputProfile
          inputId='newEmail'
          inputType='text'
          labelFor='newEmail'
          labelName='New Email'
          placeholder='Insert the new email'
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
