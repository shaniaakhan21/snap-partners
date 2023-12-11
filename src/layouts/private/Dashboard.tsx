import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import type { NextPage, ReactNode } from 'lib/types'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { getLocalStorage } from 'lib/utils/localStorage'
// import { decodeAccessToken } from 'lib/utils/decodedAccessToken'
import { getUserMe } from 'lib/services/user/getUserMe'
import { timeout } from 'lib/utils/timeout'

import { Drawer, Navbar } from 'components/layout/private/Dashboard'
import { FooterPrivate } from 'components/layout/private/Footer'
import { Spinner } from 'components/common/loaders'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { GTMTrack } from 'lib/utils/gtm'
import { FormBecomeDriver } from '../../components/page/become-role/FormBecomeDriver'
import Alert from '@material-ui/lab/Alert'
import { builderWebsiteFields } from "../../lib/types/user/profile";

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

      // const { userId } = decodeAccessToken(token)

      const { data, error } = await getUserMe({ token })

      if (error) {
        handleFetchError(error.status, error.info)
        router.push('/auth/login')
        return
      }

      toast('Session recovered!', { type: 'success' })
      setAuth({
        socialSecurityNumber: data.socialSecurityNumber,
        email: data.email,
        name: data.name,
        password: data.password,
        phoneNumber: data.phoneNumber,
        accessToken: token,
        lastname: data.lastname,
        roles: data.roles,
        id: data.id,
        username: data.username,
        dateOfBirth: data.dateOfBirth,
        referralCode: data.referralCode,
        driver_status: data.driver_status,
        idImage: data.idImage,
        insuranceImage: data.insuranceImage,
        profileImage: data.profileImage,
        isManager: data.ranks?.type === 'manager',
        createdAt: data.createdAt,
        ownerName: data.ownerName,
        ranks: data.ranks,
        updatedAt: data.updatedAt,
        blocked: data.blocked,
        deleted: data.deleted,
        nsurAccount: {
          nsurUserId: data.nsurUserId,
          myPoints: auth?.nsurAccount?.myPoints || null
        },
        bank_information: data.bank_information,
        level: data.level,
        isCertified: data.isCertified,
        isValidated: data.isValidated,
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        TINstatus: data.TINstatus,
        SSNDocURL: data.SSNDocURL,
        doc_irs: data.doc_irs,
        doc_b_structure: data.doc_b_structure,
        ein: data.ein,
        businessName: data.businessName,
        business_type: data.business_type,
        b_start_date: data.b_start_date,
        ...(builderWebsiteFields.reduce((acc, field) => ({ ...acc, [field]: data[field] }), {}) as any)
      })
    })()

    // add user info into GTM dataLayer
    if (auth) {
      const {
        id,
        username,
        name,
        lastname,
        email,
        phoneNumber,
        roles,
        isManager,
        accessToken,
        createdAt,
        idImage,
        insuranceImage,
        ownerName,
        driver_status,
        ranks,
        referralCode,
        updatedAt,
        blocked,
        deleted,
        isCertified,
        isValidated,
        street,
        state,
        city,
        zip,
        dateOfBirth,
        nsurAccount,
        referralLink,
        TINstatus,
        SSNDocURL,
        doc_irs,
        doc_b_structure,
        ein,
        businessName,
        business_type,
        b_start_date
      } = auth

      GTMTrack.userInfo({
        id,
        username,
        name,
        lastname,
        email,
        phoneNumber,
        roles,
        isManager,
        createdAt,
        driver_status,
        accessToken,
        idImage,
        insuranceImage,
        ownerName,
        ranks,
        referralCode,
        updatedAt,
        referralLink,
        blocked,
        deleted,
        isCertified,
        isValidated,
        street,
        state,
        city,
        zip,
        dateOfBirth,
        nsurAccount,
        TINstatus,
        SSNDocURL,
        doc_irs,
        doc_b_structure,
        ein,
        businessName,
        business_type,
        b_start_date
      })
    } else {
      GTMTrack.userInfo()
    }
  }, [auth])

  useEffect(() => {
    (async () => {
      if (!auth || !auth?.accessToken || newWindow?.closed) return

      const fnRecursiveIsManager = async (): Promise<boolean> => {
        const { data: user, error } = await getUserMe({ token: auth.accessToken })

        if (error) {
          handleFetchError(error.status, error.info)
        }

        if (!newWindow || newWindow.closed) {
          if (user?.isManager) {
            return user.isManager
          }

          closeNewWindow()
          return auth.isManager
        }

        if (!user.isManager) {
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

  if (auth.roles.driver && auth.driver_status === null && auth.idImage === '' && auth.insuranceImage === '') {
    return (
      <div className='dashboardLayout'>
        <Navbar/>
        <Drawer/>

        <main className='dashboardLayout__content scroll-primary'>
          <div className='mx-auto min-h-[89vh] h-fit px-5 pt-5 pb-20 max-w-7xl'>
            <Alert severity="warning">Please upload your documents to activate your driver account</Alert><br/>
            <FormBecomeDriver userAuth={auth} userSetAuth={setAuth}/>
          </div>

          <FooterPrivate/>
        </main>
      </div>
    )
  }

  return (
    <div className='dashboardLayout'>
      <Navbar />
      <Drawer />

      <main className='dashboardLayout__content scroll-primary'>
        <div className='mx-auto min-h-[89vh] h-fit px-5 pt-5 pb-20 max-w-7xl'>
          {auth.roles.driver && auth.driver_status === null && (
            <>
              <Alert severity="warning">Your driver documents are being reviewed by our team, your account will be activated soon.</Alert><br/>
            </>
          )}
          {children}
        </div>

        <FooterPrivate />
      </main>
    </div>
  )
}

export const getLayout = (page: NextPage) => <DashboardLayout>{page}</DashboardLayout>
export default DashboardLayout
