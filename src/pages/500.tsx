import Link from 'next/link'

export default function Page500 () {
  return (
    <div className='w-full h-screen bg-[#FFAA00] text-white flex flex-col justify-center items-center px-4 relative'>
      <div className='bg-textAcent-500 absolute top-0 left-0 w-full h-screen -z-10'></div>
      <img src='/images/errorAsset.png' className='absolute bottom-0 right-0 z-20 w-40 sm:w-96' />

      <div className='w-full h-screen flex flex-col justify-center items-center z-30'>
        <img src='/images/logo-white.png' className='w-28 h-28' />
        <span className='text-7xl font-black mt-5'>500</span>
        <p className='font-semibold text-3xl mt-3'>Internal Server Error</p>
        <p className='font-light text-xl mt-2 text-center'>Opps, try again later</p>
        <Link href='/overview'>
          <a className='block w-44 rounded-full px-4 py-2 bg-textAcent-500 text-center uppercase font-bold mt-4'>Go Back Home</a>
        </Link>
      </div>
    </div>
  )
}
