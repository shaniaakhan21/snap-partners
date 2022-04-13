import { Button } from 'components/common/Button'
import { InputPhone } from 'components/page/signup/SignUpForm/FormByRole/utils/InputPhone'

export const FormChangePhone = ({
  onSubmitUpdatePhone,
  setIsPhoneEditable,
  handleSubmitPhone,
  registerPhone,
  phoneNumber,
  control,
  errors
}) => {
  return (
    <form className='max-w-lg w-full mt-6 text-center' onSubmit={handleSubmitPhone(onSubmitUpdatePhone)}>
      <span className='text-2xl font-bold'>Verify Phone</span>
      <p className='text-gray-500 mt-3'>
        Code is Sent to <span className='font-bold text-black'>{phoneNumber}</span>
      </p>

      <div className='mt-4'>
        <div className='text-left'>
          <InputPhone
            label='Phone'
            isRequired
            register={registerPhone}
            errors={errors}
            withVerifyCode={false}
            control={control}
          />

          <div className='flex justify-center items-center'>
            <Button type='submit' classes='w-full text-sm bg-primary-500 mr-4'>
              Update Phone
            </Button>

            <Button
              onClick={() => setIsPhoneEditable(false)}
              classes='w-full text-sm bg-primary-500'
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
