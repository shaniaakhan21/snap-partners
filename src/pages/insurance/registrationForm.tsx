import {
  Button,
  Checkbox,
  FormControlLabel
} from '@mui/material'
import { useState } from 'react'
import ConfirmationComponent from './confirmationComponent'
import { useForm } from 'react-hook-form'

export default function RegistrationForm ({ onGoBack }) {
  const {
    handleSubmit
  } = useForm()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)

  const onSubmit = (data) => {
    if (isCheckboxChecked) {
      setShowConfirmation(true)
    }
  }

  return (
    <div>
      {showConfirmation
        ? (
          <ConfirmationComponent onGoBack={onGoBack} />
        )
        : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col md:flex-row main-class'>
              <div className='w-[90%] md:w-[50%] 3xl:w-[40%] m-4 xs:m-12 sm:m-10 md:m-12 2xl:m-32 3xl:m-36'>
                <h1 className='text-blackCustom font-bold text-lg xs:text-xl sm:text-2xl 2xl:text-4xl'>
                    We have a range of options available, and qualifying for health insurance can be simpler than you might think.
                </h1>
                <br />
                <br />
                <h1 className='text-blackCustom font-bold text-xl sm:text-3xl 2xl:text-4xl 2xl:text-5xl'>Step 2</h1>
                <br />
                <br />
                <input
                  name="firstName"
                  placeholder="First Name"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <input
                  name="lastName"
                  placeholder="Last Name"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <input
                  name="phone"
                  placeholder="Phone"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <input
                  name="postalCode"
                  placeholder="Postal Code"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <input
                  name="annualHousehold"
                  placeholder="Annual Household"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <input
                  name="familySize"
                  type="number"
                  placeholder="Family Size"
                  className="w-full xs:w-11/12 md:w-10/12 bg-[#F5F5F5] p-3 custom-placeholder"
                  required
                />
                <br />
                <br />
                <FormControlLabel
                  className='flex items-start w-full xs:w-11/12 md:w-10/12 text-[10px] sm:text-xs'
                  control={
                    <Checkbox
                      color="primary"
                      className='pt-0'
                      checked={isCheckboxChecked}
                      onChange={(event) => setIsCheckboxChecked(event.target.checked)}
                    />
                  }
                  style={{ fontSize: '10px!important' }}
                  label="By filling out this form, you agree we may contact you by telephone or text message at any telephone number associated with your account, including wireless telephone numbers (i.e. cell phone numbers. You further agree methods of contact may include use of pre-recorded or artificial voice messages, and/or use of an automatic dialing device. If you have provided a wireless telephone number(s), you represent and agree you are the wireless subscriber or customary user with respect to the wireless telephone number(s) provided and have the authority to give this consent."
                />
                <br />
                <Button
                  type="submit"
                  variant="contained"
                  className={`send-button rounded-xl w-11/12 sm:w-10/12 capitalize ml-4 md:ml-0 py-2 xs:py-4 text-base ${
                    isCheckboxChecked
                      ? 'bg-customred text-white'
                      : 'bg-grey text-blackCustom'
                  }`}
                  disabled={!isCheckboxChecked}
                >
                    Send Information
                </Button>
              </div>
              <div className='hidden md:block w-[55%]'>
                <div className='m-10 mr-26'>
                  <img className='w-full'src='/static/SecondImage.png' alt="Happy family" />
                </div>
              </div>
            </div>
          </form>
        )}
    </div>
  )
}
