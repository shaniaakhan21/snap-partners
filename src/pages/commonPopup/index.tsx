/* eslint-disable eqeqeq */
import { Button, Checkbox, FormControlLabel, Modal, Radio } from '@mui/material'
import { Close as CrossIcon, East } from '@mui/icons-material'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useAuthStore } from 'lib/stores/Auth'
import axios from 'axios'
import states from 'data/states'
import CommonPopup from './common'
import InFields from './common/individualFields'
import BussFields from './common/bussinessFields'
import BusinessDocPopup from './common/businessDoc'
import CustomHelpModal from './common/AlertPop'

interface TINPopupProps {
    open: boolean;
    onClose: () => void;
}

const TINPopup = ({ open, onClose }: TINPopupProps) => {
  const { auth, setAuth } = useAuthStore()
  const [validated, setValidated] = useState(false)
  const [filed, setFiled] = useState(false)
  const [socialSecurity, setSocialSecurity] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [socialSecurityError, setSocialSecurityError] = useState('')
  const [einError, setEINError] = useState('')
  const [dateOfBirthError, setDateOfBirthError] = useState('')
  const [bStartDateError, setBStartDateError] = useState('')
  const [addressError, setAddressError] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZipCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showFailedPopup, setShowFailedPopup] = useState(false)
  const [selectedOption, setSelectedOption] = useState<'Individual' | 'Business'| null>(null)
  const [business_type, setBusinessType] = useState('')
  const [ein, setEin] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [b_start_date, setBStartDate] = useState<Date | null>(null)
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [showBDocPopup, setShowBdocPopup] = useState(false)
  const isMounted = useRef(true)
  const [showHelpPopup, setShowHelpPopup] = useState(false)
  const deadlineDate = new Date('2024-01-15')

  const handleClosePopup = () => {
    const currentDate = new Date()

    if (currentDate >= deadlineDate) {
      setShowHelpPopup(true)
    } else {
      onClose()
    }
  }

  const handleHelpPopupClose = () => {
    setShowHelpPopup(false)
  }

  useEffect(() => {
    return () => {
      isMounted.current = false
    }
  }, [])

  const handleOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedOption((prevOption) => {
      return event.target.value as 'Individual' | 'Business'
    })
    setFiled(true)
  }

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false)
  }
  const handleCloseFailedPopup = () => {
    setShowFailedPopup(false)
  }

  const handleBDOcClosePopup = () => {
    setShowBdocPopup(false)
  }

  const handleSocialSecurityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const pattern = /^[0-9]{9}$/

    if (!pattern.test(value) || value === '123456789') {
      setSocialSecurityError('Please enter a valid Social Security number')
    } else {
      setSocialSecurityError('')
    }

    setSocialSecurity(value)
  }

  const handleEINChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const pattern = /^[0-9]{9}$/

    if (!pattern.test(value) || value === '123456789') {
      setEINError('Please enter a valid EIN')
    } else {
      setEINError('')
    }

    setEin(value)
  }

  const handleBStartDateChange = (date: Date | null) => {
    if (date) {
      setBStartDate(date)
      setBStartDateError('')
    } else {
      setBStartDateError('Date of Start is required')
    }
  }

  const handleDateOfBirthChange = (date: Date | null) => {
    if (date) {
      setDateOfBirth(date)
      setDateOfBirthError('')
    } else {
      setDateOfBirth(new Date())
      setDateOfBirthError('Date of Birth is required')
    }
  }

  const handleStreetChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setAddressError('')
    setStreet(value)
  }

  const handleCityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setAddressError('')
    setCity(value)
  }

  const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setAddressError('')
    setState(value)
  }

  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    const truncatedValue = value.slice(0, 5)
    setZipCode(truncatedValue)
    if (truncatedValue.length === 5 && /^\d+$/.test(truncatedValue)) {
      setAddressError('')
    } else {
      setAddressError('Zip code must be exactly 5 digits')
    }
  }

  const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setBusinessType(value)
  }

  const handleBusinessNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setBusinessName(value)
  }
  const handleLastNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setLastName(value)
  }
  const handleFirstNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFirstName(value)
  }
  const validateUser = async () => {
    try {
      const response = await axios.post(
        '/api/user/isValidated',
        { isValidated: true },
        {
          headers: {
            Authorization: `Bearer ${auth.accessToken}`
          }
        }
      )

      if (response.data.result[0] === 1) {
        setAuth({ ...auth, isValidated: true })
        onClose()
      } else {
        alert('Error while confirming validation')
        onClose()
      }
    } catch (error) {
      alert('Error while confirming validation')
      onClose()
    }
  }

  const handleSubmitForIndividual = async () => {
    let hasErrors = false

    if (!socialSecurity) {
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

    if (!street || !city || !state || !zip) {
      setAddressError('Please fill all the Address Fields')
      hasErrors = true
    } else {
      setAddressError('')
    }

    if (!hasErrors) {
      onClose()

      try {
        if (isMounted.current) {
          await axios.post('/api/user/update-tin-status', { TINstatus: 'individual' }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.accessToken}`
            }
          })
          const updateDOBRequest = await axios.post('/api/user/update-dob', {
            dateOfBirth: dateOfBirth
          }, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.accessToken}`
            }
          })

          const updateSocialSecurity = async (socialSecurity) => {
            try {
              const response = await axios.post('/api/user/update-social-security-number', {
                socialSecurityNumber: socialSecurity
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.accessToken}`
                }
              })
              if (response.status === 200) {
                console.log('Social Security Number updated successfully')
              }
            } catch (error) {
              console.error('Error updating Social Security Number', error)
            }
          }

          const reviewSSN = async (socialSecurity) => {
            try {
              const response = await axios.post('/api/user/reviewSSN', {
                newSSN: socialSecurity
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.accessToken}`
                }
              })
              if (response.status === 200) {
                console.log('Social Security Number is under review')
              }
            } catch (error) {
              console.error('Error reviewing Social Security Number', error)
            }
          }
          const lastTwoDigitsInSSN = socialSecurity.substring(socialSecurity.length - 2)
          if (auth.socialSecurityNumber === null || auth.socialSecurityNumber === '') {
            updateSocialSecurity(socialSecurity)
            setShowSuccessPopup(true)
            await validateUser()
          } else {
            const lastTwoDigitsInAuthSSN = auth.socialSecurityNumber.substring(auth.socialSecurityNumber.length - 2)

            if (lastTwoDigitsInAuthSSN !== lastTwoDigitsInSSN) {
              reviewSSN(socialSecurity)
              setShowFailedPopup(true)
            } else if (lastTwoDigitsInAuthSSN === lastTwoDigitsInSSN) {
              setShowSuccessPopup(true)
            }
            await validateUser()
          }
          await axios.all([updateDOBRequest])

          const updateAddressRequest = await axios.post('/api/user/update-address', {
            state: state,
            street: street,
            city: city,
            zip: zip
          },
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`
            }
          })

          await validateUser()
          setCity(city)
          setState(state)
          setStreet(street)
          setZipCode(zip)
          setDateOfBirth(dateOfBirth)
          setBStartDate(b_start_date)
          setBusinessName(businessName)
          setBusinessType(business_type)
          setEin(ein)
          setFirstName(firstname)
          setLastName(lastname)
          await axios.all([updateAddressRequest])
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
  }

  const handleSubmitForBusiness = async () => {
    let hasErrors = false
    setIsLoading(true)

    if (!ein) {
      setEINError('Please enter a valid EIN')
      hasErrors = true
    } else {
      setEINError('')
    }

    if (!b_start_date) {
      setDateOfBirthError('Start Date of Business is required')
      hasErrors = true
    } else {
      setDateOfBirthError('')
    }

    if (!street || !city || !state || !zip) {
      setAddressError('Please fill all the Address Fields')
      hasErrors = true
    } else {
      setAddressError('')
    }

    if (!hasErrors) {
      try {
        if (isMounted.current) {
          await axios.get('/api/user/validateTIN', {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${auth.accessToken}`
            },
            params: {
              TIN: ein,
              LName: businessName
            }
          })
            .then(async (response) => {
              console.log('response from tin validation is', response.data.responseCode)
              await axios.post('/api/user/update-tin-status', {
                TINstatus: 'business',
                ein: ein,
                businessName: businessName
              }, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${auth.accessToken}`
                }
              })
              setEin(ein)
              setBusinessName(businessName)
              if (response.data.responseCode == '1' || response.data.responseCode == '6' || response.data.responseCode == '7' || response.data.responseCode == '8') {
                await axios.post('/api/user/verifyBusiness', {
                  businessValidationStatus: true
                }, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${auth.accessToken}`
                  }
                })
                const updateBusinessFields = await axios.post('/api/user/update-business-fields', {
                  // businessName: businessName,
                  // ein: ein,
                  b_start_date: b_start_date,
                  business_type: business_type,
                  name: firstname,
                  lastname: lastname
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                  }
                })
                console.log('Update Address Response:', updateBusinessFields.data) // Log the response from update-address
                await axios.all([updateBusinessFields])
                const updateAddressRequest = await axios.post('/api/user/update-address', {
                  state: state,
                  street: street,
                  city: city,
                  zip: zip
                },
                {
                  headers: {
                    Authorization: `Bearer ${auth.accessToken}`
                  }
                })
                await validateUser()
                setCity(city)
                setState(state)
                setStreet(street)
                setZipCode(zip)
                setDateOfBirth(dateOfBirth)
                setIsLoading(false)
                setBStartDate(b_start_date)
                setBusinessType(business_type)
                setFirstName(firstname)
                setLastName(lastname)
                await axios.all([updateAddressRequest])
                setShowBdocPopup(true)
                onClose()
                setIsLoading(false)
              } else {
                alert('ERROR: TIN number not validated')
                setIsLoading(false)
                onClose()
              }
            })
        }
      } catch (error) {
        setIsLoading(false)
      }
    }
  }
  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        className='overflow-y-scroll'
      >
        <div className='w-full flex justify-center'>
          <div className='bg-white rounded-xl p-2 md:p-4 md:px-10 md:pb-10 w-9/12 md:w-6/12 my-8 md:my-20 md:ml-10'>

            <div className='flex flex-row justify-end'>
              <div>
                <CrossIcon onClick={handleClosePopup} className='text-base md:text-2xl 2xl:text-5xl cursor-pointer' />
                {showHelpPopup && (
                  <CustomHelpModal isOpen={showHelpPopup} onClose={handleHelpPopupClose} />
                )}
              </div>
            </div>
            <div className='w-full lg:w-11/12'>
              <h1 className='text-base md:text-2xl 2xl:text-3xl font-semibold'>Request for Taxpayer Identification Number (W-9)</h1>
            </div>
            <div className='font-semibold py-4'>
              <p>By law Snap is required to generate 1099's by Jan 31. If you don't complete this process by Jan 15, you won't be able to exit out and your account will be frozen for further back office access until complete.</p>
            </div>
            <div className='p-4 rounded-lg bg-[#edfbe0]'>
              <h2 className='text-sm md:text-lg 2xl:text-xl font-normal'><span className='text-base lg:text-xl 2xl:text-2xl text-[#FA4616] font-medium'>Purpose</span> Required to generate a 1099 for the 2023 tax year</h2>
            </div>
            <div className='flex flex-col lg:flex-row w-full justify-between mt-4 p-4 rounded-lg bg-[#dd4c3733] border-[#DD4C37] border-2 items-center mb-2'style={{ boxShadow: '0px 0px 6px 2px #ff200045' }}>
              <h2 className='text-sm md:text-lg 2xl:text-xl font-semibold'><span className='underline'>Step 1</span> : I want to file as an?</h2>
              <FormControlLabel
                value="Individual"
                control={<Radio checked={selectedOption === 'Individual'} onChange={handleOptionChange} />}
                label="Individual"
                sx={{
                  '@media (max-width:600px)': {
                    '.MuiFormControlLabel-label': {
                      fontSize: '0.8rem'
                    },
                    '.MuiSvgIcon-root': {
                      width: '16px',
                      height: '16px'
                    }
                  }
                }}
              />
              <FormControlLabel
                value="Business"
                control={<Radio checked={selectedOption === 'Business'} onChange={handleOptionChange} />}
                label="Business"
                sx={{
                  '@media (max-width:600px)': {
                    '.MuiFormControlLabel-label': {
                      fontSize: '0.8rem'
                    },
                    '.MuiSvgIcon-root': {
                      width: '16px',
                      height: '16px'
                    }
                  }
                }}
              />
            </div>

            {selectedOption === 'Individual' && (
              <InFields
                socialSecurity={socialSecurity}
                handleSocialSecurityChange={handleSocialSecurityChange}
                socialSecurityError={socialSecurityError}
                dateOfBirth={dateOfBirth}
                handleDateOfBirthChange={handleDateOfBirthChange}
                dateOfBirthError={dateOfBirthError}
              />
            )}

            {selectedOption === 'Business' && (
              <BussFields
                ein={ein}
                handleEINChange={handleEINChange}
                einError={einError}
                dateOfStart={b_start_date}
                handleDateOfStartChange={handleBStartDateChange}
                dateOfStartError={bStartDateError}
                businessType={business_type}
                handleTypeChange={handleTypeChange}
                businessName={businessName}
                firstname={firstname}
                lastname={lastname}
                handleBusinessNameChange={handleBusinessNameChange}
                handleLastNameChange={handleLastNameChange}
                handleFirstNameChange={handleFirstNameChange} />
            )}

            <div className='p-2 rounded-lg'>
              <h1 className='font-semibold text-base md:text-base 2xl:text-lg'>ADDRESS : </h1>
              <div className='flex flex-col md:flex-row w-full justify-between mt-2'>
                <div className='p-2 md:p-4 border-2 w-full md:w-[48%] rounded-lg border-slate-200 bg-[#F9F9FA]  mb-2 md:mb-0'>
                  <input
                    className="w-full outline-none bg-[#F9F9FA]"
                    placeholder="STREET"
                    value={street}
                    onChange={handleStreetChange}
                    required
                  />
                </div>
                <div className='p-2 md:p-4 border-2 w-full md:w-[48%] rounded-lg border-slate-200 bg-[#F9F9FA]'>
                  <input
                    className="w-full outline-none bg-[#F9F9FA]"
                    placeholder="CITY"
                    value={city}
                    onChange={handleCityChange}
                    required
                  />
                </div>
              </div>
              <br/>
              <div className='flex flex-col md:flex-row w-full justify-between '>
                <div className='p-2 md:p-4 border-2 w-full md:w-[48%] rounded-lg border-slate-200 bg-[#F9F9FA] mb-2 md:mb-0'>
                  <select
                    id='state-select'
                    value={state}
                    onChange={handleStateChange}
                    className={`rounded-none rounded-tl-xl rounded-bl-xl border-0 appearance-none w-full uppercase bg-[#F9F9FA] ${state === '' ? 'placeholder-option' : ''}`}
                    style={{ backgroundImage: 'none' }}
                  >
                    <option value=''>Select a state</option>
                    {states.map((state) => (
                      <option key={state} value={state} >
                        {state}
                      </option>
                    ))}
                  </select>

                </div>
                <div className='p-2 md:p-4 border-2 w-full md:w-[48%] rounded-lg border-slate-200 bg-[#F9F9FA]'>
                  <input
                    className="w-full outline-none bg-[#F9F9FA]"
                    placeholder="ZIPCODE"
                    value={zip}
                    onChange={handleZipCodeChange}
                    required
                  />
                </div>
              </div>
            </div>
            {addressError && <div className="text-red-500">{addressError}</div>}
            <br />
            <div className='w-full'>
              <FormControlLabel
                className='items-start italic text-[#4A4A4A]'
                control={<Checkbox checked={validated} onChange={() => setValidated(!validated)} color="default" className='pl-3 pr-1 pt-1' />}
                label="Under penalties of perjury, I certify that: 1. The number shown on this form is my correct taxpayer identification number (or I am waiting for a number to be issued to me); and 2. I am not subject to backup withholding because: (a) I am exempt from backup withholding, or (b) I have not been notified by the Internal Revenue Service (IRS) that I am subject to backup withholding as a result of a failure to report all interest or dividends, or (c) the IRS has notified me that I am no longer subject to backup withholding; and 3. I am a U.S. citizen or other U.S. person."
                sx={{
                  '@media (max-width:600px)': {
                    '.MuiFormControlLabel-label': {
                      fontSize: '0.6rem'
                    }
                  }
                }}
              />
            </div>
            <br />

            <div className='w-full flex justify-center'>
              <Button
                type="submit"
                variant="contained"
                className={`send-button text-sm md:text-xl rounded-xl text-center  px-4 md:px-16 capitalize py-2 md:py-4 ${
                  validated
                    ? 'bg-primary-500 text-white'
                    : 'bg-grey text-blackCustom'
                }`}
                disabled={!validated || !filed || isLoading}
                onClick={() => {
                  if (selectedOption === 'Individual') {
                    handleSubmitForIndividual()
                  } else if (selectedOption === 'Business') {
                    handleSubmitForBusiness()
                  }
                }}
              >
                    Submit
                <East className='ml-1'/>
              </Button>
            </div>
          </div>
        </div>

      </Modal>
      {showSuccessPopup && (
        <CommonPopup
          image="/static/success.svg"
          title="Success"
          description="Snap has updated your profile"
          buttonText="Back To Home"
          svgId="popupImage-success"
          open={showSuccessPopup}
          onClose={handleCloseSuccessPopup} showDocumentUpload={false} />
      )}
      {showFailedPopup && (
        <CommonPopup
          image="/static/error.svg"
          title="Snap cannot update your profile"
          description="Reason: Since your involvement with Snap, you have submitted two different social security #’s. "
          buttonText="Proceed with document verification"
          svgId="popupImage-failed"
          open={showFailedPopup}
          onClose={handleCloseFailedPopup}
          showDocumentUpload={true}
          auth={auth} setAuth={setAuth} docURL={auth.SSNDocURL} />
      )}
      {showBDocPopup && (
        <BusinessDocPopup open={showBDocPopup} onClose={handleBDOcClosePopup} auth={auth} setAuth={setAuth} docIrsURL={auth.doc_irs} docFormURL={auth.doc_b_structure}/>
      )}
    </>
  )
}

export default TINPopup
