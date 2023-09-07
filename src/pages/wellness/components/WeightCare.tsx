import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Button } from 'components/common/Button'

const WeightCare = () => {
  return (
    <div className='mx-20'>
      <div className='flex flex-row justify-between'>
        <div className='mr-3 w-5/12 mt-2'>
          <img src='/static/wellness/voucher-blue-large.svg' className='rounded-lg w-[100%] 3xl:w-[100%]'/>
        </div>
        <div className='w-7/12 ml-10 mt-2 3xl:ml-10 3xl:mt-10'>
          <div style={{
            backgroundColor: '#1E306E'
          }} className='w-3/12 py-1 px-2 rounded-xl'>
            <img src='/static/wellness/WeightCare_LOGO_WHITE_1.png' className='rounded-lg'/>
          </div>
          <div className='text-red-h text-lg md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-4xl 3xl:text-8xl font-bold text-center md:text-left leading-relaxed mt-4'>
                        Semaglutide Weight Loss Program
          </div>
          <br></br>
          <div>
            <Typography className='text-lg text-navy 3xl:text-3xl 3xl:leading-snug'>The most effective way to lose weight, backed by science. <br></br><b>ACCESSIBLE | AFFORDABLE | EFFECTIVE</b></Typography>
          </div>
          <div>
            <p className='text-2xl text-red-h  font-bold 3xl:text-4xl 3xl:mt-3'><s className='text-navy font-medium'>$ 399.00</s>&nbsp; $ 250.00</p>
          </div>
          <div className='mt-4 3xl:mt-8'>
            <Accordion className='py-2'>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel-content'
                id='panel-header'
              >
                <Typography variant='h4' className='text-navy font-medium text-lg 3xl:text-5xl'>
                  <i className="fa fa-check-square-o text-blue" aria-hidden="true"></i>
                                    &nbsp;How does the program work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1' className='3xl:text-3xl text-navy'>
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
                <Typography variant='h4' className='text-navy font-medium text-lg 3xl:text-5xl'>
                  <i className="fa fa-check-square-o text-blue" aria-hidden="true"></i>
                                    &nbsp;How does Semaglutide work?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1' className='3xl:text-3xl text-navy'>

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
                <Typography variant='h4' className='text-navy font-medium text-lg 3xl:text-5xl'>
                  <i className="fa fa-check-square-o text-blue" aria-hidden="true"></i>
                                    &nbsp;Which states do you serve?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant='body1' className='3xl:text-3xl text-navy'>
                  <p>We are able to serve customers in all states except; AL, CA, HI, MI, MN, IN, LA, KS, AR, AK</p><br></br>

                </Typography>
              </AccordionDetails>
            </Accordion>

          </div>
          <Button
            classes='text-xs md:text-base 2xl:text-xl 3xl:text-4xl font-semibold bg-btn-color px-2 lg:px-5 2xl:px-28 3xl:px-32 3xl:py-6 rounded mt-3 3xl:mt-4'
          >
              GET STARTED
          </Button>
        </div>
      </div>
      <div>
        <div>
          <h1 className='mt-12 text-navy font-bold text-xs md:text-base lg:text-lg xl:text-xl 2xl:text-3xl 3xl:text-7xl px-4'>What does the program include?</h1>
        </div>
        <br></br>
        <div className='flex flex-row'>
          <div className='rounded-xl bg-red-100 w-1/3 m-4 p-4 items-center'>
            <div className='flex justify-center'>
              <img src='/static/wellness/1.png' className='px-4 py-6 m-4 w-[100%]'/>
            </div>
            <h1 className='text-navy font-bold text-lg 3xl:text-5xl 3xl:text-center'>INITIAL TELEHEALTH VISIT</h1>
          </div>
          <div className='rounded-xl bg-red-100 w-1/3 m-4 p-4 items-center'>
            <div className='flex justify-center'>
              <img src='/static/wellness/2.png' className='px-4 py-6 m-4 w-[50%]'/>
            </div>
            <h1 className='text-navy font-bold text-lg 3xl:text-5xl 3xl:text-center'>PRESCRIPTION + MEDICATION</h1>
            <p className='text-navy text-center 3xl:text-2xl'>(if approved by a medical doctor)</p>
          </div>
          <div className='rounded-xl bg-red-100 w-1/3 m-4 p-4 items-center'>
            <div className='flex justify-center'>
              <img src='/static/wellness/3.png' className='px-4 py-6 m-4 w-[80%]'/>
            </div>
            <h1 className='text-navy font-bold text-lg 3xl:text-5xl 3xl:text-center'>UNLIMITED TEXTING WITH YOUR PHYSICIAN</h1>
          </div>
          <div className='rounded-xl bg-red-100 w-1/3 m-4 p-4 items-center'>
            <div className='flex justify-center'>
              <img src='/static/wellness/4.png' className='px-4 py-6 m-4 w-[80%]'/>
            </div>
            <h1 className='text-navy font-bold text-lg 3xl:text-5xl 3xl:text-center'>MONTHLY CHECK-INS WITH YOUR PHYSICIAN</h1>
          </div>
        </div>
      </div>
      <form method="POST" action="https://secure.networkmerchants.com/cart/cart.php">
        <input type="hidden" name="customer_receipt" value="true" />
        <input type="hidden" name="key_id" value="14205969" />
        <input type="hidden" name="url_finish" value="http://example.org/finsh_url.html" />
        <input type="hidden" name="action" value="process_fixed" />
        <input type="hidden" name="order_description" value="Semaglutide Weight Loss Program" />
        <input type="hidden" name="shipping" value="fixed|0.00" />
        <input type="hidden" name="amount" value="250.00" />
        <input type="hidden" name="hash" value="action|order_description|shipping|amount|789637028dfbd0fbc5b3116efef1f9ed" />
        <input type="submit" value="Buy" />
      </form>
    </div>
  )
}

export default WeightCare
