import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth } from 'lib/stores/Auth'

import { Button } from 'components/common/Button'
import { InputProfile } from '../commons/InputProfile'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
interface IFormUpdatePasswordProps {
  auth: IAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export const FormUpdatePassword = ({ auth, setTypeUpdate }: IFormUpdatePasswordProps) => {
  const { handleSubmit, register, reset, formState: { errors }, control } = useForm<IDataForm>()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (data: IDataForm) => {
    console.log('data:', data)
  }

  return (
    <div className='max-w-4xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change password</h3>
        <p className='text-gray-800'>It should be different from last password</p>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='relative'>
          <InputProfile
            inputId='password'
            inputType={`${showPassword ? 'text' : 'password'}`}
            labelFor='currentPassword'
            labelName='Current Password'
            placeholder='Insert your current password'
            error={errors.password}
          />

          <button
            type='button'
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='absolute right-5 mr-0.5 top-12'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </button>
        </div>

        <div className='relative'>
          <InputProfile
            inputId='newPassword'
            inputType={`${showPassword ? 'text' : 'password'}`}
            labelFor='newPassword'
            labelName='New Password'
            placeholder='Insert the new password'
            error={errors.newPassword}
          />
          <button
            type='button'
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='absolute right-5 mr-0.5 top-12'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </button>
        </div>

        <div className='relative'>
          <InputProfile
            inputId='confirmNewPassword'
            inputType={`${showPassword ? 'text' : 'password'}`}
            labelFor='confirmNewPassword'
            labelName='Confirm New Password'
            placeholder='Insert the new password'
            error={errors.confirmNewPassword}
          />
          <button
            type='button'
            onClick={() => setShowPassword((prevState) => !prevState)}
            className='absolute right-5 mr-0.5 top-12'
          >
            {showPassword ? <EyeHiddenIcon /> : <EyeVisibleIcon />}
          </button>
        </div>

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
