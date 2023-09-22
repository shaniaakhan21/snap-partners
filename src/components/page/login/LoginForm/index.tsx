import { GTMTrack } from 'lib/utils/gtm'
import { useState } from 'react'
import { LoginWithEmail } from './LoginWithEmail'
import { LoginWithPhone } from './LoginWithPhone'
import { LoginWithUsername } from './LoginWithUsername'
import { AuthRecover } from 'components/common/AuthRecover'

export const LoginForm = () => {
  const [typeInput, setTypeInput] = useState<'phone' | 'email' | 'username'>('phone')

  const trackLoginHandle = (beforeLogin: boolean) => {
    GTMTrack.logIn(typeInput, beforeLogin)
  }

  return (
    <div className='max-w-md mx-auto w-full'>
      <AuthRecover skipRedirect={true} redirectTo={"/overview"}/>
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

      { typeInput === 'phone' && <LoginWithPhone trackLoginHandle={trackLoginHandle} /> }
      { typeInput === 'email' && <LoginWithEmail trackLoginHandle={trackLoginHandle} /> }
      { typeInput === 'username' && <LoginWithUsername trackLoginHandle={trackLoginHandle} /> }
    </div>
  )
}
