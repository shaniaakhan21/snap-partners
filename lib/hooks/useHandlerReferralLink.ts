import { useRouter } from 'next/router'
import { ROLES } from 'config/roles'
import { useEffect, useState } from 'react'
import { IReferralLink } from 'lib/types'

export const useHandlerReferralLink = () => {
  const [referralLink, setReferralLink] = useState<IReferralLink>({ code: null, role: null })
  const router = useRouter()

  const handlerIdentifyCode = () => {
    if (typeof router.query.referralCode === 'string') {
      return router.query.referralCode.toLowerCase().trim()
    } else return null
  }

  const handlerIdentifyRole = () => {
    if (typeof router.query.referralRole === 'string') {
      if (router.query.referralRole.toUpperCase() === ROLES.CUSTOMER) return ROLES.CUSTOMER
      if (router.query.referralRole.toUpperCase() === ROLES.DRIVER) return ROLES.DRIVER
      if (router.query.referralRole.toUpperCase() === ROLES.RESTAURANT) return ROLES.RESTAURANT
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
  }, [router.query.referralRole])

  return {
    referralCode: referralLink.code,
    referralRole: referralLink.role
  }
}
