import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Drawer, Navbar } from 'components/layout/Dashboard'
import { Spinner } from 'components/common/loaders'
import { useAuthStore } from 'lib/stores'
import type { NextPage, ReactNode } from 'lib/types'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { auth } = useAuthStore()

  useEffect(() => {
    !auth && router.push('/auth/signin')
  }, [auth])

  if (!auth) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <Spinner classes='w-20 h-20' />
      </div>
    )
  }

  return (
    <div className='dashboardLayout'>
      <Navbar />
      <Drawer />

      <main className='dashboardLayout__content scroll-primary'>
        <div className='mx-auto h-fit' style={{ maxWidth: 1024 }}> {/* the `max-w-5xl` class of tailwind, dont work here D: */}
          {children}
        </div>
      </main>
    </div>
  )
}

export const getLayout = (page: NextPage) => <DashboardLayout>{page}</DashboardLayout>
export default DashboardLayout
