import { FieldErrors, UseFormRegister, Controller } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

interface IInputFormProps {
  register?: UseFormRegister<any>
  errors?: any
  rulesForm?: FieldErrors
  classes?: string
  isRequired: boolean
  withVerifyCode: boolean
  label?: string
  control: any
}

export const InputPhone = ({ errors, register, classes, isRequired, withVerifyCode, label, control }: IInputFormProps) => {
  return (
    <div className='flex flex-col justify-start items-start gap-x-2 my-2'>
      <div className='flex gap-x-2 justify-start items-center w-full'>
        <label htmlFor='phone' className='font-semibold text-gray-600 text-md'>
          {
            label
              ? <p>{label} {isRequired && <span className='text-red-500'>*</span>}</p>
              : <p>Phone {isRequired && <span className='text-red-500'>*</span>}</p>
          }
        </label>
        {
          withVerifyCode && <span className='text-sm text-gray-600 font-normal'>(Verified with SMS code)</span>
        }
      </div>

      {(errors.phoneNumber || errors.phoneExt) && (
        <p className='text-sm text-red-400'>
          {errors.phoneNumber ? errors.phoneNumber.message : errors.phoneExt.message }
        </p>
      )}

      <div className='w-full flex justify-start items-center gap-x-2'>
        <Controller
          control={control}
          name='phoneNumber'
          render={({ field }) => (
            <PhoneInput
              country={'us'}
              {...field}
              containerClass='my-2'
              countryCodeEditable={false}
              inputProps={{
                autoComplete: 'on',
                className: 'w-full py-1 pl-12 text-base text-black bg-white border-2 border-gray-200 rounded-lg outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-10 transition-colors duration-200 ease-in-out placeholder:text-black'
              }}
            />
          )}
        />
      </div>
    </div>
  )
}
