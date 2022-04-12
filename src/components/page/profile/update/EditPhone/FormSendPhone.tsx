import { Button } from 'components/common/Button'
import { InputPhone } from 'components/page/signup/SignUpForm/FormByRole/utils/InputPhone'

export const FormSendPhone = ({
  handleSubmitPhone,
  onSubmitPhone,
  registerPhone,
  setTypeUpdate,
  control,
  errors
}) => {
  return (
    <form onSubmit={handleSubmitPhone(onSubmitPhone)} className='w-full'>
      <InputPhone
        label='Phone'
        isRequired
        register={registerPhone}
        errors={errors}
        withVerifyCode={false}
        control={control}
      />

      <div className='mt-4 flex items-center'>
        <Button type='submit' classes='text-sm mr-2'>
          Send
        </Button>

        <Button onClick={() => setTypeUpdate(null)} classes='text-sm'>
          Cancel
        </Button>
      </div>
    </form>
  )
}
