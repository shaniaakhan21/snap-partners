import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthStore } from 'lib/stores'
import type { NextPage, ReactNode } from 'lib/types'

import { Drawer, Navbar } from 'components/layout/Dashboard'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { auth } = useAuthStore()

  useEffect(() => {
    !auth && router.push('/auth/login')
  }, [auth])

  return (
    <div className='dashboardLayout'>
      <Navbar />
      <Drawer />

      <main className='dashboardLayout__content'>
        <div className='max-w-5xl mx-auto'>
          {children}
        </div>
      </main>
    </div>
  )
}

export const getLayout = (page: NextPage) => <DashboardLayout>{page}</DashboardLayout>
export default DashboardLayout
