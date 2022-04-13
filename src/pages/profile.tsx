import { useState } from 'react'
import Head from 'next/head'

import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { TAccountInfoToUpdate } from 'lib/types/user/profile'
import { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { FormUpdatePassword } from 'components/page/profile/update/FormUpdatePassword'
import { FormUpdateEmail } from 'components/page/profile/update/FormUpdateEmail'
import { EditPhone } from 'components/page/profile/update/EditPhone'
import { AccountInfo } from 'components/page/profile/AccountInfo'

const { SEO } = APP_INFO

const ProfilePage: Page = () => {
  const { auth, setAuth, removeAuth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()
  const [typeUpdate, setTypeUpdate] = useState<TAccountInfoToUpdate>(null)

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

ProfilePage.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Profile</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ProfilePage
