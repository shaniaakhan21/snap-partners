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
  const myId = auth.id
  const [userId, setUserId] = useState(myId)
  const [currentUserId, setCurrentUserId] = useState(myId)
  const [tree, setTree] = useState({})
  useEffect(() => {
    (async () => {
      const token = getLocalStorage('accessToken')
      setTree({})
      const response = await axios.get('/api/tree/getBinaryTree', {
        params: { userId: userId },
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setTree(response.data)
    })()
  }, [userId])

  const onToTop = async () => {
    const token = getLocalStorage('accessToken')
    setTree({})
    const response = await axios.get('/api/tree/getBinaryTree', {
      params: { userId: myId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTree(response.data)
    setCurrentUserId(response.data.id)
  }

  const goBottom = async (side) => {
    const token = getLocalStorage('accessToken')
    setTree({})
    const response = await axios.get('/api/tree/getBinaryTreeBottom', {
      params: { userId: currentUserId, side },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTree(response.data)
    setCurrentUserId(response.data.id)
  }

  const goUp = async () => {
    const token = getLocalStorage('accessToken')
    setTree({})
    const response = await axios.get('/api/tree/getBinaryTreeUp', {
      params: { userId: currentUserId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTree(response.data)
    setCurrentUserId(response.data.id)
  }

  const MyNode = ({ nodeData }) => {
    return (
      <div>
        <div className="oc-topheading">{nodeData.name}</div>
        <div className={`oc-heading ${nodeData.className}`} style={{ position: 'relative' }}>
          {!['Blocked', 'Available'].includes(nodeData.name) && (
            <div className="oc-info" style={{ position: 'absolute', left: 5 }}><i className="fa-sharp fa-solid fa-circle-info"></i></div>
          )}
          {['Available'].includes(nodeData.name) && (
            <div className="oc-info" style={{ position: 'absolute', left: 5 }}><i className="fa-sharp fa-solid fa-circle-plus"></i></div>
          )}
          {!['Blocked', 'Available'].includes(nodeData.name) && (
            <div onClick={() => {
              if (nodeData.id === userId) return
              setUserId(nodeData.id)
              setCurrentUserId(nodeData.id)
            }} className="oc-view" style={{ position: 'absolute', right: 5 }}><i className="fa-solid fa-eye"></i></div>

          )}
          {nodeData.title}
        </div>
        <div className="oc-content">{nodeData.subtitle}</div>
      </div>
    )
  }

  return (
    <>
      <div className="flex justify-center gap-2">
        <button onClick={() => { onToTop() }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-50  py-3 px-4 rounded-l-full rounded-r-full">GO TO TOP</button>
        {myId !== currentUserId && (
          <button onClick={() => { goUp() }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-50  py-3 px-4 rounded-l-full rounded-r-full">GO UP</button>
        )}
        <button onClick={() => { goBottom('left') }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-50  py-3 px-4 rounded-l-full rounded-r-full">GO BOTTOM LEFT</button>
        <button onClick={() => { goBottom('right') }} className="flex text-xs items-center bg-red-600 hover:bg-red-700 text-white font-bold h-6 w-50  py-3 px-4 rounded-l-full rounded-r-full">GO BOTTOM RIGHT</button>
      </div>
      <OrganizationChart
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
