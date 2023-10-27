import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

interface IDatePickerProps {
  id?: string;
  name?: string;
  label?: string;
  registerId?: any;
  register?: UseFormRegister<any>;
  errors?: FieldErrors;
  isRequired: boolean;
}

export const DatePickerForm = ({
  id,
  name,
  label,
  register,
  registerId,
  errors,
  isRequired
}: IDatePickerProps) => {
  return (
    <div>
      <label htmlFor={id} className='font-bold text-gray-700 uppercase text-sm'>
        {label} {isRequired && <span className='text-red-500'>*</span>}
      </label>
      {errors && <p className='text-sm text-red-400'>{errors.message}</p>}

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          className='w-full my-2 text-base text-gray-700 bg-gray-100 border border-gray-300 rounded outline-none appearance-none bg-opacity-50 focus:border-brown-primary-500 focus:bg-white focus:ring-2 focus:ring-brown-primary-300 leading-8 transition-colors duration-200 ease-in-out'
        />
      </LocalizationProvider>

    </div>
  )
}
