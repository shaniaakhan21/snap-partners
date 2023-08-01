import ReactCodeInput from 'react-verification-code-input'
import { Trans, useTranslation } from 'next-i18next'

export const VerifyCode = ({
  onSubmitUpdatePhone,
  setIsPhoneEditable,
  onSubmitVerifyCode,
  handleSubmit,
  phoneNumber,
  sendSMSCode,
  isLoading
}) => {
  const { t } = useTranslation('profile')

  return (
    <form onSubmit={handleSubmit(onSubmitUpdatePhone)} className='w-full'>
      <div className='flex flex-col justify-center items-center mt-10'>
        <section className='text-center'>
          <span className='text-2xl font-bold'>Verify Phone</span>
          <p className='text-gray-500 mt-3'>
            <Trans i18nKey='profile:verify_phone.subtitle' components={{ span: <span className='font-bold text-black' /> }} value={{ phoneNumber }} />
          </p>

          <button
            type='button'
            onClick={() => setIsPhoneEditable(true)}
            className='text-primary-500 font-medium'
          >
            {t('verify_phone.change_number')}
          </button>

          <div className='mt-4'>
            <ReactCodeInput
              fields={6}
              className='custom__reactCodeInput mt-4'
              disabled={isLoading}
              onComplete={onSubmitVerifyCode}
            />
          </div>

          <div className='mt-4'>
            <p className='font-bold'>
              <Trans i18nKey='profile:verify_phone.send_again' components={{
                button: <button
                  type='button'
                  onClick={sendSMSCode}
                  className='text-primary-500 font-medium'
                />
              }}
              />
            </p>
          </div>
        </section>
      </div>
    </form>
  )
}
