import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { TROLE } from 'lib/types'

export const useRoleFromUrl = (): TROLE => {
  const router = useRouter()
  const userType: string = useMemo(() => {
    // find card userType
    const idx = router.asPath.indexOf('role=')
    return router.asPath.substring(idx + 5)
  }, [router.pathname])
  return userType as TROLE
}
