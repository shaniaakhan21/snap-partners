import Head from 'next/head'
import OrganizationChart from '@dabeng/react-orgchart'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { GeneralModal } from 'components/page/genealogy/OldGenealogy/Modals/GeneralModal'
import { CardComingSoon } from 'components/common/CardComingSoon'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@material-ui/core'
import { Grid, TextField } from '@mui/material'
import { SearchIcon } from 'components/common/icons'
import { DataGrid } from '@mui/x-data-grid'

const { SEO } = APP_INFO

const Table = (props) => {
  const rows = useMemo(() => props.rows, [props.rows])
  const columns = useMemo(() => props.columns, [props.columns])
  return (
    <DataGrid
      rows={rows}
      autoHeight
      columns={columns}
      density="compact"
      initialState={{
        sorting: {
          sortModel: props.sortModel
        },
        pagination: { paginationModel: { pageSize: 10 } }
      }}
    />
  )
}

const ComingSoon: PageNext = () => {
  const { auth, setAuth, removeAuth } = useAuthStore()
  const myId = auth.id
  const [userId, setUserId] = useState(myId)
  const [currentUserId, setCurrentUserId] = useState(myId)
  const [tree, setTree] = useState({})
  const [key, setKey] = useState(0)
  const [showModal, setshowModal] = useState(false)
  const [showModalCustomer, setshowModalCustomer] = useState(false)
  const [holdingTank, setHoldingTank] = useState([])
  const [holdingTankCustomer, setHoldingTankCustomer] = useState([])
  const [selectedHoldingTank, setSelectedHoldingTank] = useState(null)
  const [placement, setPLacement] = useState({}) as any
  const [searchId, setsearchId] = useState('')
  const [rows, setDataRows] = useState([])
  const [pending, setPending] = useState(false)

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

  const getHoldingTankCustomer = async () => {
    const token = getLocalStorage('accessToken')
    const response = await axios.get('/api/tree/getHoldingTankUsersCustomer', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setHoldingTankCustomer(response.data)
  }

  const getBinaryTree = async (id) => {
    try {
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
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 400) {
        setPending(true)
      }
      return 0
    }
  }

  useEffect(() => {
    (async () => {
      await getHoldingTank()
      await getHoldingTankCustomer()
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

  const setHoldingTankUserCustomer = async (userId, side) => {
    const token = getLocalStorage('accessToken')
    await axios.post('/api/tree/setHoldingTankUsersCustomer', {
      userId,
      side
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    await getHoldingTankCustomer()
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
          {!['Blocked', 'Available'].includes(nodeData.name) && (
            <span className="oc-view" style={{ position: 'relative' }}>{nodeData.PV}</span>
          )}
          {nodeData.title}
        </div>
        <div className="oc-content">
        {!['Blocked', 'Available'].includes(nodeData.name) && (
            <span>{nodeData.LL}</span>
          )}
        <br/>
        {!['Blocked', 'Available'].includes(nodeData.name) && (
            <span>{nodeData.RL}</span>
          )}
        </div>
      </div>
    )
  }

  const columns = [
    { field: 'id', headerName: 'User Id', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
    {
      field: 'sponsorId',
      headerName: 'View',
      flex: 1,
      minWidth: 170,
      renderCell: (item) => {
        if (item.row.placed) {
          return <Button onClick={() => {
            setUserId(item.row.id)
            setCurrentUserId(item.row.id)
          }} variant="contained" color={'primary'} size={'small'}>View User</Button>
        }
        return <>User not yet placed - In Holding Tank</>
      }
    }
  ]

  const columnsCustomer = [
    { field: 'id', headerName: 'User Id', maxWidth: 110, flex: 1 },
    { field: 'name', headerName: 'Name', maxWidth: 270, flex: 1 },
    { field: 'placed', headerName: 'Placed', maxWidth: 100, flex: 1 },
    {
      field: 'sponsorId',
      headerName: 'View',
      flex: 1,
      minWidth: 170,
      renderCell: (item) => {
        if (item.row.placed === 'NO') {
          return (
            <>
              <Button onClick={() => {
                setHoldingTankUserCustomer(item.row.id, 'pv')
              }} variant="contained" color={'default'} size={'small'}>PV</Button>
              <Button onClick={() => {
                setHoldingTankUserCustomer(item.row.id, 'left')
              }} style={{ marginLeft: 10 }} variant="contained" color={'primary'} size={'small'}>LEFT</Button>
              <Button onClick={() => {
                setHoldingTankUserCustomer(item.row.id, 'right')
              }} style={{ marginLeft: 10 }} variant="contained" color={'secondary'} size={'small'}>RIGHT</Button>

            </>
          )
        }
        return <>{item.row.placedName}
          {item.row.allowChange === true && (
            <Button style={{ marginLeft: 10 }} onClick={() => {
              setHoldingTankUserCustomer(item.row.id, 'reset')
            }} variant="contained" color={'default'} size={'small'}>RESET</Button>
          )}</>
      }
    }
  ]

  const search = async () => {
    const token = getLocalStorage('accessToken')
    const response = await axios.get('/api/tree/searchUsers', {
      params: { search: searchId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setDataRows(response.data)
  }

  if (pending) {
    return (
      <>
        <Grid justifyContent='center' alignItems='center' style={{ display: 'flex' }}>
          <h1 style={{ fontSize: 25, textAlign: 'center' }}>You are still waiting to be placed on the binary by your sponsor</h1>
        </Grid>
        <Grid justifyContent='center' alignItems='center' style={{ display: 'flex' }}>
          <h2 style={{ fontSize: 18, textAlign: 'center' }}>Come back after your position has been placed</h2>
        </Grid>
      </>

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
        <button onClick={() => { setshowModalCustomer(true) }} className="flex text-xs items-center bg-green-600 hover:bg-green-700 text-white font-bold h-6 w-50  py-3 px-4 rounded-l-full rounded-r-full">CUSTOMER HOLDING TANK</button>
      </div>
      <Grid justifyContent='flex-end' alignItems='center' style={{ display: 'flex' }}>
        <TextField value={searchId} onChange={(e) => { setsearchId(e.target.value) }} size={'small'} variant="outlined" placeholder="Search by Name" InputProps={{ startAdornment: <SearchIcon /> }} />
        <Button disabled={(searchId.length === 0)} onClick={() => { search() }} variant="contained" >Search</Button>
      </Grid>
      <Grid item container style={{ marginBottom: 30 }}>
        <Table columns={columns} rows={rows} sortModel={[{ field: 'name', sort: 'asc' }]} />
      </Grid>
      <OrganizationChart
        key={key}
        datasource={tree}
        pan={true}
        NodeTemplate ={MyNode}
        collapsible={false}
      />

      <GeneralModal onClose={() => { setshowModal(false) }} open={showModal} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>AFFILIATE Holding Tank Placement</h1>
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

      <GeneralModal onClose={() => { setshowModalCustomer(false) }} open={showModalCustomer} showClose={true}>
        <div style={{ marginTop: 50 }}>
          <h1 style={{ marginBottom: 20 }}>Customer Holding Tank Placement</h1>
          <Grid item container style={{ marginBottom: 30 }}>
            <Table columns={columnsCustomer} rows={holdingTankCustomer} sortModel={[{ field: 'placed', sort: 'asc' }]} />
          </Grid>
        </div>
      </GeneralModal>
    </>
  )
}

ComingSoon.getLayout = (page: ReactNode) => (
  <DashboardLayout>
    <Head>
      <title>{SEO.TITLE_PAGE} - Binary Tree</title>
    </Head>

    {page}
  </DashboardLayout>
)

export default ComingSoon
