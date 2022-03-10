import { useState } from 'react'
import { LoginWithEmail } from './LoginWithEmail'
import { LoginWithPhone } from './LoginWithPhone'
import { LoginWithUsername } from './LoginWithUsername'

export const LoginForm = () => {
  const [typeInput, setTypeInput] = useState<'phone' | 'email' | 'username'>('phone')

  return (
    <div className='max-w-md mx-auto w-full'>
      <span className='sm:hidden font-bold text-4xl text-[#18203F]'>SnapDelivered</span>
      <span className='hidden sm:block font-bold text-4xl text-[#18203F]'>Login</span>
      <p className='text-gray-500'>Welcome! Login to continue.</p>

      <div className='w-full flex justify-between items-center mt-3'>
        <button
          type='button'
          onClick={() => { setTypeInput('phone') }}
          className={`${typeInput === 'phone' && 'bg-primary-500 rounded-md text-white'} px-4 py-1 font-semibold select-none`}
        >
        Phone
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('email') }}
          className={`${typeInput === 'email' && 'bg-primary-500 rounded-md text-white'} px-4 py-1 font-semibold select-none`}
        >
        Email
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('username') }}
          className={`${typeInput === 'username' && 'bg-primary-500 rounded-md text-white'} px-4 py-1 font-semibold select-none`}
        >
        Username
        </button>
      </div>

      { typeInput === 'phone' && <LoginWithPhone /> }
      { typeInput === 'email' && <LoginWithEmail /> }
      { typeInput === 'username' && <LoginWithUsername /> }
    </div>
  )
}
