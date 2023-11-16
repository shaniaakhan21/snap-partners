import { Button } from '@mui/material'
export default function ConfirmationComponent () {
  return (
    <>
      <div className='flex flex-col-reverse lg:flex-row'>
        <div className='w-full lg:w-[65%]'>
          <div className='m-10 mr-26'>
            <img className='w-full'src='/static/ThirdOneImg.png' alt="Happy family" />
          </div>
        </div>
        <div className='w-[95%] lg:w-[35%] m-4 mt-4 md:mt-16 xl:mt-40 relative right-0 lg:right-[10%] lg:right-[12%] xl:right-[7%]'>
          <div className='w-full flex justify-center mb-1 2xl:mb-10'>
            <img className='w-[20%]' src='/images/success-tick.svg' />
          </div>
          <h1 className='text-blackCustom font-bold text-lg lg:text-2xl 2xl:text-3xl 3xl:text-4xl leading-snug mb-0 xl:mb-10'>
          We're delighted to confirm that your information has been successfully saved in our system. Thank you for entrusting us with your valuable data.
          </h1>
          <br></br>
          <div className="pl-0 lg:pl-40 pr-0 lg:pr-6">
            <h3 className='text-blackCustom font-medium text-lg lg:text-2xl 2xl:text-3xl leading-tight '>Your action helps us provide you with a more personalized and efficient experience. Rest assured that we take data security seriously, and your information is kept safe and confidential.</h3>
            <br></br>
            <h3 className='text-blackCustom font-medium text-lg lg:text-2xl 2xl:text-3xl leading-tight '><span className="text-customred">The next step in our journey is now waiting for someone to call back</span>, and we're excited to move forward with your valuable input.</h3>
            <br></br>
            <Button variant="contained" className="send-button bg-customred rounded-xl w-[95%] sm:w-full capitalize py-4 text-base" onClick={() => { window.location.reload() }}>
              Go back to home page
            </Button>
          </div>
        </div>

      </div>
    </>
  )
}
