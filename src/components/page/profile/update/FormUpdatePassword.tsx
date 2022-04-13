import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'

import { Button } from 'components/common/Button'
import { InputProfile } from '../commons/InputProfile'
import { signInRulesConfig } from 'components/page/login/LoginForm/utils/formRules'
import { updateUserPassword } from 'lib/services/user/updateUserPassword'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { toast } from 'react-toastify'
import { Spinner } from 'components/common/loaders'
import { getUserMe } from 'lib/services/user/getUserMe'

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
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (dataForm: IDataForm) => {
    setIsLoading(true)

    if (dataForm.confirmNewPassword !== dataForm.newPassword) {
      setError('confirmNewPassword', { message: 'The new confirm password is not equal to the new password' })
      setIsLoading(false)
      return
    }

    if (dataForm.password === dataForm.newPassword) {
      setError('newPassword', { message: 'The current password is equal to the new password' })
      setError('confirmNewPassword', { message: 'The current password is equal to the confirm new password' })
      setIsLoading(false)
      return
    }

    const { error: errorPassword } = await updateUserPassword(auth.accessToken, {
      currentPassword: auth.password,
      newPassword: dataForm.newPassword
    })

    if (errorPassword) {
      handleFetchError(errorPassword.status, errorPassword.info)
      setIsLoading(false)
      return
    }

    const { data: userData, error: userError } = await getUserMe({ token: auth.accessToken })

    if (userError) {
      handleFetchError(userError.status, userError.info)
      setIsLoading(false)
      return
    }

    setAuth({
      email: userData.email,
      name: userData.name,
      password: userData.password,
      phoneNumber: userData.phoneNumber,
      accessToken: auth.accessToken,
      lastname: userData.lastname,
      roles: userData.roles,
      id: userData.id,
      username: userData.username,
      referralCode: userData.referralCode,
      idImage: userData.idImage,
      insuranceImage: userData.insuranceImage,
      isManager: userData.ranks?.type === 'manager',
      createdAt: userData.createdAt,
      ownerName: userData.ownerName,
      ranks: userData.ranks,
      updatedAt: userData.updatedAt
    })
    toast('Password successfully changed', { type: 'success' })
    reset()
    setTypeUpdate(null)
    setIsLoading(false)
  }

  if (isLoading) {
    return (
      <div className='w-full h-screen-80 flex items-center justify-center'>
        <Spinner />
      </div>
    )
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
