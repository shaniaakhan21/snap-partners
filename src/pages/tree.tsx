import Head from 'next/head'
import OrganizationChart from '@dabeng/react-orgchart'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { useEffect, useState } from 'react'
import axios from 'axios'

const { SEO } = APP_INFO

const ComingSoon: PageNext = () => {
  const { auth, setAuth, removeAuth } = useAuthStore()
  const [userId, setUserId] = useState(auth.id)
  const [tree, setTree] = useState({})
  const [history, setHistory] = useState([])
  const [key, setKey] = useState(0);

  const refreshComponent = () => {
    setKey(prevKey => prevKey + 1); // incrementing key will cause the component to be recreated
  };
  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      setTree({})
      const response = await axios.get('/api/reports/getTree', {
        params: { userId: userId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTree(response.data)
      refreshComponent()
    })()
  }, [userId])

  console.log(auth)

  const onGoBack = () => {
    const newHistory = [...history]
    const goBackTo = newHistory.pop()
    setHistory(newHistory)
    console.log(goBackTo)
    setUserId(goBackTo)
  }

  const onToTop = () => {
    const newHistory = []
    setHistory(newHistory)
    setUserId(auth.id)
  }

  const MyNode = ({ nodeData }) => {
    return (
      <div>
        <div className="oc-topheading">{nodeData.name}</div>
        <div className="oc-heading" style={{ position: 'relative' }}>
          <div className="oc-info" style={{ position: 'absolute', left: 5 }}><i className="fa-sharp fa-solid fa-circle-info"></i></div>
          <div onClick={() => {
            if (nodeData.id === userId) return
            const newHistory = [...history]
            newHistory.push(userId)
            setHistory(newHistory)
            setUserId(nodeData.id)
          }} className="oc-view" style={{ position: 'absolute', right: 5 }}><i className="fa-solid fa-eye"></i></div>
          {nodeData.title}</div>
        <div className="oc-content">{nodeData.subtitle}</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center gap-2">
        {history.length > 0 && (
          <button onClick={() => { onGoBack() }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-24 py-3 px-4 rounded-l-full rounded-r-full">GO BACK</button>
        )}
        {auth.id !== userId && (
          <button onClick={() => { onToTop() }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-50  py-3 px-4 rounded-l-full rounded-r-full">GO TO TOP</button>
        )}
      </div>
      <OrganizationChart
        key={key}
        datasource={tree}
        pan={true}
        NodeTemplate ={MyNode}
        collapsible={false}
      />
    </>
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
