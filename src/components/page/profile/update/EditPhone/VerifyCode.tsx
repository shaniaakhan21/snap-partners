import ReactCodeInput from 'react-verification-code-input'

export const VerifyCode = ({
  onSubmitUpdatePhone,
  setIsPhoneEditable,
  onSubmitVerifyCode,
  handleSubmit,
  phoneNumber,
  sendSMSCode,
  isLoading
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmitUpdatePhone)} className='w-full pb-6'>
      <div className='flex flex-col justify-center items-center mt-2'>
        <section className='text-center'>
          <span className='text-2xl font-bold'>Verify Phone</span>
          <p className='text-gray-500 mt-3'>
          Code is Sent to <span className='font-bold text-black'>{phoneNumber}</span>
          </p>

          <button
            type='button'
            onClick={() => setIsPhoneEditable(true)}
            className='text-primary-500 font-medium'
          >
          Change Number
          </button>

          <div className='mt-4'>
            <ReactCodeInput
              fields={6}
              className='custom__reactCodeInput mt-4'
              disabled={isLoading}
              onComplete={onSubmitVerifyCode}
            />
          </div>

          <div className='mt-4'>
            <p className='font-bold'>
            Didn’t recieve the code? {' '}
              <button
                type='button'
                onClick={sendSMSCode}
                className='text-primary-500 font-medium'
              > Send Again
              </button>
            </p>
          </div>
        </section>
      </div>
    </form>
  )
}
