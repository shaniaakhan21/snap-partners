import { useForm } from 'react-hook-form'

import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

import { Button } from 'components/common/Button'
import { InputProfile } from '../commons/InputProfile'

interface IFormUpdatePhoneProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

export const FormUpdateEmail = ({ auth, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { register, handleSubmit } = useForm()

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change email</h3>
        <p className='text-gray-800'>It should be different from last email</p>
      </section>

      <br />

      <InputProfile
        disabled
        inputId='currentEmail'
        inputType='email'
        labelFor='currentEmail'
        labelName='Current Email'
        value={auth.email}
        register={register}

      />

      <form>
        <InputProfile
          inputId='newEmail'
          inputType='email'
          labelFor='newEmail'
          labelName='New Email'
          placeholder='Insert the new email'
          register={register}
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
