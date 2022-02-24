import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import type { NextPage, ReactNode } from 'lib/types'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
import { decodeAccessToken } from 'lib/utils/decodedAccessToken'
import { getUserMe } from 'lib/services/users/getUserMe'
import { timeout } from 'lib/utils/timeout'

import { Drawer, Navbar } from 'components/layout/Dashboard'
import { Footer } from 'components/layout/Footer'
import { Spinner } from 'components/common/loaders'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { auth, setAuth } = useAuthStore()
  const { newWindow, closeNewWindow } = useNewWindowOpenedStore()

  useEffect(() => {
    (async () => {
      if (auth) return

      const token = getLocalStorage('accessToken')

      if (!token) {
        router.push('/auth/login')
        return
      }

      const { userId } = decodeAccessToken(token)

      const { data, error } = await getUserMe({ token })

      if (error) {
        toast('ERROR -> The session could not be recovered', { type: 'warning' })
        router.push('/auth/login')
        return
      }

      toast('Session recovered!', { type: 'success' })
      setAuth({
        email: data.email,
        name: data.email,
        phone: data.phoneNumber,
        accessToken: token,
        lastname: data.lastname,
        roles: data.roles,
        id: userId,
        username: data.username,
        referralCode: data.referralCode,
        idImage: data.idImage,
        insuranceImage: data.insuranceImage,
        isManager: data.isManager,
        sponsorId: data.sponsorId
      })
    })()
  }, [auth])

  useEffect(() => {
    (async () => {
      if (!auth || !auth?.accessToken || newWindow?.closed) return

      const fnRecursiveIsManager = async (): Promise<boolean> => {
        const { data, error } = await getUserMe({ token: auth.accessToken })

        if (error) {
          toast('ERROR -> Error requesting user rank', { type: 'warning' })
        }

        if (!newWindow || newWindow.closed) {
          if (data?.isManager) {
            return data.isManager
          }

          closeNewWindow()
          return auth.isManager
        }

        if (!data.isManager) {
          await timeout(5000)
          return await fnRecursiveIsManager()
        }
      }

      const isManager = await fnRecursiveIsManager()

      if (auth.isManager === isManager) return

      setAuth({ ...auth, isManager })
    })()
  }, [newWindow])

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
        <div className='mx-auto min-h-[89vh]  h-fit px-5 pt-5 pb-20' style={{ maxWidth: 1280 }}> {/* the `max-w-7xl` class of tailwind, dont work here D: */}
          {children}
        </div>

        <Footer />
      </main>
    </div>
  )
}

export const getLayout = (page: NextPage) => <DashboardLayout>{page}</DashboardLayout>
export default DashboardLayout
