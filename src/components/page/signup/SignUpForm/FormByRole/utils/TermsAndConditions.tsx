import Link from 'next/link'
import { useRouter } from 'next/router'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IInputFormProps {
  register: UseFormRegister<any>,
  errors: any,
  rulesForm: FieldErrors,
}

export const TermsAndConditions = ({ register, errors, rulesForm }: IInputFormProps) => {
  const router = useRouter()
  const { role } = router.query
  const termsLink = role === 'IBO'
    ? '/legal/terms-of-use-ibo'
    : '/legal/terms-of-use'

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
          <Link href= {termsLink} >
            <a className='text-textAcent-500 font-semibold focus:underline'>Terms and Conditions</a>
          </Link>
        </label>
      </div>

      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}
    </section>
  )
}
