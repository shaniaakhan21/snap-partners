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
      isCertified: userData.isCertified,
      isValidated: userData.isValidated,
      street: userData.street,
      city: userData.city,
      state: userData.state,
      zip: userData.zip,
      dateOfBirth: userData.dateOfBirth,
      TINstatus: userData.TINstatus,
      zendesk_id: userData.zendesk_id,
      business_approved: userData.business_approved,
      ein: userData.socialSecurityNumber,
      business_type: userData.business_type,
      b_start_date: userData.b_start_date,
      businessName: userData.businessName,
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
    <div className='max-w-2xl mx-auto rounded-2xl bg-white md:shadow-[0_1px_17px_-1px_rgba(0,0,0,0.2)] pt-4'>
      <section className='px-4 pt-3 '>
        <h3 className='text-lg md:text-xl font-bold'>Change password</h3>
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
