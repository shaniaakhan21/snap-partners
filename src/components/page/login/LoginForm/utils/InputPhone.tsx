import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IDataForm } from './types'

interface IInputFormProps {
  register?: UseFormRegister<IDataForm>
  errors?: any
  rulesForm?: FieldErrors
  classes?: string
}

export const InputPhone = ({ errors, register, classes }: IInputFormProps) => {
  const handleOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <div>
      <label htmlFor='phone' className='font-bold text-gray-700 uppercase text-sm'>
        Phone
      </label>

      {(errors.credentialProvider) && (
        <p className='text-sm text-red-400'>
          {errors.credentialProvider && errors.credentialProvider.message}
        </p>
      )}

      <div className='w-full flex justify-start items-center gap-x-2'>
        <input
          {...register('credentialProvider', { required: { value: true, message: 'Phone number is required *' } })}
          id='credentialProvider'
          name='credentialProvider'
          type='tel'
          className={`w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out ${classes}`}
          placeholder='555 555 5555'
          maxLength={12}
          onKeyPress={handleOnlyNumbers}
          autoComplete='off'
        />
      </div>
    </div>
  )
}
