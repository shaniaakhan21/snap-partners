import Head from 'next/head'

import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { UpgradeManagerCTA } from 'components/page/profile/UpgradeManagerCTA'
import { FormAccountInfo } from 'components/page/profile/FormAccountInfo'
import { PhotoAccount } from 'components/page/profile/PhotoAccount'
import { BecomeRoles } from 'components/page/profile/BecomeRoles'
import { TextContactCTA } from 'components/common/TextContactCTA'
import { Badges } from 'components/page/profile/Badges'
import { Rank } from 'components/page/profile/Rank'

const { SEO } = APP_INFO

const ProfilePage: Page = () => {
  const { auth, removeAuth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()

  return (
    <div className='max-w-4xl mx-auto'>
      <div className='flex justify-start items-center gap-x-5 select-none'>
        <PhotoAccount photoURL={null} />
        <Badges auth={auth} />
      </div>

      <div className='mt-11'>
        <FormAccountInfo auth={auth} />
      </div>

      {
        !auth.roles.admin && (
          <div className='flex flex-col md:flex-row items-center justify-center mt-11'>
            <Rank auth={auth} />
            <UpgradeManagerCTA auth={auth} setNewWindow={setNewWindow} />
          </div>
        )
      }

      <BecomeRoles auth={auth} />

      <button
        className='block text-primary-500 mx-auto mt-11 font-bold text-lg'
        onClick={removeAuth}
      >
        Logout
      </button>

      <TextContactCTA />
    </div>
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
