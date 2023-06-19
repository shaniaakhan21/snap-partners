import { Button } from 'components/common/Button'
import { InputPhone } from 'components/page/signup/SignUpForm/FormByRole/utils/InputPhone'
import {useTranslation} from "next-i18next";

export const FormSendPhone = ({
  handleSubmitPhone,
  onSubmitPhone,
  registerPhone,
  setTypeUpdate,
  control,
  errors
}) => {
  const { t } = useTranslation('profile')

  return (
    <form onSubmit={handleSubmitPhone(onSubmitPhone)} className='w-full'>
      <InputPhone
        label={t('send_phone.input')}
        isRequired
        register={registerPhone}
        errors={errors}
        withVerifyCode={false}
        control={control}
      />

      <div className='mt-4 flex items-center'>
        <Button type='submit' classes='text-sm mr-2'>
          {t('send_phone.send')}
        </Button>

        <Button onClick={() => setTypeUpdate(null)} classes='text-sm'>
          {t('send_phone.cancel')}
        </Button>
      </div>
    </form>
  )
}
