import Head from 'next/head'
import OrganizationChart from '@dabeng/react-orgchart'

import type { Page as PageNext, ReactNode } from 'lib/types'
import { APP_INFO } from 'config/appInfo'

import DashboardLayout from 'layouts/private/Dashboard'
import { CardComingSoon } from 'components/common/CardComingSoon'
import { getLocalStorage } from 'lib/utils/localStorage'
import { useAuthStore, useNewWindowOpenedStore } from 'lib/stores'
import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import { Grid, TextField } from '@mui/material'
import { SearchIcon } from 'components/common/icons'
import { Button } from '@material-ui/core'
import { DataGrid as MUIDataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/system'
const { SEO } = APP_INFO
const StyledDataGrid = styled(MUIDataGrid)(() => ({
  '&& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-columnHeaderTitle': {
    fontWeight: 'bold'
  },
  '& .MuiDataGrid-cell': {
    borderColor: 'rgba(224, 224, 224, 0.5)!important'
  },

  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#dd4c3738',
    borderColor: '#DD4C37!important'
  },
  '& .MuiDataGrid-footerContainer': {
    display: 'none'
  }

}))

const Table = (props) => {
  const rows = useMemo(() => props.rows, [props.rows])
  const columns = useMemo(() => props.columns, [props.columns])
  return (
    <StyledDataGrid
      rows={rows}
      autoHeight
      columns={columns}
      density="compact"
      sx={{
        backgroundColor: 'white',
        border: '2px dashed #aaa'
      }}
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
  const [userId, setUserId] = useState(auth.id)
  const [tree, setTree] = useState({})
  const [history, setHistory] = useState([])
  const [key, setKey] = useState(0)
  const [searchId, setsearchId] = useState('')
  const [rows, setDataRows] = useState([])
  const [currentUserId, setCurrentUserId] = useState(auth.id)

  const refreshComponent = () => {
    setKey(prevKey => prevKey + 1) // incrementing key will cause the component to be recreated
  }
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
  const columns = [
    { field: 'id', headerName: 'User Id', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
    {
      field: 'sponsorId',
      headerName: 'View',
      flex: 1,
      minWidth: 170,
      renderCell: (item) => (
        <Button className='bg-primary-500 px-[6px] py-[2px] text-sm' onClick={() => {
          setUserId(item.row.id)
          setCurrentUserId(item.row.id)
        }} variant="contained" color={'primary'} size={'small'}>View User</Button>
      )
    }
  ]
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
    setCurrentUserId(auth.id)
  }

  const search = async () => {
    const token = getLocalStorage('accessToken')
    const response = await axios.get('/api/reports/searchUsers', {
      params: { search: searchId },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setDataRows(response.data)
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
      <Grid justifyContent='flex-end' alignItems='center' style={{ display: 'flex' }}>
        <TextField value={searchId} onChange={(e) => { setsearchId(e.target.value) }} size={'small'} variant="outlined" placeholder="Search by Name" InputProps={{ startAdornment: <SearchIcon/> }} />
        <Button className='bg-primary-500 text-white font-bold ml-2' disabled={(searchId.length === 0)} onClick={() => { search() }} variant="contained" >Search</Button>
      </Grid>
      <br></br>
      <Grid item container style={{ marginBottom: 30 }}>
        <Table columns={columns} rows={rows} sortModel={[{ field: 'name', sort: 'asc' }]} />
      </Grid>
      <OrganizationChart
        key={key}
        datasource={tree}
        pan={true}
        NodeTemplate ={MyNode}
        collapsible={true}
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
