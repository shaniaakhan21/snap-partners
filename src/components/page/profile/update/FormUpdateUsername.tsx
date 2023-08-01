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
import {useTranslation} from "next-i18next";

interface IFormUpdatePhoneProps {
  auth: IAuth
  setAuth: TSetAuth
  typeUpdate: string
  setTypeUpdate: Dispatch<SetStateAction<TAccountInfoToUpdate>>
}

interface IDataForm {
  newUsername: string
}

export const FormUpdateUsername = ({ auth, setAuth, typeUpdate, setTypeUpdate }: IFormUpdatePhoneProps) => {
  const { t } = useTranslation('profile')
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
      toast(t('update_username.error_username_exists'), { type: 'error' })
    }
    setIsLoading(false)
  }

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>{t('update_username.title')}</h3>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          disabled
          inputId='username'
          inputType='username'
          labelFor='username'
          labelName={t('update_username.current_username')}
          value={auth.username}
        />

        <InputProfile
          inputId='newUsername'
          inputType='text'
          labelFor='newUsername'
          labelName={t('update_username.current_username')}
          placeholder={t('update_username.new_username_placeholder')}
          register={register}
          rules={{ // TODO: REFACTOR - It is the same as the login with email
            required: { value: true, message: t('update_username.new_username_validation_required') },
            minLength: {
              value: 5,
              message: t('update_username.new_username_validation_minLength')
            }
          }}
          error={errors.newUsername}
        />
        <br />
        <div className='flex items-center'>
          <Button type='submit' classes='mr-2'>{t('update_username.save')}</Button>
          <Button onClick={() => setTypeUpdate(null)}>
            {t('update_username.cancel')}
          </Button>
        </div>
      </form>
    </div>
  )
}
