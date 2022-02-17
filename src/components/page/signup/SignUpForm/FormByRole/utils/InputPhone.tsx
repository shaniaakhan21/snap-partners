import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IDataForm } from './types'

interface IInputFormProps {
  register?: UseFormRegister<IDataForm>
  errors?: any
  rulesForm?: FieldErrors
  classes?: string
  isRequired: boolean
}

export const InputPhone = ({ errors, register, classes, isRequired }: IInputFormProps) => {
  const handleOnlyNumbers = (event) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault()
    }
  }

  return (
    <div className='flex flex-col justify-start items-start gap-x-2 my-2'>
      <div className='flex gap-x-2 justify-start items-center w-full'>
        <label htmlFor='phone' className='font-bold text-gray-700 uppercase text-sm'>
          Phone {isRequired && <span className='text-red-500'>*</span>}
        </label>
        <span className='text-xs text-gray-600 font-normal'>(Verified with SMS code)</span>
      </div>

      {(errors.phoneNumber || errors.phoneExt) && (
        <p className='text-sm text-red-400'>
          {errors.phoneNumber ? errors.phoneNumber.message : errors.phoneExt.message }
        </p>
      )}

      <div className='flex justify-start items-center gap-x-2'>
        <div className='relative'>
          <input
            {...register('phoneExt', { required: { value: true, message: 'Phone extension & phone number is required *' } })}
            id='phoneExt'
            name='phoneExt'
            type='tel'
            className={`w-[70px] pl-6 pr-2 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out ${classes}`}
            placeholder='1'
            maxLength={4}
            onKeyPress={handleOnlyNumbers}
            defaultValue='1'
          />

          <div className='absolute top-3.5 left-2 text-xl font-bold text-gray-600'>+</div>
        </div>

        <input
          {...register('phoneNumber', { required: { value: true, message: 'Phone extension & phone number is required *' } })}
          id='phoneNumber'
          name='phoneNumber'
          type='tel'
          className={`w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out ${classes}`}
          placeholder='555 555 5555'
          maxLength={12}
          onKeyPress={handleOnlyNumbers}
        />
      </div>
    </div>
  )
}
