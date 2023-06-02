import Head from 'next/head'
import OrganizationChart from '@dabeng/react-orgchart'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { GeneralModal } from 'components/page/genealogy/OldGenealogy/Modals/GeneralModal'
import { CardComingSoon } from 'components/common/CardComingSoon'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'

const { SEO } = APP_INFO

const ComingSoon: PageNext = () => {
  const { auth, setAuth, removeAuth } = useAuthStore()
  const myId = auth.id
  const [userId, setUserId] = useState(myId)
  const [currentUserId, setCurrentUserId] = useState(myId)
  const [tree, setTree] = useState({})
  const [key, setKey] = useState(0)
  const [showModal, setshowModal] = useState(false)
  const [holdingTank, setHoldingTank] = useState([])
  const [selectedHoldingTank, setSelectedHoldingTank] = useState(null)
  const [placement, setPLacement] = useState({}) as any

  const refreshComponent = () => {
    setKey(prevKey => prevKey + 1) // incrementing key will cause the component to be recreated
  }

  const getHoldingTank = async () => {
    const token = getLocalStorage('accessToken')
    const response = await axios.get('/api/tree/getHoldingTankUsers', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setHoldingTank(response.data)
  }

  const getBinaryTree = async (id) => {
    const token = getLocalStorage('accessToken')
    setTree({})
    const response = await axios.get('/api/tree/getBinaryTree', {
      params: { userId: id },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setTree(response.data)
    refreshComponent()
    return response.data.id
  }

  useEffect(() => {
    (async () => {
      await getHoldingTank()
    })()
  }, [])

  useEffect(() => {
    (async () => {
      await getBinaryTree(userId)
    })()
  }, [userId])

  const onToTop = async () => {
    const responseId = await getBinaryTree(myId)
    setCurrentUserId(responseId)
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
    refreshComponent()
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
    refreshComponent()
    setCurrentUserId(response.data.id)
  }

  const setHoldingTankUser = async () => {
    const token = getLocalStorage('accessToken')
    await axios.post('/api/tree/setHoldingTank', {
      selectedHoldingTank,
      placement
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setshowModal(false)
    await getBinaryTree(userId)
    await getHoldingTank()
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
            <div onClick={() => {
              setPLacement(JSON.parse(nodeData.id))
              setSelectedHoldingTank(null)
              setshowModal(true)
            }} className="oc-info" style={{ position: 'absolute', left: 5 }}><i className="fa-sharp fa-solid fa-circle-plus"></i></div>
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
        key={key}
        datasource={tree}
        pan={true}
        NodeTemplate ={MyNode}
        collapsible={false}
      />

      <GeneralModal onClose={() => { setshowModal(false) }} open={showModal} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>Holding Tank Placement</h1>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">User</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="User"
              value={selectedHoldingTank}
              onChange={(e) => {
                setSelectedHoldingTank(e.target.value)
              }} >
              {holdingTank.map((item, index) => (
                <MenuItem key={index} value={item.id}>{item.name} {item.lastname} ({item.username})</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a user from holding tank to place</FormHelperText>
            <h1 style={{ marginTop: 20, marginBottom: 20, color: 'red', fontWeight: 'bold' }}>
              IMPORTANT - CHOOSE CAREFULLY
            </h1>
            <h1 style={{ marginTop: 20, marginBottom: 20 }}>
              You are about to place the user on the <span style={{ color: 'red', fontWeight: 'bold' }}>{String(placement.side).toUpperCase()} </span>
               side of <span style={{ color: 'red', fontWeight: 'bold' }}>{placement.name} {placement.lastname}</span>.
            </h1>
            <Button onClick={() => { setHoldingTankUser() }} disabled={!selectedHoldingTank} variant="contained" color="primary" style={{ marginTop: 20 }}>Place</Button>
          </FormControl>

        </div>
      </GeneralModal>
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
