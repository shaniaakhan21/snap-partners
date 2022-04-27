import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { IReferralLink } from 'lib/types'
import { ROLES } from 'config/roles'

export const useHandlerReferralLink = () => {
  const router = useRouter()
  const queryReferralCode = router.query.referralCode as string
  const queryRole = router.query.role as string

  const [referralLink, setReferralLink] = useState<IReferralLink>({ code: null, role: null })

  const handlerIdentifyRole = () => {
    const role = ROLES[queryRole]

    return role === ROLES.ADMIN || !role ? null : role
  }

  useEffect(() => {
    setReferralLink(prevState => ({
      ...prevState,
      code: queryReferralCode
    }))
  }, [queryReferralCode])

  useEffect(() => {
    setReferralLink(prevState => ({
      ...prevState,
      role: handlerIdentifyRole()
    }))
  }, [queryRole])

  return {
    referralCode: referralLink.code,
    role: referralLink.role
  }
}
