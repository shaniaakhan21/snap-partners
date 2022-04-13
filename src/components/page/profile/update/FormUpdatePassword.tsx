import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { Button } from 'components/common/Button'
import { InputProfile } from '../commons/InputProfile'
import { EyeHiddenIcon, EyeVisibleIcon } from 'components/common/icons'
import { signInRulesConfig } from 'components/page/login/LoginForm/utils/formRules'

interface IFormUpdatePasswordProps {
  auth: IAuth
  setAuth: TSetAuth
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export const FormUpdatePassword = ({ auth, setAuth, setTypeUpdate }: IFormUpdatePasswordProps) => {
  const { handleSubmit, register, reset, formState: { errors }, setError, control } = useForm<IDataForm>()

  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: IDataForm) => {
    setLoading(true)

    if (data.confirmNewPassword !== data.newPassword) {
      setError('confirmNewPassword', { message: 'The new confirm password is not equal to the new password' })
      setLoading(false)
      return
    }

    if (data.password === data.newPassword) {
      setError('newPassword', { message: 'The current password is equal to the new password' })
      setError('confirmNewPassword', { message: 'The current password is equal to the confirm new password' })
      setLoading(false)
      return
    }

    console.log('data:', data)

    // * FETCHING
    // ...
    // reset()
    setLoading(false)
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>Change password</h3>
        <p className='text-gray-800'>It should be different from last password</p>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          inputId='password'
          inputType='password'
          isAPasswordInput
          labelFor='currentPassword'
          labelName='Current Password'
          placeholder='Insert your current password'
          register={register}
          rules={signInRulesConfig.password}
          error={errors.password}
        />

        <InputProfile
          inputId='newPassword'
          inputType='password'
          isAPasswordInput
          labelFor='newPassword'
          labelName='New Password'
          placeholder='Insert the new password'
          register={register}
          rules={signInRulesConfig.password}
          error={errors.newPassword}
        />

        <InputProfile
          inputId='confirmNewPassword'
          inputType='password'
          isAPasswordInput
          labelFor='confirmNewPassword'
          labelName='Confirm New Password'
          placeholder='Insert the new password'
          register={register}
          rules={signInRulesConfig.password}
          error={errors.confirmNewPassword}
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
