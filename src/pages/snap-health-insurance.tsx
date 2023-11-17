/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react'
import InsuranceHeader from './insurance/insurance-header'
import {
  Button
} from '@mui/material'
import states from '../data/states'
import RegistrationForm from './insurance/registrationForm'
import axios from 'axios'
import { useRouter } from 'next/router'
import InsuranceFooter from './insurance/insurance-footer'

const insurance = () => {
  const router = useRouter()
  const [state, setSelectedState] = React.useState('')
  const [showRegistrationForm, setShowRegistrationForm] = React.useState(false)
  const [IboId, setIboId] = React.useState(0)
  const [ownerName, setownerName] = React.useState(null)
  const [referralCode, setreferralCode] = React.useState(null)
  const handleStateChange = (event) => {
    setSelectedState(event.target.value)
  }

  const handleContinueClick = () => {
    if (!state.includes('(Not Available)')) {
      setShowRegistrationForm(true)
    }
  }

  useEffect(() => {
    async function Owner () {
      console.log('owneeeeeeeeeeer')
      try {
        const { referralCode } = router.query
        const username = referralCode
        if (!username) return
        if (username === 'NoSponsor') return
        if (username.length > 0) {
          const response = await axios.get(
            `/api/integrous/getReplicatedSite?username=${username}`
          )
          setreferralCode(response.data.referralCode)
          setownerName(`${response.data.name} ${response.data.lastname}`)
          setIboId(Number(`${response.data.id}`))
        }
      } catch (error) {
        console.log(error)
      }
    }
    Owner()
  }, [router])
  return (
    <>
      <InsuranceHeader />
      {showRegistrationForm
        ? (
          <RegistrationForm state={state} ownerName={ownerName} IboId={IboId} />
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
                    value={state}
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
                  ${state && !state.includes('(Not Available)') ? 'bg-customred text-white' : 'bg-grey text-blackCustom'}`}
                  disabled={!state || state.includes('(Not Available)')}
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
      <InsuranceFooter ownerName={ownerName}/>
    </>
  )
}

export default insurance
