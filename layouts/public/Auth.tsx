import { useAuthStore } from 'lib/stores'
import type { NextPage, ReactNode } from 'lib/types'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const AuthPagesLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { auth } = useAuthStore()

  useEffect(() => {
    auth && router.push('/dashboard')
  }, [auth])

  return (
    <>
      {children}
    </>
  )
}

export const getLayout = (page: NextPage) => <AuthPagesLayout>{page}</AuthPagesLayout>
export default AuthPagesLayout
