import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useState } from 'react'

import { updateUserPassword } from 'lib/services/user/updateUserPassword'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { builderWebsiteFields, TAccountInfoToUpdate } from 'lib/types/user/profile'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { getUserMe } from 'lib/services/user/getUserMe'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { signInRulesConfig } from 'components/page/login/LoginForm/utils/formRules'
import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'

interface IFormUpdatePasswordProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  password: string
  newPassword: string
  confirmNewPassword: string
}

export const FormUpdatePassword = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePasswordProps) => {
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
      currentPassword: dataForm.password,
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
      socialSecurityNumber: userData.socialSecurityNumber,
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
      driver_status: userData.driver_status,
      idImage: userData.idImage,
      insuranceImage: userData.insuranceImage,
      profileImage: userData.profileImage,
      isManager: userData.ranks?.type === 'manager',
      createdAt: userData.createdAt,
      ownerName: userData.ownerName,
      ranks: userData.ranks,
      updatedAt: userData.updatedAt,
      blocked: userData.blocked,
      deleted: userData.deleted,
      nsurAccount: {
        nsurUserId: userData.nsurUserId,
        myPoints: auth?.nsurAccount?.myPoints || null
      },
      bank_information: userData.bank_information,
      level: userData?.level,
      ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: userData[field] }), {}) as any)
    })
    GTMTrack.editProfile(typeUpdate)
    toast('Password successfully changed', { type: 'success' })
    reset()
    setTypeUpdate(null)
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
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
