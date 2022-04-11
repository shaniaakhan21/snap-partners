import Link from 'next/link'

export const SelectDevice = () => {
  return (
    <div className='mt-5 flex justify-center items-center'>
      <Link href='/download-app?device=ANDROID'>
        <a className='block w-36 mr-8 px-4 py-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
        Android
        </a>
      </Link>

      <Link href='/download-app?device=APPLE'>
        <a className='block w-36 px-4 py-2 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
        iOs
        </a>
      </Link>
    </div>
  )
}
