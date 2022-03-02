import { useState, useMemo } from 'react'
import { Card, Grid, Typography, makeStyles, TextField, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { RecursiveAccordion } from './RecursiveAccordion'
import { ModalUninivelUser } from './Modals/UniLevelUser'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { useAuthStore } from 'lib/stores'

const useStyles = makeStyles(theme => ({
  container: {
    padding: 20
  },
  Btn: {
    backgroundColor: '#DD4C37',
    color: '#fff'
  }
}))

const Table = (props) => {
  const rows = useMemo(() => props.rows, [props.rows])
  const columns = useMemo(() => props.columns, [props.columns])
  const [sortModel, setSortModel] = useState([
    {
      field: 'id',
      sort: 'desc'
    }
  ])
  const [pageSize, setPageSize] = useState(5)
  return (
    <DataGrid
      rows={rows}
      autoHeight
      columns={columns}
      density="compact"
      pageSize={pageSize}
      onPageSizeChange={(number) => setPageSize(number)}
      rowsPerPageOptions={[10, 25, 50]}
      sortModel={sortModel}
      onSortModelChange={(model) => { console.log(); setSortModel(model) }}
    />
  )
}

export const Unilevel = () => {
  const { auth } = useAuthStore()
  const user = {
    id: auth.id,
    name: auth.name
  }

  const [showModal, setshowModal] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [searchId, setsearchId] = useState('')
  const [pageSize, setPageSize] = useState(5)
  const [rows, setDataRows] = useState([])

  const [sortModel, setSortModel] = useState([
    {
      field: 'id',
      sort: 'desc'
    }
  ])

  const openUser = async (id, name) => {
    console.log('name', name)
    setId(id)
    setName(name)
    setshowModal(true)
  }

  const classes = useStyles()

  const search = async () => {
    try {
      const response = await axios.get('https://dev.snap.devopsteam.info/api/user/getUsersBySearch', {
        params: { search: searchId },
        headers: {
          Authorization: `Bearer ${auth.accessToken}`
        }
      })
      setDataRows(response.data.data.users)
    } catch (e) {

    }
  }

  const columns = [
    { field: 'id', headerName: 'User Id', minWidth: 130, flex: 1 },
    { field: 'name', headerName: 'Name', minWidth: 130, flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', minWidth: 130, flex: 1 },
    {
      field: 'sponsorId',
      headerName: 'View',
      flex: 1,
      minWidth: 170,
      renderCell: (item) => {
        return <Button onClick={() => { openUser(item.id, item.row.name) }} variant="contained" color={'primary'} size={'small'}>View User</Button>
      }
    }
  ]

  return (
    <>
      <ModalUninivelUser id={id} name={name} openUser={openUser} open={showModal} close={setshowModal}/>
      <Card style={{ width: '100%' }}>
        <Grid className={classes.container} container>
          <Grid container className={classes.title} >
            <Grid item xs={12} md={4} style={{ marginBottom: 20 }}>
              <Typography variant="h4" color="primary">Genealogy</Typography>
            </Grid>
          </Grid>
          <Grid container className={classes.title} >
            <Grid container item xs={12} md={8} justifyContent={'flex-start'} style={{ marginBottom: 20 }} >
              <TextField value={searchId} onChange={(e) => { setsearchId(e.target.value) }} size={'small'} variant="outlined" placeholder="Search by ID/Name/Phone" InputProps={{ startAdornment: <SearchIcon fontSize="small"/> }}/>
              <Button disabled={(searchId.length === 0)} onClick={() => { search() }} variant="contained" className={classes.Btn}>Search</Button>
            </Grid>
          </Grid>
          <Grid item container style={{ marginBottom: 30 }}>
            <Table columns={columns} rows={rows}/>
          </Grid>
          <Grid item container>
            <RecursiveAccordion openUser={openUser} master={true} user={user}/>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}
