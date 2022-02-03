import { useState } from 'react'
import { Identify } from './Identify'
import { RegisterCustomerForm, RegisterRestaurantForm, RegisterDriverForm } from '../RegisterForm'

export const RegisterWithOutReferral = () => {
  const [referralUser, setReferralUser] = useState({
    referralCode: null,
    role: null
  })

  const handlerIdentify = (identityKey: string) => {
    setReferralUser(prevState => ({
      ...prevState,
      role: identityKey
    }))
  }

  if (!referralUser.role) return <Identify handlerIdentify={handlerIdentify} />
  if (referralUser.role === 'CUSTOMER') return <RegisterCustomerForm />
  if (referralUser.role === 'RESTAURANT') return <RegisterRestaurantForm />
  if (referralUser.role === 'DRIVER') return <RegisterDriverForm />
  return <Identify handlerIdentify={handlerIdentify} />
}
