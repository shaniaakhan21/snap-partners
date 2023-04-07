import Head from 'next/head'
import OrganizationChart from '@dabeng/react-orgchart'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useEffect, useState } from 'react'
import axios from 'axios'

const { SEO } = APP_INFO

const ComingSoon: PageNext = () => {
  const [userId, setUserId] = useState('10903075')
  const [tree, setTree] = useState({})
  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      const response = await axios.get('/api/reports/getTree', {
        params: { userId: userId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTree(response.data)
    })()
  }, [userId])

  return (
    <OrganizationChart
      datasource={tree}
      pan={true}
      collapsible={false}
      onClickNode={(node) => {
        setUserId(node.id)
      }}
    />
  )
}

ComingSoon.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Coming Soon</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ComingSoon
