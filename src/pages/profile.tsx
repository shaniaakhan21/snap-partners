import { useEffect, useState } from 'react'
import Head from 'next/head'

import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { FormUpdatePassword } from 'components/page/profile/update/FormUpdatePassword'
import { FormUpdateEmail } from 'components/page/profile/update/FormUpdateEmail'
import { EditPhone } from 'components/page/profile/update/EditPhone'
import { AccountInfo } from 'components/page/profile/AccountInfo'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { decodeEmailToken } from 'lib/utils/decodeEmailToken'
import { updateUserEmail } from 'lib/services/user/updateUserEmail'
import { handleFetchError } from 'lib/utils/handleFetchError'
import { toast } from 'react-toastify'
import { Spinner } from 'components/common/loaders'

const { SEO } = APP_INFO

const ProfilePage = ({ email, tokenExist }: { email: string, tokenExist: boolean }) => {
  const { auth, setAuth, removeAuth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()
  const [typeUpdate, setTypeUpdate] = useState<TAccountInfoToUpdate>(null)

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    (async () => {
      if (!tokenExist && !email) return

      if (tokenExist && !email) {
        toast('Could not change the email, please contact support', { type: 'error' })
        return
      }

      setIsLoading(true)

      const { error } = await updateUserEmail(auth.accessToken, {
        currentEmail: auth.email,
        newEmail: email
      })

      if (error) {
        handleFetchError(error.status, error.info)
        setIsLoading(false)
        return
      }

      setAuth({ ...auth, email })
      toast('Email successfully changed', { type: 'success' })
      setIsLoading(false)
    })()
  }, [email, tokenExist])

  if (isLoading) {
    return (
      <div className='w-full h-screen flex items-center justify-center'>
        <Spinner />
      </div>
    )
  }
  if (typeUpdate === 'email') return <FormUpdateEmail auth={auth} setAuth={setAuth} setTypeUpdate={setTypeUpdate} />
  if (typeUpdate === 'phone') return <EditPhone auth={auth} setAuth={setAuth} setTypeUpdate={setTypeUpdate} />
  if (typeUpdate === 'password') return <FormUpdatePassword auth={auth} setAuth={setAuth} setTypeUpdate={setTypeUpdate} />

  return (
    <AccountInfo
      auth={auth}
      removeAuth={removeAuth}
      setNewWindow={setNewWindow}
      setTypeUpdate={setTypeUpdate}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }: GetServerSidePropsContext) => {
  const { token } = query

  let data: { [key: string]: any }

  try {
    data = token ? decodeEmailToken(token as string) : null
  } catch {
    data = null
  }

  return {
    props: { email: data?.email ?? null, tokenExist: !!token }
  }
}

ProfilePage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Profile</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ProfilePage
