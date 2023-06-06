import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IInputFormProps {
  register: UseFormRegister<any>,
  errors: any,
  rulesForm: FieldErrors
}

export const TermsAndConditions = ({ register, errors, rulesForm }: IInputFormProps) => {
  const { t } = useTranslation()

  return (
    <section className='space-y-2 mt-4 text-gray-800'>
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
          {t('common:agreeTo')}{' '}
          <Link href='/legal/terms-of-use'>
            <a className='text-textAcent-500 font-semibold focus:underline'>{t('common:termsAndConditions')}</a>
          </Link>
        </label>
      </div>

      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}
    </section>
  )
}
