import { useEffect, useState } from 'react'
import { GeneralModal } from './GeneralModal/index'
import {
  Grid,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText, Button, CircularProgress
} from '@material-ui/core'

import Alert from '@material-ui/lab/Alert'
import { RecursiveAccordion } from '../RecursiveAccordion'
import axios from 'axios'

import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import PhoneIcon from '@material-ui/icons/Phone'
import AttachMoneyIcon from '@material-ui/icons/AttachMoney'
import MoneyOffIcon from '@material-ui/icons/MoneyOff'

export const ModalUninivelUser = ({ id, close, open, openUser }) => {
  const [user, setUser] = useState({})
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(async () => {
    if (String(id).length > 0 && open) {
      try {
        setUser({})
        setUserData(null)
        setError('')
        setLoading(true)
        const response = await axios.get('/api/unilevel/getAllLevelsById', { params: { id: id, includeUsers: 1 } })
        setUser({ name: response.data.results.name, id: response.data.results.userId })
        const responseData = await axios.get('/api/unilevel/getUserById', { params: { id: id } })
        setUserData(responseData.data.results)
      } catch (e) {
        setError(e.response.data?.message || '')
      }
      setLoading(false)
    }
  }, [id])

  return (
    <GeneralModal onClose={() => { close(false) }} open={open} showClose={true}>
      <Grid item xs={12} style={{ marginBottom: 15 }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Searching ID: {id}
        </Typography>
      </Grid>
      {loading && (
        <CircularProgress color="primary" size={30} style={{ marginLeft: 10 }}/>
      )}
      {userData && (
        <Grid item container style={{ marginBottom: 15 }}>
          <ListItem>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary={`Sponsor: ${userData['sponsor.id'] !== null ? `${userData['sponsor.name']} [${userData['sponsor.id']}]` : 'No Sponsor'}`} />
            {(userData['sponsor.id'] !== null) && (
              <Button onClick={(e) => { e.stopPropagation(); openUser(userData['sponsor.id']) }} size={'small'} variant="contained">View Sponsor</Button>
            )}
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={userData.email} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={userData.phoneNumber} />
          </ListItem>
        </Grid>
      )}
      {user.id && (
        <Grid item container>
          <RecursiveAccordion master={true} openUser={openUser} user={user}/>
        </Grid>
      )}
      {error.length > 0 && (
        <Alert severity="error">{error}</Alert>
      )}
    </GeneralModal>
  )
}
