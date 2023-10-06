import { Accordion, AccordionSummary, AccordionDetails, Typography, Modal } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button } from 'components/common/Button'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ProgramCardList from './ProgramCardList'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Router from 'next/router'

const WeightCare = ({ isLoggedIn, referralCode }) => {
  const [nmiVariables, setNmiVariables] = useState({
    order_description: '',
    hash: ''
  })

  const [open, setOpen] = useState(false)

  const handleLogin = () => {
    const referralCodeFromLocalStorage = localStorage.getItem('referralCode')
    const queryParams = new URLSearchParams(window.location.search)
    const referralCodeFromQuery = queryParams.get('referralCode')
    const referralCode = referralCodeFromLocalStorage || referralCodeFromQuery || 'NoSponsor'

    let loginRoute = '/auth/login-wellness?referralCode=' + referralCode

    if (window.location.pathname.includes('integrousWellness')) {
      loginRoute += '&redirectToIntegrousWellness=true'
    } else if (window.location.pathname.includes('WeightCare')) {
      loginRoute += '&redirectToWeightCare=true'
    }

    Router.push(loginRoute)
  }
  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    const getNmiVars = async () => {
      if (isLoggedIn) {
        const token = localStorage.getItem('access_token')
        axios.get('/api/snap/getWeightLossFields',
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
          .then((result) => {
            if (result.data) {
              setNmiVariables({ order_description: result.data.order_description, hash: result.data.hash })
            }
          })
      }
    }
    getNmiVars()
  }, [isLoggedIn])
  return (
    <div className='mx-4 lg:mx-20 mt-20'>
      <form method="POST" action="https://secure.networkmerchants.com/cart/cart.php" id="productTabs">
        <div className='flex flex-col lg:flex-row justify-between'>
          <div className='mr-3 w-full lg:w-6/12 mt-6'>
            <img src='/static/wellness/voucher-blue-large.svg' className='rounded-lg w-[100%] 3xl:w-[100%]'/>
          </div>
          <div className='w-full lg:w-7/12 lg:ml-10 mt-2 3xl:ml-10 3xl:mt-10 '>
            <div className='flex flex-col lg:flex-row  items-center'>
              <p className='mr-2 text-navy text-sm lg:text-2xl'>Discount Voucher at</p>
              <div style={{
                backgroundColor: '#1E306E'
              }} className='w-full lg:w-3/12 px-16 py-1 lg:py-1 lg:px-2 rounded-xl '>
                <img src='/static/wellness/WeightCare_LOGO_WHITE_1.png' className='rounded-lg'/>
              </div>
            </div>
            <div className='text-primary-500 text-base md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl 3xl:text-6xl font-bold text-center md:text-left lg:leading-relaxed mt-0 mb-3'>
                        Semaglutide Weight Loss Program
            </div>
            <div>
              <Typography className='text-sm text-navy lg:text-2xl 3xl:text-2xl 3xl:leading-snug'>The most effective way to lose weight, backed by science. <br></br><b>ACCESSIBLE | AFFORDABLE | EFFECTIVE</b></Typography>
            </div>

            <div className='mt-4 3xl:mt-8'>
              <Accordion className='py-2'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel-content'
                  id='panel-header'
                >
                  <Typography variant='h4' className='text-navy font-medium text-lg 3xl:text-3xl'>
                    <i className="fa fa-check-square-o text-blue" aria-hidden="true"></i>
                                    &nbsp;How does the program work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1' className='3xl:text-2xl text-navy'>
                    <p>Getting started with WeightCare is easy.</p><br></br>

                    <p><b>STEP 1 |</b> Place your <b>order online</b>. and then complete your medical <b>intake form</b> about your health and weight loss goals.</p> <br></br>

                    <p><b>STEP 2 | Connect with your physician</b> via our HIPAA compliant telehealth platform. . No need to wait weeks or months to get an appointment.</p> <br></br>

                    <p><b>STEP 3 | </b> Once approved, your prescription is sent to a pharmacy who will <b>ship the medication to your door.</b></p> <br></br>

                    <p><b>STEP 4 | Ongoing Support</b>. We check in with you to make sure you are getting the most out of our program. You also have <b>access to chat</b> with our support team or to message your doctor with questions at <b>any time</b>!</p> <br></br>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className='py-2'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel-content'
                  id='panel-header'
                >
                  <Typography variant='h4' className='text-navy font-medium text-lg 3xl:text-3xl'>
                    <i className="fa fa-check-square-o text-blue" aria-hidden="true"></i>
                                    &nbsp;How does Semaglutide work?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1' className='3xl:text-2xl text-navy'>

                    <p>Medications like Semaglutide belong to a family of drugs called GLP-1 receptor agonists. These medications work by slowing down digestion (delaying gastric emptying.)</p> <br></br>

                    <p>When the stomach takes more time to digest food, this sends signals to your brain that you’re full ( even when you are eating less than normal)</p> <br></br>
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion className='py-2'>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel-content'
                  id='panel-header'
                >
                  <Typography variant='h4' className='text-navy font-medium text-lg 3xl:text-3xl'>
                    <i className="fa fa-check-square-o text-blue" aria-hidden="true"></i>
                                    &nbsp;Which states do you serve?
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant='body1' className='3xl:text-2xl text-navy'>
                    <p>We are able to serve customers in all states except; AL, CA, HI, MI, MN, IN, LA, KS, AR, AK</p><br></br>

                  </Typography>
                </AccordionDetails>
              </Accordion>

            </div>
            <p className='text-sm text-navy lg:text-xl 3xl:text-2xl 3xl:leading-snug mt-4'>Buy our discounted 1st month Voucher for  only <s className='text-navy font-medium'>$ 399.00</s> $249.00.  Use this voucher/coupon on the WeightCare site to get your discounted 1st month supply at the WeightCare checkout on their site.</p>
            <div className='mt1 mb-1'>
              <p className='lg:text-3xl text-primary-500 '>WeightCare <b>1st Month</b> ONLY <br></br><s className='text-navy font-medium text-center lg:ml-16'>$ 399.00</s>&nbsp; <b>$ 249.00</b></p>
            </div>
            {
              isLoggedIn
                ? <Button
                  classes='text-sm md:text-base 2xl:text-xl 3xl:text-2xl font-semibold bg-primary-500 px-2 lg:px-5 2xl:px-16 3xl:px-32 3xl:py-6 rounded mt-0 3xl:mt-4'
                  type='submit'
                >BUY VOUCHER NOW

                </Button>
                : <Button
                  classes='text-sm md:text-base 2xl:text-xl 3xl:text-2xl font-semibold bg-primary-500 px-2 lg:px-5 2xl:px-16 3xl:px-20 3xl:py-4 rounded mt-0 3xl:mt-4'
                  onClick={() => { handleOpen() }}
                >
            BUY VOUCHER NOW
                </Button>

            }

          </div>
        </div>
        <div>
          <div>
            <h1 className='mt-4 lg:mt-12 text-navy font-bold text-2xl md:text-base lg:text-lg xl:text-2xl 2xl:text-5xl 3xl:text-5xl px-0 lg:pr-4 text-center lg:text-left lg:mb-6'>The Weight Loss Program</h1>
            <ProgramCardList/>
          </div>
        </div>
        <div>
          <div>
            <h1 className='mt-4 lg:mt-12 text-navy font-bold text-xl md:text-base lg:text-lg xl:text-2xl 2xl:text-5xl 3xl:text-5xl px-0 lg:px-4'>What does the program include?</h1>
          </div>
          <br></br>
          <div className='flex lg:flex-row flex-col'>
            <div className='rounded-xl bg-blue-h-100 w-full lg:w-1/3 p-3 lg:m-4 lg:p-4 mb-4 lg:mb-0 items-center'>

              <div className='flex justify-center'>
                <img src='/static/wellness/1.png' className='px-4 py-6 m-4 w-[50%]'/>
              </div>
              <h1 className='text-center text-navy font-bold text-lg 3xl:text-3xl 3xl:text-center'>INITIAL TELEHEALTH VISIT</h1>
            </div>
            <div className='rounded-xl bg-blue-h-100 w-full lg:w-1/3 p-3 lg:m-4 lg:p-4 mb-4 lg:mb-0 items-center'>
              <div className='flex justify-center'>
                <img src='/static/wellness/2.png' className='px-4 py-6 m-4 w-[30%]'/>
              </div>
              <h1 className='text-center text-navy font-bold text-lg 3xl:text-3xl 3xl:text-center 3xl:pb-3'>PRESCRIPTION + MEDICATION</h1>
              <p className='text-center text-navy 3xl:text-2xl'>(if approved by a medical doctor)</p>
            </div>
            <div className='rounded-xl bg-blue-h-100 w-full lg:w-1/3 p-3 lg:m-4 lg:p-4 mb-4 lg:mb-0 items-center'>
              <div className='flex justify-center'>
                <img src='/static/wellness/3.png' className='px-4 py-6 m-4 w-[50%]'/>
              </div>
              <h1 className='text-center text-navy font-bold text-lg 3xl:text-3xl 3xl:text-center 3xl:mb-5'>UNLIMITED TEXTING WITH YOUR PHYSICIAN</h1>
            </div>
            <div className='rounded-xl bg-blue-h-100 w-full lg:w-1/3 p-3 lg:m-4 lg:p-4 mb-4 lg:mb-0 items-center'>
              <div className='flex justify-center'>
                <img src='/static/wellness/4.png' className='px-4 py-6 m-4 w-[50%] '/>
              </div>
              <h1 className='text-center text-navy font-bold text-lg 3xl:text-3xl 3xl:text-center'>MONTHLY CHECK-INS WITH YOUR PHYSICIAN</h1>
            </div>
          </div>
        </div>
        <input type="hidden" name="customer_receipt" value="true" />
        <input type="hidden" name="key_id" value="14205969" />
        <input type="hidden" name="url_finish" value="/WeightCare" />
        <input type="hidden" name="action" value="process_fixed" />
        <input type="hidden" name="order_description" value={`${nmiVariables.order_description}`} />
        <input type="hidden" name="shipping" value="fixed|0.00" />
        <input type="hidden" name="amount" value="249.00" />
        <input type="hidden" name="hash" value={`${nmiVariables.hash}`} />
        {/* <input type="submit" value="Buy" /> */}
      </form>

      <Modal open={open} onClose={handleClose}>
        <Card
          sx={{
            background: '#000000e0',
            border: '#0000004f 1px solid',
            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
            position: 'absolute',
            top: '20%',
            left: '25%'
          }}
          className="md:px-20 md:py-10 rounded-2xl mt-1 3xl:mt-32 w-8/12 xl:w-6/12 3xl:w-5/12 backdrop-blur-4xl"
        >
          <CardContent>
            <h1 className="text text-white text-2xl md:text-3xl 2xl:text-4xl 3xl:text-6xl font-semibold-it font-normal text-center mb-4 2xl:mb-5 3xl:mb-8">
              Purchase <span className='text-primary-500'>Now</span>
            </h1>
            <p className="text text-white font-light text-center">
              <Button onClick={() => { handleLogin() }} classes='text-white text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-xl 3xl:text-4xl bg-primary-500 rounded-lg px-8 2xl:py-2 3xl:py-5'>
              LOG IN / SIGN UP
                <i className="fa fa-sign-in ml-2" aria-hidden="true"></i>
              </Button>
            </p>
          </CardContent>
        </Card>
      </Modal>
      <br></br>
      <br></br>
    </div>
  )
}

export default WeightCare
