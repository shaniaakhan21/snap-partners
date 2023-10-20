import { Button, Checkbox, FormControlLabel, Modal } from '@mui/material'
import { Close as CrossIcon, ArrowForward, East } from '@mui/icons-material'
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers-pro'
import { ChangeEvent, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs'

interface TINPopupProps {
    open: boolean;
    onClose: () => void;
}

const TINPopup = ({ open, onClose }: TINPopupProps) => {
  const [certified, setCertified] = useState(false)
  const [socialSecurity, setSocialSecurity] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [address, setAddress] = useState('')
  const [socialSecurityError, setSocialSecurityError] = useState('')
  const [dateOfBirthError, setDateOfBirthError] = useState('')
  const [addressError, setAddressError] = useState('')

  const handleSocialSecurityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    // Define the regular expression pattern for Social Security
    const pattern = /^[0-9]{9}$/

    if (!pattern.test(value) || value === '123456789') {
      setSocialSecurityError('Please enter a valid Social Security number')
    } else {
      setSocialSecurityError('')
    }

    setSocialSecurity(value)
  }

  const handleDateOfBirthChange = (date: Date | null) => {
    setDateOfBirth(date)
    setDateOfBirthError('')
  }

  const handleSubmit = () => {
    // Validate all fields
    let hasErrors = false

    if (!socialSecurity || socialSecurity === '123456789') {
      setSocialSecurityError('Please enter a valid Social Security number')
      hasErrors = true
    } else {
      setSocialSecurityError('')
    }

    if (!dateOfBirth) {
      setDateOfBirthError('Date of Birth is required')
      hasErrors = true
    } else {
      setDateOfBirthError('')
    }

    if (!address) {
      setAddressError('Address is required')
      hasErrors = true
    } else {
      setAddressError('')
    }

    if (!hasErrors) {
      onClose()
    }
  }
  return (
    <Modal
      open={open}
      onClose={onClose}
      className='overflow-y-scroll'
    >
      <div className='w-full flex justify-center'>
        <div className='bg-white rounded-xl p-4 px-10 pb-10 w-6/12 my-20 ml-10'>

          <div className='flex flex-row justify-end'>
            <div>
              <CrossIcon onClick={onClose} className='text-5xl cursor-pointer' />
            </div>
          </div>
          <div className='w-11/12'>
            <h1 className='text-3xl font-semibold'>Request for Taxpayer Identification Number (W-9)</h1>
          </div>
          <br />
          <div className='p-4 rounded-lg bg-[#edfbe0]'>
            <h2 className='text-xl font-normal'><span className='text-2xl text-[#FA4616] font-medium'>Purpose</span> To generate a 1099 at end of year</h2>
          </div>
          <br />
          <div className='flex flex-row w-full justify-between'>
            <div className='w-[48%] '>
              <div className='p-4 border-2 rounded-lg border-slate-200 icon-input'>
                <input
                  className="w-full outline-none"
                  placeholder="Social Security"
                  value={socialSecurity}
                  onChange={handleSocialSecurityChange}
                  required
                />
              </div>
              {socialSecurityError && <div className="ml-1 text-red-500">{socialSecurityError}</div>}
            </div>
            <div className='w-[48%] p-0 m-0 border-0 rounded-lg border-slate-200 outline-none'>
              <div className="calendar-input outline-none">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date of Birth" value={dateOfBirth}
                    onChange={handleDateOfBirthChange} className='outline-none'/>
                  {dateOfBirthError && <div className="text-red-500">{dateOfBirthError}</div>}
                </LocalizationProvider>
              </div>
            </div>
          </div>
          <br/>
          <div className='flex flex-row w-full justify-between p-4 border-2 rounded-lg border-slate-200'>
            <FmdGoodOutlinedIcon className='text-[#9196A0] mr-2'/>
            <textarea
              className="w-full outline-none h-[150px]"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          {addressError && <div className="text-red-500">{addressError}</div>}
          <br />
          <div className='w-full'>
            <FormControlLabel
              className='items-start italic text-[#4A4A4A]'
              control={<Checkbox checked={certified} onChange={() => setCertified(!certified)} color="default" className='pl-3 pr-1 pt-1' />}
              label="Under penalties of perjury, I certify that: 1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and 2. I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and 3. I am a U.S. citizen or other U.S. person (defined below); and 4. The FATCA code(s) entered on this form (if any) indicating that I am exempt from FATCA reporting is correct."
            />
          </div>
          <br />
          <br />
          <div className='w-full flex justify-center'>
            <Button
              type="submit"
              variant="contained"
              className={`send-button text-xl rounded-xl text-center  px-16 capitalize py-4 text-base ${
                certified
                  ? 'bg-primary-500 text-white'
                  : 'bg-grey text-blackCustom'
              }`}
              disabled={!certified}
              onClick={handleSubmit}
            >
                    Submit
              <East className='ml-1'/>
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TINPopup
