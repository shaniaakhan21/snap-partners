
import Link from 'next/link'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IInputFormProps {
  register: UseFormRegister<any>,
  errors: any,
  rulesForm: FieldErrors
}

export const TermsAndConditions = ({ register, errors, rulesForm }: IInputFormProps) => {
  return (
    <section className='space-y-2 font-semibold text-gray-600 text-sm sm:text-base'>
      <div className='flex items-center justify-start'>
        <input
          {...register('termsAndConditions', rulesForm)}
          id='termsAndConditions'
          name='termsAndConditions'
          type='checkbox'
          defaultChecked={false}
          className='accent-primary-500'
        />

        <label htmlFor='termsAndConditions' className='ml-2 text-md'>
        Agree to {' '}
          <Link href='/legal/terms-of-use'>
            <a className='text-primary-500 font-semibold underline decoration-1 text-left text-sm sm:text-base'>Terms and Conditions</a>
          </Link>
        </label>
      </div>

      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}
    </section>
  )
}
