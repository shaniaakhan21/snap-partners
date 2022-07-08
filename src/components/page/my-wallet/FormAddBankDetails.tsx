import { Button } from 'components/common/Button'
import { InputBasicForm } from 'components/common/InputBasicForm'
import { useForm } from 'react-hook-form'

interface IFormDataBankDetails {
  routingNumber: string
  accountNumber: string
  accountHolder: string
}

export const FormAddBankDetails = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormDataBankDetails>()

  const onSubmit = (data: IFormDataBankDetails) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h5 className='text-2xl font-bold'>My Bank Details</h5>

      <section className='mt-2'>
        <InputBasicForm
          isRequired
          autoComplete='off'
          classes='w-full'
          id='routingNumber'
          name='routingNumber'
          register={register}
          registerId='routingNumber'
          placeholder='ACH/ABA/SWIFT/BIC'
          label='Routing Number'
          errors={errors.routingNumber}
          type='text'
        />

        <InputBasicForm
          isRequired
          autoComplete='off'
          classes='w-full'
          id='accountNumber'
          name='accountNumber'
          register={register}
          registerId='accountNumber'
          placeholder='or IBAN'
          label='Account Number'
          errors={errors.accountNumber}
          type='text'
        />

        <InputBasicForm
          isRequired
          autoComplete='off'
          classes='w-full'
          id='accountHolder'
          name='accountHolder'
          register={register}
          registerId='accountHolder'
          placeholder='Name and last name'
          label='Account Holder'
          errors={errors.accountHolder}
          type='text'
        />

        <Button classes='mt-2' type='submit'>
          Submit
        </Button>
      </section>
    </form>
  )
}
