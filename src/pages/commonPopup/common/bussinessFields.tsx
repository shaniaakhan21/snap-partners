import { ChangeEvent } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'

interface BussinessInfoSectionProps {
  ein: string;
  handleEINChange: (event: ChangeEvent<HTMLInputElement>) => void;
  einError: string;
  dateOfStart: Date | null;
  handleDateOfStartChange: (date: Date | null) => void;
  dateOfStartError: string;
  businessType: string;
  businessName: string;
  firstname: string;
  lastname: string;
  handleTypeChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  handleBusinessNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleLastNameChange:(event: ChangeEvent<HTMLInputElement>) => void;
  handleFirstNameChange:(event: ChangeEvent<HTMLInputElement>) => void;
}

const BussFields = ({ ein, handleEINChange, einError, dateOfStart, handleDateOfStartChange, handleFirstNameChange, handleLastNameChange, handleBusinessNameChange, businessName, firstname, lastname, dateOfStartError, businessType, handleTypeChange }: BussinessInfoSectionProps) => {
  return (
    <>
      <div className='flex flex-row w-full justify-between mt-5'>
        <div className='w-[48%] '>
          <div className='p-4 border-2 rounded-lg border-slate-200 bg-[#F9F9FA]'>
            <input
              className="w-full outline-none bg-[#F9F9FA]"
              placeholder="Business Name"
              type='text'
              value={businessName}
              onChange={handleBusinessNameChange}
              required
            />
          </div>
        </div>
        <div className='p-4 border-2 w-[48%] rounded-lg border-slate-200 bg-[#F9F9FA]'>
          <select
            id='state-select'
            value={businessType}
            onChange={handleTypeChange}
            className={`rounded-none rounded-tl-xl rounded-bl-xl border-0 appearance-none w-full bg-[#F9F9FA] ${businessType === '' ? 'placeholder-option' : ''}`}
            style={{ backgroundImage: 'none' }}
          >
            <option value=''>Business Type</option>
            <option value="Individual/sole proprietor or LLC">Individual/sole proprietor or LLC</option>
            <option value="C Corporation">C Corporation</option>
            <option value="S Corporation">S Corporation</option>
            <option value="Partnership">Partnership</option>
            <option value="Trust/estate">Trust/estate</option>
          </select>
        </div>
      </div>
      <div className='flex flex-row w-full justify-between mt-5'>
        <div className='w-[48%] '>
          <div className='p-4 border-2 rounded-lg border-slate-200 icon-input bg-[#F9F9FA]'>
            <input
              className="w-full outline-none"
              placeholder="EIN"
              type='text'
              value={ein}
              onChange={handleEINChange}
              required
            />
          </div>
          {einError && <div className="ml-1 text-red-500">{einError}</div>}
        </div>
        <div className='w-[48%] p-0 m-0 border-0 rounded-lg border-slate-200 outline-none'>
          <div className="calendar-input outline-none">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="Start of business" value={dateOfStart}
                onChange={handleDateOfStartChange} className='outline-none' />
              {dateOfStartError && <div className="text-red-500">{dateOfStartError}</div>}
            </LocalizationProvider>
          </div>
        </div>
      </div>
      <div className='flex flex-row w-full justify-between mt-5'>
        <div className='w-[48%] '>
          <div className='p-4 border-2 rounded-lg border-slate-200 bg-[#F9F9FA]'>
            <input
              className="w-full outline-none bg-[#F9F9FA]"
              placeholder="Owner First Name"
              type='text'
              value={firstname}
              onChange={handleFirstNameChange}
              required
            />
          </div>
        </div>
        <div className='w-[48%] '>
          <div className='p-4 border-2 rounded-lg border-slate-200 bg-[#F9F9FA]'>
            <input
              className="w-full outline-none bg-[#F9F9FA]"
              placeholder="Owner Last Name"
              type='text'
              value={lastname}
              onChange={handleLastNameChange}
              required
            />
          </div>
        </div>
      </div>
      <br/>
    </>
  )
}

export default BussFields
