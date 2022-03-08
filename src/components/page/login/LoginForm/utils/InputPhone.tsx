import { Controller, FieldErrors } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'

interface IInputFormProps {
  errors?: any
  rulesForm?: FieldErrors
  classes?: string
  control: any
}

export const InputPhone = ({ errors, control }: IInputFormProps) => {
  return (
    <div className='w-full'>
      {(errors.credentialProvider) && (
        <p className='text-sm text-red-400'>
          {errors.credentialProvider && errors.credentialProvider.message}
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
              inputProps={{
                autoComplete: 'on',
                className: 'w-full bg-gray-300 py-1 pl-12 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
              }}
            />
          )}
        />
      </div>
    </div>
  )
}
