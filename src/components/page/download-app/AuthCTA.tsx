import Link from 'next/link'

export const AuthCTA = () => {
  return (
    <section className='md:hidden mt-10 w-full flex justify-center items-center'>
      <Link href='/auth/signup'>
        <a className='mr-8 px-4 py-2 uppercase text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed bg-black-primary text-white bg-primary-500 rounded-full focus:outline-none focus:ring focus:ring-primary-300 focus:opacity-90 hover:opacity-90'>
        Register now!
        </a>
      </Link>

      <Link href='/auth/login'>
        <a className='text-lg font-bold text-gray-700 uppercase hover:text-primary-500'>Login</a>
      </Link>
    </section>
  )
}
