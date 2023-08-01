import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import {useCallback, useState} from 'react'

import { sendEmailToConfirm } from 'lib/services/user/updateUserEmail'
import { Dispatch, SetStateAction } from 'lib/types/core/next-react'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { IAuth, TSetAuth } from 'lib/stores/Auth'
import { GTMTrack } from 'lib/utils/gtm'

import { SpinnerPageContent } from 'components/common/loaders/PageContent'
import { InputProfile } from '../commons/InputProfile'
import { Button } from 'components/common/Button'
import {useTranslation} from "next-i18next";

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
  const { t } = useTranslation('profile')
  const { handleSubmit, register, reset, formState: { errors }, setError } = useForm<IDataForm>()

  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = useCallback(async (dataForm: IDataForm) => {
    setIsLoading(true)

    if (auth.email === dataForm.newEmail) {
      setError('newEmail', { message: t('update_email.error_same_email') })
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
    toast(t('update_email.info_confirm_mail_sent'), { type: 'info' })
    reset()
    setTypeUpdate(null)
    setIsLoading(false)
  }, [t])

  if (isLoading) {
    return <SpinnerPageContent />
  }

  return (
    <div className='max-w-3xl mx-auto'>
      <section>
        <h3 className='text-xl font-bold'>{t('update_email.title')}</h3>
        <p className='text-gray-800'>{t('update_email.subtitle')}</p>
      </section>

      <br />

      <form onSubmit={handleSubmit(onSubmit)}>
        <InputProfile
          disabled
          inputId='email'
          inputType='email'
          labelFor='email'
          labelName={t('update_email.current_email')}
          value={auth.email}
        />

        <InputProfile
          inputId='newEmail'
          inputType='text'
          labelFor='newEmail'
          labelName={t('update_email.new_email_label')}
          placeholder={t('update_email.new_email_placeholder')}
          register={register}
          rules={{ // TODO: REFACTOR - It is the same as the login with email
            required: { value: true, message: t('update_email.new_email_validation_required') },
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: t('update_email.new_email_validation_pattern')
            }
          }}
          error={errors.newEmail}
        />
        <br />
        <div className='flex items-center'>
          <Button type='submit' classes='mr-2'>{t('update_email.save')}</Button>
          <Button onClick={() => setTypeUpdate(null)}>
            {t('update_email.cancel')}
          </Button>
        </div>
      </form>
    </div>
  )
}
