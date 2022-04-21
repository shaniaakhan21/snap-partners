import Link from 'next/link'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface ICheckTermsAndConditionsProps {
  register: UseFormRegister<any>,
  errors: any,
  rulesForm: FieldErrors
  link?: string
}

export const CheckTermsAndConditions = ({ register, errors, rulesForm, link }: ICheckTermsAndConditionsProps) => {
  return (
    <section className='space-y-2 mt-5 text-gray-800'>
      <div className='flex items-center justify-start'>
        <input
          {...register('termsAndConditions', rulesForm)}
          id='termsAndConditions'
          name='termsAndConditions'
          type='checkbox'
          defaultChecked={false}
          className='accent-primary-500'
        />

        <label htmlFor='termsAndConditions' className='ml-2 text-xs'>
          I agree to the {' '}
          <Link href={link || '/legal/terms-of-use'}>
            <a className='text-textAcent-500 font-semibold focus:underline'>Tems of Service and Privacy Policy</a>
          </Link>
        </label>
      </div>

      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}
    </section>
  )
}
