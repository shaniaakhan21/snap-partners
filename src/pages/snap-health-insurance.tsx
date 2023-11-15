/* eslint-disable no-use-before-define */
import React from 'react'
import InsuranceHeader from './insurance/insurance-header'
import {
  Button
} from '@mui/material'
import states from '../data/states'
import RegistrationForm from './insurance/registrationForm'
const insurance = () => {
  const [selectedState, setSelectedState] = React.useState('')
  const [showRegistrationForm, setShowRegistrationForm] = React.useState(false)

  const handleStateChange = (event) => {
    setSelectedState(event.target.value)
  }

  const handleContinueClick = () => {
    if (!selectedState.includes('(Not Available)')) {
      setShowRegistrationForm(true)
    }
  }

  const handleGoBack = () => {
    setShowRegistrationForm(false)
  }
  return (
    <>
      <InsuranceHeader />
      {showRegistrationForm
        ? (
          <RegistrationForm onGoBack={handleGoBack} />
        )
        : (
          <div className='flex flex-col sm:flex-row'>
            <div className='w-[95%] sm:w-[45%] m-4 sm:m-8 md:m-12 2xl:m-36'>
              <h1 className='text-blackCustom font-bold text-xl sm:text-3xl xl:text-4xl 2xl:text-5xl'>
            Get Started with a Qualified <br></br>
                <span className='text-customred'>Health Insurance </span>
            Agent Today!
              </h1>
              <br></br>
              <h1 className='text-blackCustom font-bold text-xl sm:text-3xl xl:text-4xl 2xl:text-5xl mb-2'>Step 1</h1>
              <h2 className='text-blackCustom font-medium text-xl xl:text-2xl 2xl:text-3xl'>Choose the state where you reside below</h2>
              <br></br>
              <br></br>
              <div className='w-[95%] flex'>
                <div className='rounded-none rounded-tl-xl rounded-bl-xl border-0 w-[70%] sm:w-[40%] p-0 border-0  bg-[#efefef]'>
                  <select
                    id='state-select'
                    value={selectedState}
                    onChange={handleStateChange}
                    className='px-5 mt-1 sm:mt-4 rounded-none rounded-tl-xl rounded-bl-xl border-0 appearance-none font-medium w-full text-sm sm:text-lg  text-[#707070] bg-[#efefef]'
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value=''>Select a state</option>
                    {states.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
                <Button
                  variant='contained'
                  onClick={handleContinueClick}
                  className={`px-2 py-1 sm:px-10 sm:py-4 rounded-none shadow-none rounded-tr-xl rounded-br-xl text-sm sm:text-lg
                  ${selectedState && !selectedState.includes('(Not Available)') ? 'bg-customred text-white' : 'bg-grey text-blackCustom'}`}
                  disabled={!selectedState || selectedState.includes('(Not Available)')}
                >
            Continue
                </Button>
              </div>
            </div>
            <div className='w-[100%] sm:w-[55%]'>
              <div className='m-10 mr-26 flex justify-center'>
                <img className='w-[80%] sm:w-full'src='/static/FirstImage.png' alt="Happy family" />
              </div>
            </div>
          </div>
        )}
    </>
  )
}

export default insurance
