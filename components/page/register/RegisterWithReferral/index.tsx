import { useState } from 'react'
import { RegisterForm } from '../RegisterForm'
import { Identify } from './Identify'

export const RegisterWithOutReferral = () => {
  const [referralUser, setReferralUser] = useState({
    referralLink: null,
    identity: null
  })

  const handlerIdentify = (identityKey: string) => {
    setReferralUser(prevState => ({
      ...prevState,
      identity: identityKey
    }))
  }

  return (
    <>
      {
        !referralUser.identity
          ? <Identify handlerIdentify={handlerIdentify} />
          : <RegisterForm referralUser={referralUser} />
      }
    </>
  )
}
