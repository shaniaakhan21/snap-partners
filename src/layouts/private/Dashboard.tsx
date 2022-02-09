import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { useAuthStore } from 'lib/stores'
import type { NextPage, ReactNode } from 'lib/types'

import { Drawer, Navbar } from 'components/layout/Dashboard'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { auth } = useAuthStore()

  useEffect(() => {
    !auth && router.push('/auth/signin')
  }, [auth])

  return (
    <div className='dashboardLayout'>
      <Navbar />
      <Drawer />

      <main className='dashboardLayout__content scroll-primary'>
        <div className='mx-auto h-fit' style={{ maxWidth: 1280 }}> {/* the `max-w-7xl` class of tailwind, dont work here D: */}
          {children}
        </div>
      </main>
    </div>
  )
}

export const getLayout = (page: NextPage) => <DashboardLayout>{page}</DashboardLayout>
export default DashboardLayout
