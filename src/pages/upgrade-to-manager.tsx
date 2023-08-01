import Head from 'next/head'

import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import type { Page, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { RewardPointsCard } from 'components/page/upgrade-to-manager/RewardPointsCard'
import { ButtonCTA } from 'components/page/upgrade-to-manager/ButtonCTA'
import { TextContactCTA } from 'components/common/TextContactCTA'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'next-i18next'

const { SEO } = APP_INFO

const UpgradeToManagerPage: Page = () => {
  const { auth } = useAuthStore()
  const { setNewWindow } = useNewWindowOpenedStore()

  useEffect(() => {
    if (auth.roles.admin || auth.isManager) {
      toast('You are already a manager', { type: 'info' })
    }
  }, [])

  return (
    <div className='max-w-4xl mx-auto w-full'>
      <ButtonCTA auth={auth} setNewWindow={setNewWindow} />
      <TextContactCTA />
      <RewardPointsCard />
    </div>
  )
}

UpgradeToManagerPage.getLayout = (page: ReactNode) => {
  const { t } = useTranslation()

  return (
    <DashboardLayout>
      <Head>
        <title>{SEO.TITLE_PAGE} - Upgrade To Manager</title>
      </Head>

      {page}
    </DashboardLayout>
  )
}

export default UpgradeToManagerPage
