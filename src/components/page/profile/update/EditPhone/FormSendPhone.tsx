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
    <form onSubmit={handleSubmitPhone(onSubmitPhone)} className='w-full pt-3'>
      <InputPhone
        label='Phone'
        isRequired
        register={registerPhone}
        errors={errors}
        withVerifyCode={false}
        control={control}
      />

      <div className='flex items-center bg-[#DCE5ED] rounded-b-2xl justify-end py-4 px-2 border-2 border-[#DCE5ED] '>
        <Button type='submit' classes='mr-4 bg-[#E74426]'>
          Send
        </Button>

        <Button classes='text-black bg-white text-sm' onClick={() => setTypeUpdate(null)}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
