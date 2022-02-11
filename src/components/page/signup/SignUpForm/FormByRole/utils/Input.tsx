import { HTMLInputTypeAttribute } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { IDataForm, registerFormIds } from './types'

interface IInputFormProps {
  id?: string,
  name?: string,
  label?: string,
  autoComplete?: string,
  type?: HTMLInputTypeAttribute,
  classes?: string,
  placeholder?: string,
  registerId?: registerFormIds
  register?: UseFormRegister<IDataForm>,
  errors?: any,
  rulesForm?: FieldErrors,
  defaultValue?: string | string[] | number | null
  control?: any
}

export const InputForm = ({ id, name, label, autoComplete, type, classes, placeholder, defaultValue, register, registerId, errors, rulesForm, control }: IInputFormProps) => {
  return (
    <div>
      <label htmlFor={id} className='font-bold text-gray-700 uppercase text-sm'>{label}</label>
      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}

      <input
        {...register(registerId, rulesForm)}
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        className={`w-full px-3 py-1 my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out ${classes}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
      />
    </div>
  )
}
