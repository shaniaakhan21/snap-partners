import { Button } from 'components/common/Button'
import { InputPhone } from 'components/page/signup/SignUpForm/FormByRole/utils/InputPhone'
import { Trans, useTranslation } from 'next-i18next'

export const FormChangePhone = ({
  onSubmitUpdatePhone,
  setIsPhoneEditable,
  handleSubmitPhone,
  registerPhone,
  phoneNumber,
  control,
  errors
}) => {
  const { t } = useTranslation('profile')

  return (
    <form className='max-w-lg w-full mt-6 text-center' onSubmit={handleSubmitPhone(onSubmitUpdatePhone)}>
      <span className='text-2xl font-bold'>{t('update_phone.verify_phone')}</span>
      <p className='text-gray-500 mt-3'>
        <Trans i18nKey='profile:update_phone.code_sent_message' components={{ span: <span className='font-bold text-black' /> }} values={{ phoneNumber }} />
      </p>

      <div className='mt-4'>
        <div className='text-left'>
          <InputPhone
            label={t('update_phone.input')}
            isRequired
            register={registerPhone}
            errors={errors}
            withVerifyCode={false}
            control={control}
          />

          <div className='flex justify-center items-center'>
            <Button type='submit' classes='w-full text-sm bg-primary-500 mr-4'>
              {t('update_phone.save')}
            </Button>

            <Button
              onClick={() => setIsPhoneEditable(false)}
              classes='w-full text-sm bg-primary-500'
            >
              {t('update_phone.cancel')}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
