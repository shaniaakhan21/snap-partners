import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { removeLocalStorage, setLocalStorage } from 'lib/utils/localStorage'

import { IReferralLink } from 'lib/types'
import { ROLES } from 'config/roles'

export const useHandlerReferralLinkWellness = () => {
  const router = useRouter()
  const queryReferralCode = router.query.referralCode as string
  const queryRole = router.query.role as string
  const redirectToWellness = router.query.redirectToWellness as string

  const [referralLink, setReferralLink] = useState<IReferralLink>({ code: null, role: null })

  const handlerIdentifyRole = () => {
    const role = ROLES[queryRole]

    return role === ROLES.ADMIN || !role ? null : role
  }

  useEffect(() => {
    if (redirectToWellness === 'true') {
      setLocalStorage('redirectToWellness', true)
      setLocalStorage('redirectToWellnessReferralCode', queryReferralCode || '')
    } else {
      removeLocalStorage('redirectToWellness')
      removeLocalStorage('redirectToWellnessReferralCode')
    }
  }, [redirectToWellness])

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
