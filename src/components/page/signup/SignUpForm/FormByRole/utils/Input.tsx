import { HTMLInputTypeAttribute, CSSProperties } from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IInputFormProps {
  id?: string,
  name?: string,
  label?: string,
  autoComplete?: string,
  type?: HTMLInputTypeAttribute,
  classes?: string,
  placeholder?: string,
  registerId?: any
  register?: UseFormRegister<any>,
  errors?: any,
  rulesForm?: FieldErrors,
  defaultValue?: string | string[] | number | null
  control?: any
  isRequired: boolean
  onKeyPress?: (event: any) => void
  isNumberFloat?: boolean
  disabled?: boolean
  readOnly?: boolean
  helpText?: string
  style?: CSSProperties
}

export const InputForm = ({
  id,
  name,
  label,
  autoComplete,
  type,
  classes,
  placeholder,
  defaultValue,
  register,
  registerId,
  errors,
  rulesForm,
  control,
  isRequired,
  onKeyPress,
  isNumberFloat,
  disabled,
  readOnly,
  helpText,
  style
}: IInputFormProps) => {
  return (
    <div className='w-full'>
      <label htmlFor={id} className='font-semibold text-gray-600 text-md'>
        {label} {' '}
        {
          isRequired && <span className='text-red-500'>*</span>
          // : <span className='text-xs text-gray-600 capitalize font-normal'>(Is Optional)</span>
        }
      </label>
      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}

      <input
        {...register(registerId, rulesForm)}
        id={id}
        name={name}
        type={type}
        readOnly={readOnly}
        autoComplete={autoComplete}
        className={`w-full px-3 py-1 my-2 text-base text-black border-2 border-gray-200 rounded-lg outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-10 transition-colors duration-200 ease-in-out placeholder:text-black ${classes}`}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyPress={onKeyPress}
        step={isNumberFloat ? '0.01' : 'any'} 
        disabled={disabled}
      />
      {helpText && <div style={style} className='text-xs text-gray-700 font-semibold -mt-1 mb-2 p-3 bg-gray-100 rounded mb-4 text-center'>{helpText}</div>}
    </div>
  )
}
 