import { Checkbox, Modal } from '@mui/material'
import { Button } from 'components/common/Button'
import { Close as CrossIcon } from '@mui/icons-material'
import ContractTextHead from './ContractTextHead'
import EastIcon from '@mui/icons-material/East'
import { useState } from 'react'
import axios from 'axios'
import { useAuthStore } from 'lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'


interface ContractModalProps {
  open: boolean;
  onClose: () => void;
}

const ContractModal = ({ open, onClose }: ContractModalProps) => {
  const logoSrc = '/static/wellness/wellness_logo.svg'
  const logoAlt = 'Wellness Logo'
  const [checkedValue, setCheckedValue] = useState(false)
  const { auth, setAuth } = useAuthStore()

  const handleCertificateSubmit = () => {
    const token = getLocalStorage('accessToken')
    if (checkedValue) {
      axios.post('/api/user/isCertified', { isCertified: checkedValue }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((result) => {
          if (result.data.result[0] === 1) {
            setAuth({ ...auth, isCertified: checkedValue })
            onClose()
          } else {
            alert('error while confirming certificate')
            onClose()
          }
        })
        .catch((e) => {
          console.log('error while setting certification', e)
          alert('error while confirming certificate')
          onClose()
        })
    } else {
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
        <div className='bg-white rounded-xl p-10 w-9/12 my-20 ml-10'>

          <div className='flex flex-row justify-between'>
            <div className='w-11/12'>
              <img src={logoSrc} alt={logoAlt} className='w-32 3xl:w-36' />
            </div>
            <div>
              <CrossIcon onClick={onClose} className='text-5xl' />
            </div>
          </div>
          <br></br>
          <div className='flex flex-row'>
            <div className='flex flex-row'>
              <div className='flex w-[80%]'>
                <div className='w-10 flex'>
                  <img src='/static/wellness/line.png' className='' />
                </div>
                <div className='w-10/12  ml-6'>
                  <div className='mb-28'>
                    <ContractTextHead
                      smallHeading="The Snap Wellness and WeightCare Partnership"
                      bigHeading="It is Weight Loss Simplified!"
                      smallHeading2="IBOs Please DO"
                    />
                    <br />
                    <ul className='text-xl list-disc font-medium leading-8'>
                      <li>Talk about your or friends previous weight loss experiences, challenges, starting the Weightcare program and your experience with the medication</li>
                      <li>Speak on what’s included in the program:
                        <ol className='list-decimal font-normal'>
                          <li className='ml-5 mt-2'>Initial telehealth with a board certified physician</li>
                          <li className='ml-5'>Medication + Prescription</li>
                          <li className='ml-5'>Anti Nausea medication + prescription (to help with nausea)</li>
                          <li className='ml-5'>Chat with physician through a secured chat system at anytime</li>
                          <li className='ml-5'>Monthly check-ins with the physician</li>
                          <li className='ml-5'>Nutrition and exercise tips</li>
                          <li className='ml-5'>Hands on support from our staff</li>
                        </ol>
                      </li>
                      <li>Focus on medication + overall lifestyle changes you are making, ie: changes in your diet, exercise, etc.</li>
                      <li>Offer tips, advice, and strategies for getting the most out of the program, eating and snacking while on the medication, dealing with any side effects etc.</li>
                      <li>Beyond weight loss, talk about the impact losing weight has had on your life ( ie -activities you can do or enjoy, how you feel about yourself, etc)</li>
                      <li>Be transparent about your affiliation: Clearly disclose your partnership with WeightCare</li>
                    </ul>
                  </div>

                  <div className='mb-28'>
                    <ContractTextHead
                      smallHeading="The Snap Wellness and WeightCare Partnership"
                      bigHeading="It is Weight Loss Simplified!"
                      smallHeading2="IBOs Please DON'T "
                    />
                    <br />
                    <ul className='text-xl list-disc font-medium leading-8'>
                      <li>Making outright claims or promises</li>
                      <li>Using terms such as; miracle drug…</li>
                      <li>Don’t mention anything around clinical data</li>
                      <li>Don’t mention any of the brand names (Wegovy, Ozempic) (trademark infringement)</li>
                      <li>Don’t give any type of medical advice</li>
                      <li>Don’t use terms such as: “Generic Semaglutide” (Compounded Semaglutide is the more appropriate term)</li>
                    </ul>
                    <br></br>
                    <p className="text-black-800 text-3xl font-semibold">Customer Service</p>
                    <div className='bg-lime-100 px-4 py-2 rounded mt-2 w-11/12 text-center'><p>Only applicable on first orders. Subsequent orders will be charged on the WeightCare website.</p></div>
                    <br />
                    <p className="text-black-800 text-3xl font-semibold mb-2">SNAP IBOs</p>
                    <ul className='text-xl list-disc font-medium leading-8'>
                      <li>Only discuss payment with the customer; any details around medical, shipping, and order status… will need to be sent to the WeightCare team.</li>
                      <li>WeightCare will provide a daily list of all customers who need a refund issued.</li>
                      <li>There will need to be constant communication between SNAP, CS, and WeightCare CS to ensure customers are not requesting refunds if service has been provided.</li>
                    </ul>
                  </div>

                  <div>
                    <div>
                      <h1 className="text-textAcent-600 text-4xl font-bold mt-2 uppercase">IBO WEightCare Certification</h1>
                      <p className="text-gray-600 text-base font-medium">Will be available in the back office soon.</p>
                      <p className="text-textAcent-600 text-xl font-semibold">You will need to agree to the following:</p>
                    </div>
                    <br />
                    <p className='text-black-800 text-xl'>
                      I understand that by offering the WeightCare product to any consumer by any means (verbal, written, electronic, etc.), that I am agreeing to be held liable for the marketing of the product to that consumer. As such, I understand and agree that I cannot:
                    </p>
                    <br />
                    <ul className='text-xl list-disc font-medium ml-5'>
                      <li>Make any outright product claims and/or promises</li>
                      <br />
                      <li>Use terms that would lead to a misunderstanding or misrepresentation of the effectiveness and efficacy of the product</li>
                      <br />
                      <li>Discuss any clinical data</li>
                      <br />
                      <li>Mention any brand names</li>
                      <br />
                      <li>Provide anything that could be construed as medical advice</li>
                      <br />
                      <li>Use any term to describe the composition of the product other than "Compounded Semaglutide"</li>
                      <br />
                    </ul>
                  </div>
                </div>
              </div>
              <div className='flex w-[30%]'>
                <div className='w-[100%] flex flex-col-reverse items-end justify-end mt-4'>
                  <img src='/static/wellness/contract-01.svg' className='mt-[30%]' />
                  <img src='/static/wellness/contract-02.svg' className='mt-[80%]' />
                  <img src='/static/wellness/contract-03.svg' />
                </div>
              </div>
            </div>
          </div>
          <div className='px-10 py-10 bg-gray-200 rounded-xl m-12 mt-0'>
            <div className='border-b-2 border-slate-300 pb-5'>
              <p>Violation of these terms will result in the immediate termination of your IBO Agreement and result in your full legal and civil liability with regard to any consumer complaints and/or lawsuits. Please contact <b>compliance@mysnappartners.com</b> with any questions</p>
            </div>
            <div className='flex flex-row items-center pt-5'>
              <Checkbox checked={checkedValue} onChange={(e) => { setCheckedValue(!checkedValue) }} />
              <p>By checking this box, I agree to be bound to the terms of the Snap Partners WeightCare Certification.</p>
            </div>
          </div>
          <div className='text-center md:text-left flex justify-center items-center'>
            <Button
              classes='text-lg  bg-primary-500 rounded-lg px-2 px-7 py-3 w-[10%] flex flex-row justify-between'
              onClick={() => {
                handleCertificateSubmit()
              }}
            >
              <div>
                Okay
              </div>
              <div>
                <EastIcon />
              </div>
            </Button>
          </div>
        </div>
      </div>

    </Modal>
  )
}

export default ContractModal
