import { FieldErrors } from 'react-hook-form'
import { registerFormIds } from './types'

interface IInputFormProps {
  id: string,
  name: string,
  label: string,
  autoComplete?: string,
  type: string,
  classes?: string,
  placeholder?: string,
  registerId: registerFormIds
  register: any
  errors: any,
  rulesForm: FieldErrors,
  defaultValue?: string | string[] | number | null
}

export const InputForm = ({ id, name, label, autoComplete, type, classes, placeholder, defaultValue, register, registerId, errors, rulesForm }: IInputFormProps) => {
  return (
    <div className='mb-2'>
      <label htmlFor={id} className='font-semibold text-gray-600 capitalize text-md'>{label}</label>
      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}

      <input
        {...register(registerId, rulesForm)}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className={`w-full px-3 py-1 my-2 text-base border-2 border-gray-200 rounded-lg outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-10 transition-colors duration-200 ease-in-out placeholder:text-black ${classes}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  )
}
