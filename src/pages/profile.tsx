import { useState } from 'react'
import Head from 'next/head'

import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'

import { FormUpdatePassword } from 'components/page/profile/update/FormUpdatePassword'
import { FormUpdateEmail } from 'components/page/profile/update/FormUpdateEmail'
import { FormUpdatePhone } from 'components/page/profile/update/FormUpdatePhone'
import { AccountInfo } from 'components/page/profile/AccountInfo'

const { SEO } = APP_INFO

const ProfilePage: Page = () => {
  const { auth, removeAuth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()
  const [typeUpdate, setTypeUpdate] = useState<'email' | 'phone' | 'password'>(null)

  if (typeUpdate === 'password') return <FormUpdatePassword />
  if (typeUpdate === 'email') return <FormUpdateEmail />
  if (typeUpdate === 'phone') return <FormUpdatePhone />

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
