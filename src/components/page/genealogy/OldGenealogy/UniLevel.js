import { useState, useMemo } from 'react'
import { Card, Grid, makeStyles, TextField, Button } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import { RecursiveAccordion } from './RecursiveAccordion'
import { ModalUninivelUser } from './Modals/UniLevelUser'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { useAuthStore, useLayoutConfig } from 'lib/stores'
import { API } from 'config/api'

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
  const { genealogy: genealogyLayoutConfig } = useLayoutConfig()
  const { auth } = useAuthStore()
  const user = {
    id: auth.id,
    name: auth.name
  }

  const [showModal, setshowModal] = useState(false)
  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [searchId, setsearchId] = useState('')
  const [rows, setDataRows] = useState([])

  const openUser = async (id, name) => {
    setId(id)
    setName(name)
    setshowModal(true)
  }

  const classes = useStyles()

  const search = async () => {
    try {
      const response = await axios.get(`${API.BASE_URL}/api/user/getUsersBySearch`, {
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
            <Grid container item xs={12} md={12} justifyContent={'space-between'} alignItems='center' style={{ marginBottom: 20 }} >
              <Grid justifyContent='flex-end' alignItems='center' style={{ display: 'flex' }}>
                <TextField value={searchId} onChange={(e) => { setsearchId(e.target.value) }} size={'small'} variant="outlined" placeholder="Search by ID/Name/Phone" InputProps={{ startAdornment: <SearchIcon fontSize="small"/> }}/>
                <Button disabled={(searchId.length === 0)} onClick={() => { search() }} variant="contained" className={classes.Btn}>Search</Button>
              </Grid>

              <Grid md={6} justifyContent='flex-end' alignItems='center' style={{ display: 'flex' }}>
                <label htmlFor='toggle-example-checked' className='flex items-center cursor-pointer relative mt-4 sm:mt-0 hover:text-primary-500'>
                  <input
                    type='checkbox'
                    id='toggle-example-checked'
                    className='sr-only'
                    onChange={() => genealogyLayoutConfig.toggleTypeGenealogy()}
                    checked={genealogyLayoutConfig.isNewGenealogy}
                  />
                  <div className='toggle-bg bg-gray-400 border-2 border-gray-200 h-6 w-11 rounded-full'></div>
                  <span className='ml-3 text-sm font-medium'>
                    {
                      genealogyLayoutConfig.isNewGenealogy
                        ? 'New Genealogy Layout'
                        : 'Legacy Genealogy Layout'
                    }
                  </span>
                </label>
              </Grid>
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
