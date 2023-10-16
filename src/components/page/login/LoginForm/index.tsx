import { GTMTrack } from 'lib/utils/gtm'
import { useState } from 'react'
import { LoginWithEmail } from './LoginWithEmail'
import { LoginWithPhone } from './LoginWithPhone'
import { LoginWithUsername } from './LoginWithUsername'

export const LoginForm = () => {
  const [typeInput, setTypeInput] = useState<'phone' | 'email' | 'username'>('phone')

  const trackLoginHandle = (beforeLogin: boolean) => {
    GTMTrack.logIn(typeInput, beforeLogin)
  }

  return (
    <div>
      <span className='hidden sm:block font-bold text-4xl text-[#18203F]'>Login</span>
      <p className='text-gray-500'>Welcome! Login to continue.</p>
      <br></br>

      <div className='w-full flex justify-between items-center mt-3 text-[#18203F]'>
        <button
          type='button'
          onClick={() => { setTypeInput('phone') }}
          className={`${typeInput === 'phone' && 'border-primary-500 border-b-2 text-primary-500'} px-4 sm:px-10 py-1 font-semibold select-none`}
        >
        Phone
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('email') }}
          className={`${typeInput === 'email' && 'border-primary-500 border-b-2 text-primary-500'} px-4 sm:px-10 py-1 font-semibold select-none`}
        >
        Email
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('username') }}
          className={`${typeInput === 'username' && 'border-primary-500 border-b-2 text-primary-500'} px-4 sm:px-10 py-1 font-semibold select-none`}
        >
        Username
        </button>
      </div>

      { typeInput === 'phone' && <LoginWithPhone trackLoginHandle={trackLoginHandle} /> }
      { typeInput === 'email' && <LoginWithEmail trackLoginHandle={trackLoginHandle} /> }
      { typeInput === 'username' && <LoginWithUsername trackLoginHandle={trackLoginHandle} /> }
    </div>
  )
}
