import { ChangeEvent } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'

interface PersonalInfoSectionProps {
  socialSecurity: string;
  handleSocialSecurityChange: (event: ChangeEvent<HTMLInputElement>) => void;
  socialSecurityError: string;
  dateOfBirth: Date | null;
  handleDateOfBirthChange: (date: Date | null) => void;
  dateOfBirthError: string;
}

const InFields = ({ socialSecurity, handleSocialSecurityChange, socialSecurityError, dateOfBirth, handleDateOfBirthChange, dateOfBirthError }: PersonalInfoSectionProps) => {
  return (
    <>
      <div className='flex flex-col md:flex-row w-full justify-between mt-5'>
        <div className='w-full md:w-[48%] mb-4 md:mb-0'>
          <div className='p-2 md:p-4 border-2 rounded-lg border-slate-200 icon-input bg-[#F9F9FA]'>
            <input
              className="w-full outline-none"
              placeholder="Social Security"
              type='text'
              value={socialSecurity}
              onChange={handleSocialSecurityChange}
              required
            />
          </div>
          {socialSecurityError && <div className="ml-1 text-red-500">{socialSecurityError}</div>}
        </div>
        <div className='w-full md:w-[48%] p-0 m-0 border-0 rounded-lg border-slate-200 outline-none'>
          <div className="calendar-input outline-none">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Date of Birth" value={dateOfBirth}
                onChange={handleDateOfBirthChange} className='outline-none' />
              {dateOfBirthError && <div className="text-red-500">{dateOfBirthError}</div>}
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <br/>
    </>
  )
}

export default InFields
