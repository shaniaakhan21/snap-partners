import { useRouter } from 'next/router'
import { ROLES } from 'config/roles'
import { useEffect, useState } from 'react'
import { IReferralLink } from 'lib/types'

export const useHandlerReferralLink = () => {
  const [referralLink, setReferralLink] = useState<IReferralLink>({ code: null, role: null })
  const router = useRouter()

  const handlerIdentifyCode = () => {
    if (typeof router.query.referralCode === 'string') {
      return router.query.referralCode
    } else return null
  }

  const handlerIdentifyRole = () => {
    if (typeof router.query.role === 'string') {
      if (router.query.role.toUpperCase() === ROLES.CUSTOMER) return ROLES.CUSTOMER
      if (router.query.role.toUpperCase() === ROLES.DRIVER) return ROLES.DRIVER
      if (router.query.role.toUpperCase() === ROLES.RESTAURANT) return ROLES.RESTAURANT
      else return null
    } else return null
  }

  useEffect(() => {
    setReferralLink(prevState => ({
      ...prevState,
      code: handlerIdentifyCode()
    }))
  }, [router.query.referralCode])

  useEffect(() => {
    setReferralLink(prevState => ({
      ...prevState,
      role: handlerIdentifyRole()
    }))
  }, [router.query.role])

  return {
    referralCode: referralLink.code,
    role: referralLink.role
  }
}
