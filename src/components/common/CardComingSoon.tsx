export const CardComingSoon = ({ text = '' }) => {
  return (
    <div className='px-5 py-12 border-4 border-solid border-red-500 max-w-2xl rounded-md text-center bg-white flex flex-col justify-center items-center'>
      <img src='/images/logo.svg' className='w-36 h-36' />
      <span className='text-primary-500 text-4xl font-black'>COMING SOON</span>
      <br />
      <p>{text || 'We are almost there to introduce our new application to the world, in the meantime, you can follow us on social networks to get the latest updates.'}</p>
    </div>
  )
}
