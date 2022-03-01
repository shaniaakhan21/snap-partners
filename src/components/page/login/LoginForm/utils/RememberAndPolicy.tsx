import { UseFormRegister } from 'react-hook-form'
import { IDataForm } from './types'

interface IInputFormProps {
  register: UseFormRegister<IDataForm>
}

export const RememberAndPolicy = ({ register }: IInputFormProps) => {
  return (

    <section className='space-y-2 mt-4 text-gray-800'>
      <div className='flex items-center justify-start'>
        <input
          {...register('rememberMe')}
          id='rememberMe'
          name='rememberMe'
          type='checkbox'
          defaultChecked={false}
          className='accent-primary-500'
        />

        <label htmlFor='rememberMe' className='ml-2 text-xs'>Remember me</label>
      </div>

      {/* <div className='flex items-center justify-start'>
        <input
          {...register('privacyPolicy')}
          id='privacyPolicy'
          name='privacyPolicy'
          type='checkbox'
          defaultChecked={false}
          className='accent-primary-500'
        />

        <label htmlFor='privacyPolicy' className='ml-2 text-xs'>I agree to the Trems of Service and Privacy Policy</label>
      </div> */}
    </section>

  )
}
