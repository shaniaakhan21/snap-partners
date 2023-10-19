import { Button } from '@mui/material'
export default function ConfirmationComponent ({ onGoBack }) {
  return (
    <>
      <div className='flex flex-row'>
        <div className='w-[65%]'>
          <div className='m-10 mr-26'>
            <img className='w-11/12'src='/static/ThirdOneImg.png' alt="Happy family" />
            <img className='w-6/12 relative top-[-700px] left-[70%]' src='/static/ThirdSecondImg.png' alt="Happy family" />
          </div>
        </div>
        <div className='w-[45%] m-10 mt-36'>
          <h1 className='text-blackCustom font-bold text-4xl leading-snug'>
          We're delighted to confirm that your information has been successfully saved in our system. Thank you for entrusting us with your valuable data.
          </h1>
          <br></br>
          <br></br>
          <br></br>
          <div className="pl-40 pr-10">
            <h3 className='text-blackCustom font-medium text-3xl leading-tight '>Your action helps us provide you with a more personalized and efficient experience. Rest assured that we take data security seriously, and your information is kept safe and confidential.</h3>
            <br></br>
            <h3 className='text-blackCustom font-medium text-3xl leading-tight '><span className="text-customred">The next step in our journey is now waiting for someone to call back</span>, and we're excited to move forward with your valuable input.</h3>
            <br></br>
            <br></br>
            <br></br>
            <Button variant="contained" className="send-button bg-customred rounded-xl w-full capitalize py-4 text-base" onClick={onGoBack}>
              Go back to home page
            </Button>
          </div>
        </div>

      </div>
    </>
  )
}
