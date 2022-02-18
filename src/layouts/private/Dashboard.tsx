import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Drawer, Navbar } from 'components/layout/Dashboard'
import { Spinner } from 'components/common/loaders'
import { useAuthStore } from 'lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
import { decodeAccessToken } from 'lib/utils/decodedAccessToken'
import type { NextPage, ReactNode } from 'lib/types'
import { getUserMe } from 'lib/services/users/getUserMe'
import { toast } from 'react-toastify'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const { auth, setAuth } = useAuthStore()

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
        toast('ERROR -> The session could not be recovered', { type: 'error' })
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
        <div className='mx-auto h-fit' style={{ maxWidth: 1280 }}> {/* the `max-w-7xl` class of tailwind, dont work here D: */}
          {children}
        </div>
      </main>
    </div>
  )
}

export const getLayout = (page: NextPage) => <DashboardLayout>{page}</DashboardLayout>
export default DashboardLayout
