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
      <span className='sm:block font-bold text-3xl md:font-extrabold md:text-4xl mb-2 text-[#18203F] mt-4'>Sign In</span>
      <p className='font-medium text-gray-600'>Welcome! Login to continue.</p>

      <div className='w-full flex justify-between items-center mt-3 text-[#18203F] border-2 rounded-3xl overflow-hidden mt-6 font-semibold text-primary-500'>
        <button
          type='button'
          onClick={() => { setTypeInput('phone') }}
          className={`${typeInput === 'phone' && 'bg-primary-500 text-white'} px-2 py-3 select-none w-full`}
        >
        Phone
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('email') }}
          className={`${typeInput === 'email' && 'bg-primary-500 text-white'} px-2 py-3 select-none w-full`}
        >
        Email
        </button>
        <button
          type='button'
          onClick={() => { setTypeInput('username') }}
          className={`${typeInput === 'username' && 'bg-primary-500 text-white'} px-2 py-3 select-none w-full`}
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
